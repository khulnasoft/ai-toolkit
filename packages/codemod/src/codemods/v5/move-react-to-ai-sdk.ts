import { createTransformer } from '../lib/create-transformer';

/**
 * Migrates from ai/react to @ai-tools/react:
 * - import { useChat } from 'ai/react' → import { useChat } from '@ai-tools/react'
 */
export default createTransformer((fileInfo, api, options, context) => {
  const { j, root } = context;

  // Transform imports from 'ai/react' to '@ai-tools/react'
  root
    .find(j.ImportDeclaration, {
      source: {
        value: 'ai/react',
      },
    })
    .forEach((path: any) => {
      path.node.source.value = '@ai-tools/react';
      context.hasChanges = true;
    });
});
