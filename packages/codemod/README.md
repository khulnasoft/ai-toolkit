# AI TOOLKIT Codemods

The AI TOOLKIT provides Codemod transformations to help upgrade your codebase when a feature is deprecated, removed, or otherwise changed.

Codemods are transformations that run on your codebase programmatically. They allow you to easily apply many changes without having to manually go through every file.

You can run all codemods by running the following command from the root of your project:

```sh
npx @ai-toolkit/codemod upgrade
```

Individual codemods can be run by specifying the name of the codemod:

```sh
npx @ai-toolkit/codemod <codemod-name> <path>
```

The latest set of codemods can be found in the [`@ai-toolkit/codemod`](https://github.com/khulnasoft/ai-toolkit/tree/main/packages/codemod/src/codemods) repository.
