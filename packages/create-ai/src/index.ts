#!/usr/bin/env node

import path from 'path';
import { copyDir } from './utils/copyDir';
import fs from 'fs';
import { runConfigMenu } from './configMenu';
import prompts from 'prompts';
import { execSync } from 'child_process';

console.log(
  '\x1b[36m%s\x1b[0m',
  'create-ai: Quickly scaffold new AI applications!',
);

type StarterKey = 'react-vite' | 'next-app-router' | 'next-pages-router';
const [, , starterArg, projectName] = process.argv;

const starters: Record<StarterKey, string> = {
  'react-vite': 'react-vite',
  'next-app-router': 'next-app-router',
  'next-pages-router': 'next-pages-router',
};

(async () => {
  try {
    if (!starterArg || !projectName) {
      console.log('Usage: npx create-ai <starter> <projectName>');
      console.log('\nStarters:');
      Object.entries(starters).forEach(([key, label]) => {
        console.log(`  ${key.padEnd(18)} ${label.replace(/-/g, ' ')}`);
      });
      process.exit(1);
    }

    if (!(starterArg in starters)) {
      console.error(`Unknown starter: ${starterArg}`);
      process.exit(1);
    }

    const starter = starterArg as StarterKey;
    const templateDir = path.resolve(
      __dirname,
      '../../../starters',
      starters[starter],
    );
    const targetDir = path.resolve(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      console.error(`Target directory '${projectName}' already exists.`);
      process.exit(1);
    }

    console.log(`Copying template '${starter}' to '${projectName}'...`);
    copyDir(templateDir, targetDir);
    console.log('Template copied!');

    // Run interactive config menu
    const config = await runConfigMenu();
    fs.writeFileSync(
      path.join(targetDir, 'ai-toolkit.config.json'),
      JSON.stringify(config, null, 2),
    );
    console.log('\nConfig saved to ai-toolkit.config.json');

    // Post-setup automation prompt
    const { autoInstall } = await prompts({
      type: 'confirm',
      name: 'autoInstall',
      message: 'Run npm install in the new project?',
      initial: true,
    });
    if (autoInstall) {
      console.log('Installing dependencies...');
      execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
    }

    const { autoGit } = await prompts({
      type: 'confirm',
      name: 'autoGit',
      message: 'Initialize a git repository?',
      initial: true,
    });
    if (autoGit) {
      console.log('Initializing git repository...');
      execSync('git init', { cwd: targetDir, stdio: 'inherit' });
    }

    console.log('Next steps:');
    console.log(`  cd ${projectName}`);
    if (!autoInstall) console.log('  npm install');
    if (!autoGit) console.log('  git init');
    console.log('  npm run dev');
    console.log('\n✨ Happy hacking!');
  } catch (err: any) {
    console.error('An error occurred:', err.message || err);
    process.exit(1);
  }
})();
