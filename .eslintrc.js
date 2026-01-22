module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-khulnasoft-ai`
  extends: ['vercel-ai'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
