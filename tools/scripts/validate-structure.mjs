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
const NODE_BUILTINS = new Set([
  ...builtinModules,
  ...builtinModules.map(name => `node:${name}`),
]);
const errors = [];
const warnings = [];
const packages = [];

const reportError = message => errors.push(message);
const reportWarning = message => warnings.push(message);

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    reportError(
      `Invalid JSON: ${path.relative(ROOT, file)} (${error.message})`,
    );
    return undefined;
  }
}

function collectPackages(dir, domain) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const packageDir = path.join(dir, entry.name);
    if (
      !entry.isDirectory() ||
      !fs.existsSync(path.join(packageDir, 'package.json'))
    )
      continue;
    const manifestPath = path.join(packageDir, 'package.json');
    const manifest = readJson(manifestPath);
    if (manifest)
      packages.push({ dir: packageDir, domain, manifest, manifestPath });
  }
}

for (const domain of EXPECTED_DOMAINS) {
  const domainDir = path.join(PACKAGES, domain);
  if (!fs.existsSync(domainDir))
    reportError(`Missing domain directory: packages/${domain}`);
  else if (!fs.statSync(domainDir).isDirectory())
    reportError(`Expected directory but found file: packages/${domain}`);
  else if (!fs.existsSync(path.join(domainDir, 'README.md')))
    reportWarning(`Missing README.md in packages/${domain}`);
  collectPackages(domainDir, domain);
}

if (!fs.existsSync(PACKAGES))
  reportError(`Missing packages root: packages/`);
else if (!fs.statSync(PACKAGES).isDirectory())
  reportError(`Expected directory but found file: packages/`);
else {
  for (const entry of fs.readdirSync(PACKAGES, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || EXPECTED_DOMAINS.includes(entry.name))
      continue;
    if (
      entry.isDirectory() &&
      fs.existsSync(path.join(PACKAGES, entry.name, 'package.json'))
    ) {
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
    reportError(
      `Package is missing a name: ${path.relative(ROOT, pkg.manifestPath)}`,
    );
  else if (names.has(pkg.manifest.name))
    reportError(
      `Duplicate package name \"${pkg.manifest.name}\": ${path.relative(ROOT, names.get(pkg.manifest.name))} and ${path.relative(ROOT, pkg.manifestPath)}`,
    );
  else names.set(pkg.manifest.name, pkg.manifestPath);

  if (!pkg.manifest.exports)
    reportWarning(
      `Package has no exports map: ${path.relative(ROOT, pkg.dir)}`,
    );
  if (!pkg.manifest.source)
    reportWarning(
      `Package has no source entry: ${path.relative(ROOT, pkg.dir)}`,
    );

  const dependencies = {
    ...pkg.manifest.dependencies,
    ...pkg.manifest.optionalDependencies,
  };
  if (pkg.domain === 'core' || pkg.domain === 'validation') {
    for (const dependency of Object.keys(dependencies)) {
      if (NODE_BUILTINS.has(dependency))
        reportError(
          `Runtime-neutral package imports Node builtin \"${dependency}\": ${path.relative(ROOT, pkg.manifestPath)}`,
        );
    }
  }
}

const configs = [
  'pnpm-workspace.yaml',
  'turbo.json',
  'tsconfig.json',
  'CODEOWNERS',
];
for (const config of configs)
  if (!fs.existsSync(path.join(ROOT, config)))
    reportError(`Missing root config: ${config}`);

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
        .split('/')
        .map(segment => (segment === '**' ? '.*' : `[^/]*`))
        .join('/')
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*')
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
console.log(
  `Domain packages: ${packages.filter(pkg => pkg.domain !== 'legacy').length}`,
);
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
if (!errors.length && !warnings.length)
  console.log('All structure checks passed.');
else if (!errors.length)
  console.log('No errors; warnings indicate migration work remaining.');
else process.exit(1);
