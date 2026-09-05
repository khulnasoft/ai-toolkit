#!/usr/bin/env node

/**
 * Validates package boundaries and the staged domain migration.
 */

import fs from 'fs';
import path from 'path';
import { builtinModules } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const PACKAGES = path.join(ROOT, 'packages');
const EXPECTED_DOMAINS = [
  'core',
  'providers',
  'adapters',
  'mcp',
  'special',
  'validation',
  'infrastructure',
];
const NODE_BUILTINS = new Set([...builtinModules, ...builtinModules.map(name => `node:${name}`)]);
const PRUNE = new Set(['node_modules', 'dist', '.git', '.next', '.turbo']);
// Test files, dev scripts, and tooling configs execute under Node by design and
// never ship; the runtime-neutral rule (ADR-004) governs shipped source, so they
// are excluded from the builtin scan.
const TEST_PATH =
  /(\.test(-d)?\.tsx?$|[\\/]__tests__[\\/]|[\\/]test[\\/]|[\\/]__fixtures__[\\/]|[\\/]__snapshots__[\\/]|[\\/]scripts[\\/]|\.config\.(js|mjs|cjs|ts)$)/;
const RUNTIME_NEUTRAL_DOMAINS = new Set(['core', 'validation']);
const errors = [];
const warnings = [];
const packages = [];
const discoveredNames = new Map();

const reportError = message => errors.push(message);
const reportWarning = message => warnings.push(message);

function readWorkspaceGlobs() {
  const file = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf8');
  const match = file.match(/^packages:([\s\S]*?)^[a-zA-Z_]/m);
  const block = match ? match[1] : file;
  const globs = [];
  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      const glob = trimmed
        .slice(2)
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (glob && !glob.startsWith('#')) globs.push(glob);
    }
  }
  return globs;
}

function globToRegex(glob) {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0000/g, '.*');
  return new RegExp(`^${escaped}$`);
}

const WORKSPACE_GLOBS = readWorkspaceGlobs();
const WORKSPACE_REGEXES = WORKSPACE_GLOBS.map(glob => ({
  glob,
  regex: globToRegex(glob),
}));

function scanNodeImports(dir, out = new Set()) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (PRUNE.has(entry.name) || entry.name.startsWith('.')) continue;
      scanNodeImports(full, out);
    } else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) {
      if (TEST_PATH.test(full)) continue;
      let content;
      try {
        content = fs.readFileSync(full, 'utf8');
      } catch {
        continue;
      }
      // `import type` statements are erased at compile time and carry no
      // runtime dependency, so they never violate runtime-neutrality.
      content = content.replace(/import\s+type\s+[^;]+;/g, '');
      for (const m of content.matchAll(/from\s+['"]((?:node:)?[a-zA-Z0-9_@/-]+)['"]/g)) {
        const spec = m[1];
        if (spec.startsWith('node:') || builtinModules.includes(spec)) out.add(spec);
      }
    }
  }
  return out;
}

function collectPackageNames(root, category) {
  if (!fs.existsSync(root)) return;
  const walk = dir => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (PRUNE.has(entry.name) || entry.name.startsWith('.')) continue;
      const full = path.join(dir, entry.name);
      if (!entry.isDirectory()) continue;
      const manifestPath = path.join(full, 'package.json');
      if (fs.existsSync(manifestPath)) {
        const manifest = readJson(manifestPath);
        if (manifest?.name) discoveredNames.set(manifest.name, { category, dir: full });
      }
      walk(full);
    }
  };
  walk(root);
}

collectPackageNames(path.join(ROOT, 'apps'), 'apps');
collectPackageNames(path.join(ROOT, 'examples'), 'examples');

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    reportError(`Invalid JSON: ${path.relative(ROOT, file)} (${error.message})`);
    return undefined;
  }
}

function collectPackages(dir, domain) {
  if (!fs.existsSync(dir)) return;
  // A domain directory may itself be a package (e.g. packages/mcp).
  const rootManifestPath = path.join(dir, 'package.json');
  if (fs.existsSync(rootManifestPath)) {
    const manifest = readJson(rootManifestPath);
    if (manifest)
      packages.push({ dir, domain, manifest, manifestPath: rootManifestPath });
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const packageDir = path.join(dir, entry.name);
    if (!entry.isDirectory() || !fs.existsSync(path.join(packageDir, 'package.json'))) continue;
    const manifestPath = path.join(packageDir, 'package.json');
    const manifest = readJson(manifestPath);
    if (manifest) packages.push({ dir: packageDir, domain, manifest, manifestPath });
  }
}

for (const domain of EXPECTED_DOMAINS) {
  const domainDir = path.join(PACKAGES, domain);
  if (!fs.existsSync(domainDir)) reportError(`Missing domain directory: packages/${domain}`);
  else if (!fs.statSync(domainDir).isDirectory())
    reportError(`Expected directory but found file: packages/${domain}`);
  else if (!fs.existsSync(path.join(domainDir, 'README.md')))
    reportWarning(`Missing README.md in packages/${domain}`);
  collectPackages(domainDir, domain);
}

if (!fs.existsSync(PACKAGES)) reportError(`Missing packages root: packages/`);
else if (!fs.statSync(PACKAGES).isDirectory())
  reportError(`Expected directory but found file: packages/`);
else {
  for (const entry of fs.readdirSync(PACKAGES, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || EXPECTED_DOMAINS.includes(entry.name)) continue;
    if (entry.isDirectory() && fs.existsSync(path.join(PACKAGES, entry.name, 'package.json'))) {
      const packageDir = path.join(PACKAGES, entry.name);
      const manifestPath = path.join(packageDir, 'package.json');
      const manifest = readJson(manifestPath);
      if (manifest)
        packages.push({
          dir: packageDir,
          domain: 'legacy',
          manifest,
          manifestPath,
        });
    }
  }
}

const names = new Map();
for (const pkg of packages) {
  if (!pkg.manifest.name)
    reportError(`Package is missing a name: ${path.relative(ROOT, pkg.manifestPath)}`);
  else if (names.has(pkg.manifest.name))
    reportError(
      `Duplicate package name \"${pkg.manifest.name}\": ${path.relative(ROOT, names.get(pkg.manifest.name))} and ${path.relative(ROOT, pkg.manifestPath)}`,
    );
  else names.set(pkg.manifest.name, pkg.manifestPath);

  if (!pkg.manifest.exports)
    reportWarning(`Package has no exports map: ${path.relative(ROOT, pkg.dir)}`);
  if (!pkg.manifest.source)
    reportWarning(`Package has no source entry: ${path.relative(ROOT, pkg.dir)}`);

  if (!pkg.manifest.stability)
    reportWarning(`Package missing stability label: ${path.relative(ROOT, pkg.dir)}`);
  if (!pkg.manifest.owners)
    reportWarning(`Package missing owners metadata: ${path.relative(ROOT, pkg.dir)}`);

  const relDir = path.relative(ROOT, pkg.dir).split(path.sep).join('/');
  const inWorkspace = WORKSPACE_REGEXES.some(({ regex }) => regex.test(relDir));
  if (!inWorkspace) reportError(`Package dir not matched by any pnpm-workspace glob: ${relDir}`);

  const dependencies = {
    ...pkg.manifest.dependencies,
    ...pkg.manifest.optionalDependencies,
  };
  for (const [dependency] of Object.entries(dependencies)) {
    const target = discoveredNames.get(dependency);
    if (target && target.category !== 'packages')
      reportError(
        `Forbidden dependency direction: ${path.relative(ROOT, pkg.dir)} -> ${dependency} (${target.category})`,
      );
  }

  if (RUNTIME_NEUTRAL_DOMAINS.has(pkg.domain)) {
    for (const dependency of Object.keys(dependencies)) {
      if (NODE_BUILTINS.has(dependency))
        reportError(
          `Runtime-neutral package depends on Node builtin \"${dependency}\": ${path.relative(ROOT, pkg.manifestPath)}`,
        );
    }
    for (const builtin of scanNodeImports(pkg.dir)) {
      reportError(
        `Runtime-neutral package imports Node builtin \"${builtin}\": ${path.relative(ROOT, pkg.dir)}`,
      );
    }
  }

  if (pkg.manifest.exports && typeof pkg.manifest.exports === 'object') {
    const main = pkg.manifest.exports['.'];
    if (main && typeof main === 'object') {
      const keys = Object.keys(main);
      for (const required of ['types', 'import', 'require'])
        if (!keys.includes(required))
          reportWarning(
            `Exports \".\" missing condition \"${required}\": ${path.relative(ROOT, pkg.dir)}`,
          );
      if (!keys.includes('default'))
        reportWarning(
          `Exports \".\" missing \"default\" condition: ${path.relative(ROOT, pkg.dir)}`,
        );
    }
  }
}

const configs = ['pnpm-workspace.yaml', 'turbo.json', 'tsconfig.json', 'CODEOWNERS'];
for (const config of configs)
  if (!fs.existsSync(path.join(ROOT, config))) reportError(`Missing root config: ${config}`);

const codeownersPath = path.join(ROOT, 'CODEOWNERS');
if (fs.existsSync(codeownersPath) && fs.statSync(codeownersPath).isFile()) {
  const rules = fs
    .readFileSync(codeownersPath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.match(/^(\S+)/)?.[1])
    .filter(Boolean);

  const patternToRegex = pattern =>
    new RegExp(
      `^${pattern
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*(\*?)/g, (match, double) => (double ? '.*' : '[^/]*'))
        .replace(/\?/g, '.')}/?$`,
    );

  const coveredByRules = (pattern, ruleSet) =>
    ruleSet.some(rule => patternToRegex(rule.replace(/\/$/, '')).test(pattern));

  for (const domain of EXPECTED_DOMAINS)
    if (!coveredByRules(`packages/${domain}`, rules))
      reportWarning(`CODEOWNERS has no explicit rule for packages/${domain}/`);
}

console.log('\nRepository Structure Validation\n');
console.log(`Packages discovered: ${packages.length}`);
console.log(`Domain packages: ${packages.filter(pkg => pkg.domain !== 'legacy').length}`);
console.log(
  `Legacy packages remaining: ${packages.filter(pkg => pkg.domain === 'legacy').length}\n`,
);

if (errors.length) {
  console.log('Errors:');
  errors.forEach(message => console.log(`  - ${message}`));
}
if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach(message => console.log(`  - ${message}`));
}
if (!errors.length && !warnings.length) console.log('All structure checks passed.');
else if (!errors.length) console.log('No errors; warnings indicate migration work remaining.');
else process.exit(1);
