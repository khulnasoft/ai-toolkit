const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * GitHub Action to verify changesets in PRs
 * 
 * This action:
 * 1. Checks if changesets exist for package changes
 * 2. Validates changeset format and content
 * 3. Ensures proper version bump types
 * 4. Prevents breaking changes without proper documentation
 */

async function run() {
  try {
    const token = core.getInput('github-token', { required: true });
    const baseBranch = core.getInput('base-branch') || 'main';
    const requireChangeset = core.getBooleanInput('require-changeset') !== 'false';
    const allowBreakingChanges = core.getBooleanInput('allow-breaking-changes') === 'true';
    
    const octokit = github.getOctokit(token);
    const context = github.context;
    
    // Get changed files
    const changedFiles = await getChangedFiles(octokit, context, baseBranch);
    core.info(`Found ${changedFiles.length} changed files`);
    
    // Get changed packages
    const changedPackages = getChangedPackages(changedFiles);
    core.info(`Found ${changedPackages.length} changed packages: ${changedPackages.join(', ')}`);
    
    if (changedPackages.length === 0) {
      core.info('No packages changed, skipping changeset verification');
      return;
    }
    
    // Get changeset files
    const changesetFiles = getChangesetFiles();
    core.info(`Found ${changesetFiles.length} changeset files`);
    
    // Verify changesets exist if required
    if (requireChangeset && changedPackages.length > 0 && changesetFiles.length === 0) {
      core.setFailed(`Changesets are required for package changes. Changed packages: ${changedPackages.join(', ')}`);
      return;
    }
    
    // Validate each changeset
    const validationResults = [];
    for (const changesetFile of changesetFiles) {
      const result = await validateChangeset(changesetFile, changedPackages, allowBreakingChanges);
      validationResults.push(result);
    }
    
    // Check if all changed packages are covered by changesets
    const packagesWithChangesets = validationResults.flatMap(r => r.packages);
    const missingChangesets = changedPackages.filter(pkg => !packagesWithChangesets.includes(pkg));
    
    if (requireChangeset && missingChangesets.length > 0) {
      core.setFailed(`Missing changesets for packages: ${missingChangesets.join(', ')}`);
      return;
    }
    
    // Report validation results
    let hasErrors = false;
    for (const result of validationResults) {
      if (result.errors.length > 0) {
        hasErrors = true;
        core.error(`Changeset ${result.file} has errors:`);
        result.errors.forEach(error => core.error(`  - ${error}`));
      }
      
      if (result.warnings.length > 0) {
        core.warning(`Changeset ${result.file} has warnings:`);
        result.warnings.forEach(warning => core.warning(`  - ${warning}`));
      }
      
      if (result.errors.length === 0 && result.warnings.length === 0) {
        core.info(`✅ Changeset ${result.file} is valid`);
      }
    }
    
    if (hasErrors) {
      core.setFailed('One or more changesets have validation errors');
    } else {
      core.info('All changesets are valid');
    }
    
    // Set outputs
    core.setOutput('changed-packages', changedPackages.join(','));
    core.setOutput('changeset-count', changesetFiles.length);
    core.setOutput('validation-errors', validationResults.reduce((sum, r) => sum + r.errors.length, 0));
    core.setOutput('validation-warnings', validationResults.reduce((sum, r) => sum + r.warnings.length, 0));
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

/**
 * Get changed files from the PR
 */
async function getChangedFiles(octokit, context, baseBranch) {
  const { owner, repo, number } = context.issue;
  
  // Get PR details
  const { data: pr } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: number
  });
  
  // Get changed files
  const files = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const { data: pageFiles } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: number,
      page,
      per_page: 100
    });
    
    files.push(...pageFiles);
    hasMore = pageFiles.length === 100;
    page++;
  }
  
  return files.map(f => f.filename);
}

/**
 * Extract changed packages from file paths
 */
function getChangedPackages(changedFiles) {
  const packages = new Set();
  
  for (const file of changedFiles) {
    // Match packages/... pattern
    const packageMatch = file.match(/^packages\/([^\/]+)/);
    if (packageMatch) {
      packages.add(packageMatch[1]);
      continue;
    }
    
    // Match tools/... pattern
    const toolMatch = file.match(/^tools\/([^\/]+)/);
    if (toolMatch) {
      packages.add(`tools-${toolMatch[1]}`);
      continue;
    }
    
    // Match examples/... pattern
    const exampleMatch = file.match(/^examples\/([^\/]+)/);
    if (exampleMatch) {
      packages.add(`examples-${exampleMatch[1]}`);
      continue;
    }
  }
  
  return Array.from(packages);
}

/**
 * Get all changeset files
 */
function getChangesetFiles() {
  const changesetDir = path.join(process.cwd(), '.changeset');
  
  if (!fs.existsSync(changesetDir)) {
    return [];
  }
  
  try {
    const files = fs.readdirSync(changesetDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(changesetDir, file));
  } catch (error) {
    core.warning(`Failed to read changeset directory: ${error.message}`);
    return [];
  }
}

/**
 * Validate a changeset file
 */
async function validateChangeset(filePath, changedPackages, allowBreakingChanges) {
  const result = {
    file: path.basename(filePath),
    packages: [],
    errors: [],
    warnings: []
  };
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Parse changeset structure
    const frontMatterEnd = lines.findIndex(line => line === '---');
    if (frontMatterEnd === -1) {
      result.errors.push('Invalid changeset format: missing front matter');
      return result;
    }
    
    const frontMatter = lines.slice(1, frontMatterEnd).join('\n');
    const description = lines.slice(frontMatterEnd + 1).join('\n').trim();
    
    // Parse package changes
    const packageChanges = parsePackageChanges(frontMatter);
    result.packages = Object.keys(packageChanges);
    
    // Validate each package change
    for (const [packageName, changeType] of Object.entries(packageChanges)) {
      // Check if package exists
      if (!isValidPackage(packageName)) {
        result.errors.push(`Invalid package name: ${packageName}`);
        continue;
      }
      
      // Check if package was actually changed
      if (changedPackages.length > 0 && !changedPackages.includes(packageName)) {
        result.warnings.push(`Package ${packageName} has changeset but no file changes detected`);
      }
      
      // Validate change type
      if (!['patch', 'minor', 'major'].includes(changeType)) {
        result.errors.push(`Invalid change type for ${packageName}: ${changeType}. Must be patch, minor, or major`);
      }
      
      // Check breaking changes
      if (changeType === 'major' && !allowBreakingChanges) {
        result.errors.push(`Breaking changes (major) are not allowed for ${packageName}`);
      }
      
      if (changeType === 'major' && !description.toLowerCase().includes('breaking')) {
        result.warnings.push(`Major version bump for ${packageName} should include "BREAKING CHANGE" in description`);
      }
    }
    
    // Validate description
    if (!description) {
      result.errors.push('Changeset description is required');
    } else if (description.length < 10) {
      result.warnings.push('Changeset description is too short (should be at least 10 characters)');
    }
    
    // Check for conventional commit format
    const conventionalCommitPattern = /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+/;
    if (!conventionalCommitPattern.test(description)) {
      result.warnings.push('Description should follow conventional commit format (e.g., "feat: add new feature")');
    }
    
    // Check for required context in description
    if (packageChanges.some((_, type) => type === 'major') && !description.includes('BREAKING CHANGE')) {
      result.errors.push('Major changes must include "BREAKING CHANGE:" in description');
    }
    
  } catch (error) {
    result.errors.push(`Failed to parse changeset: ${error.message}`);
  }
  
  return result;
}

/**
 * Parse package changes from front matter
 */
function parsePackageChanges(frontMatter) {
  const changes = {};
  
  // Match lines like "'@ai-toolkit/core': patch"
  const packagePattern = /^'([^']+)':\s*(patch|minor|major)$/gm;
  let match;
  
  while ((match = packagePattern.exec(frontMatter)) !== null) {
    changes[match[1]] = match[2];
  }
  
  return changes;
}

/**
 * Check if package name is valid
 */
function isValidPackage(packageName) {
  // Check if it's a known package in the workspace
  const packageJsonPath = path.join(process.cwd(), 'packages', packageName.replace('@ai-toolkit/', ''), 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    return true;
  }
  
  // Check tools packages
  const toolsPackagePath = path.join(process.cwd(), 'tools', packageName.replace('tools-', ''), 'package.json');
  if (fs.existsSync(toolsPackagePath)) {
    return true;
  }
  
  // Check examples
  const examplesPackagePath = path.join(process.cwd(), 'examples', packageName.replace('examples-', ''), 'package.json');
  if (fs.existsSync(examplesPackagePath)) {
    return true;
  }
  
  // Allow root package
  if (packageName === 'ai-repo') {
    return true;
  }
  
  return false;
}

/**
 * Get package version from package.json
 */
function getPackageVersion(packageName) {
  let packageJsonPath;
  
  if (packageName.startsWith('@ai-toolkit/')) {
    packageJsonPath = path.join(process.cwd(), 'packages', packageName.replace('@ai-toolkit/', ''), 'package.json');
  } else if (packageName.startsWith('tools-')) {
    packageJsonPath = path.join(process.cwd(), 'tools', packageName.replace('tools-', ''), 'package.json');
  } else if (packageName.startsWith('examples-')) {
    packageJsonPath = path.join(process.cwd(), 'examples', packageName.replace('examples-', ''), 'package.json');
  } else if (packageName === 'ai-repo') {
    packageJsonPath = path.join(process.cwd(), 'package.json');
  }
  
  if (!packageJsonPath || !fs.existsSync(packageJsonPath)) {
    return null;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    return null;
  }
}

/**
 * Check if changeset version bump is appropriate for the changes
 */
function validateVersionBump(packageName, changeType, changedFiles) {
  const sourceFiles = changedFiles.filter(file => 
    file.includes('.ts') || file.includes('.js') || file.includes('.tsx') || file.includes('.jsx')
  );
  
  // If only tests or docs changed, patch should be sufficient
  if (changedFiles.every(file => file.includes('.test.') || file.includes('.spec.') || file.includes('README'))) {
    if (changeType !== 'patch') {
      return { valid: false, reason: 'Only documentation/test files changed, patch version bump recommended' };
    }
  }
  
  // Check for potential breaking changes
  const breakingPatterns = [
    /export.*function.*\(/,
    /interface.*{/,
    /type.*=/,
    /class.*{/,
    /export\s+{.*}/
  ];
  
  const hasPotentialBreakingChanges = sourceFiles.some(file => {
    try {
      const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
      return breakingPatterns.some(pattern => pattern.test(content));
    } catch (error) {
      return false;
    }
  });
  
  if (hasPotentialBreakingChanges && changeType === 'patch') {
    return { valid: false, reason: 'Potential breaking changes detected, consider minor or major version bump' };
  }
  
  return { valid: true };
}

// Run the action
if (require.main === module) {
  run();
}

module.exports = {
  run,
  getChangedFiles,
  getChangedPackages,
  getChangesetFiles,
  validateChangeset,
  parsePackageChanges,
  isValidPackage,
  validateVersionBump
};
