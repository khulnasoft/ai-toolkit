#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSizeSync } from 'gzip-size';
import { glob } from 'glob';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const DIST_DIR = join(ROOT_DIR, 'dist');

interface BundleSizeResult {
  file: string;
  size: number;
  gzip: number;
  formattedSize: string;
  formattedGzip: string;
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

async function getPackageName(): Promise<string> {
  const pkg = JSON.parse(readFileSync(join(ROOT_DIR, 'package.json'), 'utf-8'));
  return pkg.name;
}

async function getBundleFiles(): Promise<string[]> {
  const files = await glob(join(DIST_DIR, '**/*.{js,mjs,cjs}'));
  return files.filter(
    file => !file.endsWith('.d.ts') && !file.includes('.d.ts.'),
  );
}

function getFileSize(file: string): number {
  const stats = require('node:fs').statSync(file);
  return stats.size;
}

function analyzeBundleSizes(files: string[]): BundleSizeResult[] {
  return files.map(file => {
    const size = getFileSize(file);
    const gzip = gzipSizeSync(readFileSync(file));
    return {
      file: file.replace(ROOT_DIR, ''),
      size,
      gzip,
      formattedSize: formatBytes(size),
      formattedGzip: formatBytes(gzip),
    };
  });
}

function printResults(results: BundleSizeResult[]): void {
  console.log('\n📦 Bundle Size Analysis\n');
  console.log('File'.padEnd(40), 'Size'.padEnd(15), 'Gzipped'.padEnd(15));
  console.log('-'.repeat(70));

  for (const result of results) {
    console.log(
      result.file.padEnd(40),
      result.formattedSize.padEnd(15),
      result.formattedGzip.padEnd(15),
    );
  }
  console.log('\n');
}

async function checkBundleSizes() {
  try {
    const packageName = await getPackageName();
    console.log(`📦 Checking bundle sizes for ${packageName}...\n`);

    const files = await getBundleFiles();

    if (files.length === 0) {
      console.error(
        '❌ No bundle files found. Please build the package first.',
      );
      process.exit(1);
    }

    const results = analyzeBundleSizes(files);
    printResults(results);

    // Check against thresholds (example: warn if any file > 100KB gzipped)
    const threshold = 100 * 1024; // 100KB in bytes
    const oversized = results.filter(r => r.gzip > threshold);

    if (oversized.length > 0) {
      console.warn(
        '⚠️  Warning: The following files exceed the size threshold (100KB gzipped):',
      );
      oversized.forEach(r => {
        console.warn(`  - ${r.file}: ${r.formattedGzip} (gzipped)`);
      });
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('❌ Error analyzing bundle sizes:', error);
    process.exit(1);
  }
}

// Run the script
checkBundleSizes();
