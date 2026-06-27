#!/usr/bin/env node

/**
 * Validates the repository structure against the expected enterprise architecture.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const PACKAGES = path.join(ROOT, 'packages');

const EXPECTED_DOMAINS = ['core', 'providers', 'adapters', 'mcp', 'special', 'validation', 'infrastructure'];

let errors = [];
let warnings = [];

function error(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

for (const domain of EXPECTED_DOMAINS) {
  const dir = path.join(PACKAGES, domain);
  if (!fs.existsSync(dir)) {
    error(`Missing domain directory: packages/${domain}`);
  } else if (!fs.statSync(dir).isDirectory()) {
    error(`Expected directory but found file: packages/${domain}`);
  } else if (!fs.existsSync(path.join(dir, 'README.md'))) {
    warn(`Missing README.md in packages/${domain}`);
  }
}

const entries = fs.readdirSync(PACKAGES);
const domainSet = new Set(EXPECTED_DOMAINS);
const unorganized = entries.filter(e =>
  !domainSet.has(e) &&
  fs.statSync(path.join(PACKAGES, e)).isDirectory() &&
  !e.startsWith('.')
);

if (unorganized.length > 0) {
  warn(`Packages not yet moved to domain directories: ${unorganized.join(', ')}`);
  warn(`  → See ARCHITECTURE_REDESIGN.md Appendix A for target locations`);
}

for (const domain of EXPECTED_DOMAINS) {
  const domainDir = path.join(PACKAGES, domain);
  if (!fs.existsSync(domainDir)) continue;

  const packages = fs.readdirSync(domainDir).filter(e =>
    fs.statSync(path.join(domainDir, e)).isDirectory() &&
    !e.startsWith('.') &&
    fs.existsSync(path.join(domainDir, e, 'package.json'))
  );

  for (const pkg of packages) {
    const pkgJson = path.join(domainDir, pkg, 'package.json');
    if (!fs.existsSync(pkgJson)) {
      error(`Missing package.json in packages/${domain}/${pkg}`);
    }
  }
}

const configs = ['pnpm-workspace.yaml', 'turbo.json', 'tsconfig.json', 'CODEOWNERS'];
for (const cfg of configs) {
  if (!fs.existsSync(path.join(ROOT, cfg))) {
    error(`Missing root config: ${cfg}`);
  }
}

console.log('\n📋 Repository Structure Validation\n');

if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach(e => console.log(`  ❌ ${e}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('Warnings:');
  warnings.forEach(w => console.log(`  ⚠️  ${w}`));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All structure checks passed!\n');
} else if (errors.length === 0) {
  console.log('✅ No errors (see warnings above)\n');
} else {
  console.log(`❌ ${errors.length} error(s) found. Fix before proceeding.\n`);
  process.exit(1);
}
