#!/usr/bin/env node

/**
 * Inventories every workspace package for the baseline report.
 *
 * Emits build/inventory.json with, per package:
 *   - name, dir, domain, matched workspace glob
 *   - dependency edges (workspace / external / node-builtin)
 *   - exports map entries and conditions, source entry
 *   - runtime assumptions (node-builtin imports, globalThis.fetch usage)
 *   - public API surface (exports map leaf entries)
 */

import fs from 'fs';
import path from 'path';
import { builtinModules } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(ROOT, 'build');
const OUT_FILE = path.join(OUT_DIR, 'inventory.json');

const DOMAINS = [
  'core',
  'providers',
  'adapters',
  'mcp',
  'special',
  'validation',
  'infrastructure',
];
const PRUNE = new Set([
  'node_modules',
  '.git',
  'dist',
  '.next',
  '.turbo',
  '.nuxt',
  '.svelte-kit',
  'coverage',
]);

function readWorkspaceGlobs() {
  const file = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf8');
  const match = file.match(/^packages:([\s\S]*?)^[a-zA-Z_]/m);
  const block = match ? match[1] : file;
  const globs = [];
  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      const glob = trimmed.slice(2).trim().replace(/^['"]|['"]$/g, '');
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

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (PRUNE.has(entry.name) || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (fs.existsSync(path.join(full, 'package.json'))) out.push(full);
    walk(full, out);
  }
  return out;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    console.error(`  ! invalid JSON: ${path.relative(ROOT, file)} (${error.message})`);
    return null;
  }
}

function classifyDependency(name, packageNames, workspaceGlobs) {
  if (name.startsWith('node:') || builtinModules.includes(name)) {
    return 'node-builtin';
  }
  if (packageNames.has(name) || name.startsWith('@ai-toolkit/')) {
    return 'workspace';
  }
  return 'external';
}

function listExportLeaves(value, base, out = []) {
  if (typeof value === 'string') {
    out.push(base || '.');
    return out;
  }
  for (const [key, sub] of Object.entries(value)) {
    if (['types', 'import', 'require', 'default'].includes(key) && typeof sub === 'string') {
      out.push(base || '.');
      continue;
    }
    listExportLeaves(sub, base ? `${base}/${key}` : key, out);
  }
  return out;
}

function collectConditions(exports, out = new Set()) {
  if (typeof exports === 'string') return out;
  for (const [key, value] of Object.entries(exports)) {
    if (typeof value === 'string') {
      if (key !== 'package.json') out.add(key);
    } else if (key === 'package.json') {
      continue;
    } else if (key.startsWith('.')) {
      collectConditions(value, out);
    } else {
      out.add(key);
      collectConditions(value, out);
    }
  }
  return out;
}

function analyzeRuntimeAssumptions(pkgDir) {
  const assumptions = { nodeBuiltins: new Set(), usesGlobalFetch: false };
  const walk = dir => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (PRUNE.has(entry.name) || entry.name.startsWith('.')) continue;
        walk(full);
      } else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) {
        let content;
        try {
          content = fs.readFileSync(full, 'utf8');
        } catch {
          continue;
        }
        for (const m of content.matchAll(/from\s+['"]((?:node:)?[a-zA-Z0-9_@/-]+)['"]/g)) {
          const spec = m[1];
          if (spec.startsWith('node:') || builtinModules.includes(spec)) {
            assumptions.nodeBuiltins.add(spec.startsWith('node:') ? spec : `node:${spec}`);
          }
        }
        if (/globalThis\.fetch\b/.test(content)) assumptions.usesGlobalFetch = true;
      }
    }
  };
  walk(pkgDir);
  return {
    nodeBuiltins: [...assumptions.nodeBuiltins].sort(),
    usesGlobalFetch: assumptions.usesGlobalFetch,
  };
}

function domainFor(relDir) {
  const parts = relDir.split('/');
  if (parts[0] !== 'packages') return parts[0];
  const domain = parts[1];
  if (DOMAINS.includes(domain)) return domain;
  return 'legacy';
}

function main() {
  const workspaceGlobs = readWorkspaceGlobs();
  const regexes = workspaceGlobs.map(glob => ({ glob, regex: globToRegex(glob) }));

  const candidateDirs = walk(path.join(ROOT, 'packages'))
    .concat(walk(path.join(ROOT, 'tools')))
    .concat(walk(path.join(ROOT, 'examples')))
    .concat(walk(path.join(ROOT, 'apps')));

  const packages = [];
  const packageNames = new Set();
  const entries = [];

  for (const dir of candidateDirs) {
    const rel = path.relative(ROOT, dir).split(path.sep).join('/');
    const matchedGlobs = regexes
      .filter(({ regex }) => regex.test(rel))
      .map(({ glob }) => glob);
    if (matchedGlobs.length === 0) continue;

    const manifest = readJson(path.join(dir, 'package.json'));
    if (!manifest || typeof manifest.name !== 'string') continue;

    const packageRecord = { dir: rel, name: manifest.name };
    packages.push(packageRecord);
    packageNames.add(manifest.name);
    entries.push({ dir, rel, manifest, matchedGlobs });
  }

  const inventory = entries.map(({ dir, rel, manifest, matchedGlobs }) => {
    const dependencies = {
      ...manifest.dependencies,
      ...manifest.optionalDependencies,
      ...manifest.peerDependencies,
    };
    const depEntries = Object.entries(dependencies).map(([name, version]) => ({
      name,
      version,
      kind: classifyDependency(name, packageNames, workspaceGlobs),
    }));
    const exportsMap = manifest.exports || {};
    const runtime = analyzeRuntimeAssumptions(dir);
    return {
      name: manifest.name,
      dir: rel,
      domain: domainFor(rel),
      workspaceGlobs: matchedGlobs,
      version: manifest.version || null,
      private: manifest.private === true,
      source: manifest.source || null,
      main: manifest.main || null,
      module: manifest.module || null,
      types: manifest.types || null,
      exports: typeof exportsMap === 'string' ? ['.'] : Object.keys(exportsMap),
      conditions: [...collectConditions(exportsMap)].sort(),
      publicApi: listExportLeaves(exportsMap),
      dependencies: depEntries,
      runtimeAssumptions: runtime,
      stability: manifest.stability || null,
      owners: manifest.owners || null,
    };
  });

  const workspaceByName = new Map(inventory.map(pkg => [pkg.name, pkg]));

  const enriched = inventory.map(pkg => ({
    ...pkg,
    dependencyEdges: pkg.dependencies.map(dep => ({
      ...dep,
      direction: dep.kind === 'workspace' ? `to-${workspaceByName.get(dep.name)?.domain ?? 'unknown'}` : dep.kind,
    })),
  }));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), packages: enriched }, null, 2));

  const byDomain = {};
  for (const pkg of enriched) {
    (byDomain[pkg.domain] = byDomain[pkg.domain] || []).push(pkg.name);
  }

  console.log('\nWorkspace Inventory\n');
  console.log(`Workspace globs: ${workspaceGlobs.join(', ')}`);
  console.log(`Packages found: ${enriched.length}`);
  console.log('By domain:');
  for (const [domain, names] of Object.entries(byDomain).sort()) {
    console.log(`  ${domain}: ${names.length} (${names.join(', ')})`);
  }
  const withoutSource = enriched.filter(pkg => !pkg.source);
  const nodeDeps = enriched.filter(pkg => pkg.dependencies.some(d => d.kind === 'node-builtin'));
  const coreNodeImports = enriched.filter(pkg => pkg.domain === 'core' && pkg.runtimeAssumptions.nodeBuiltins.length > 0);
  console.log(`\nPackages without source entry: ${withoutSource.length}`);
  console.log(`Packages depending on Node builtins: ${nodeDeps.length}`);
  console.log(`Core packages importing Node builtins: ${coreNodeImports.length}`);
  console.log(`\nWrote ${path.relative(ROOT, OUT_FILE)}`);
}

main();
