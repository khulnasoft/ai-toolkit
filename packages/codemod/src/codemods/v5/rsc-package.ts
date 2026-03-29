import { createTransformer } from '../lib/create-transformer';

/*
The `ai/rsc` export has been extracted to a separate package `@ai-tools/rsc`

Before:

```jsx
import { createStreamableValue } from 'ai/rsc';
```

After:

```bash
pnpm add @ai-tools/rsc
```

```jsx
import { createStreamableValue } from '@ai-tools/rsc';
```

Commit: https://github.com/khulnasoft/ai-toolkit/pull/5542
*/

export default createTransformer((fileInfo, api, options, context) => {
  const { j, root } = context;

  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'ai/rsc')
    .forEach(path => {
      path.node.source.value = '@ai-tools/rsc';
      context.hasChanges = true;
    });
});
