#!/usr/bin/env node

/**
 * Script to find the latest release branch dynamically.
 * Looks for branches matching common release branch patterns and returns the most recent one.
 */

const { execSync } = require('child_process');
const semver = require('semver');

/**
 * Fetches all remote branches and finds the latest release branch.
 * @returns {string | null} The name of the latest release branch, or null if none found
 */
function findLatestReleaseBranch() {
  try {
    // Fetch all remote branches
    execSync('git fetch --all', { stdio: 'pipe' });

    // Get all remote branches
    const branchesOutput = execSync('git branch -r', { encoding: 'utf-8' });
    const branches = branchesOutput
      .split('\n')
      .map(branch => branch.trim())
      .filter(branch => branch);

    // Common release branch patterns
    const releasePatterns = [
      /^origin\/release\/v?\d+\.\d+(\.\d+)?$/, // origin/release/1.0 or origin/release/v1.0
      /^origin\/v\d+\.\d+(\.\d+)?$/, // origin/v1.0.0
      /^origin\/release-\d+\.\d+(\.\d+)?$/, // origin/release-1.0.0
    ];

    // Filter and extract version numbers
    const releaseBranches = branches
      .filter(branch => releasePatterns.some(pattern => pattern.test(branch)))
      .map(branch => {
        // Extract version part from branch name
        const versionMatch = branch.match(/\d+(\.\d+)+/);
        const version = versionMatch ? versionMatch[0] : '0.0.0';
        return { branch, version };
      })
      .sort((a, b) => semver.rcompare(a.version, b.version));

    if (releaseBranches.length === 0) {
      console.log('No release branches found');
      return null;
    }

    // Return the branch name without 'origin/'
    const latestBranch = releaseBranches[0].branch.replace('origin/', '');
    console.log(`Latest release branch: ${latestBranch}`);
    return latestBranch;
  } catch (error) {
    console.error('Error finding latest release branch:', error.message);
    return null;
  }
}

// Run the function and output the result
const latestBranch = findLatestReleaseBranch();
if (latestBranch) {
  console.log(latestBranch);
} else {
  process.exit(1);
}
