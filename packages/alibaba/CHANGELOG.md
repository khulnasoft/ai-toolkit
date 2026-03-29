# @ai-tools/alibaba

## 2.0.0-beta.12

### Patch Changes

- Updated dependencies [1f509d4]
  - @ai-tools/provider-utils@5.0.0-beta.7
  - @ai-tools/provider@4.0.0-beta.5
  - @ai-tools/openai-compatible@3.0.0-beta.10

## 2.0.0-beta.11

### Patch Changes

- 74d520f: feat: migrate providers to support new top-level `reasoning` parameter
- Updated dependencies [74d520f]
  - @ai-tools/openai-compatible@3.0.0-beta.9

## 2.0.0-beta.10

### Patch Changes

- Updated dependencies [3887c70]
  - @ai-tools/provider-utils@5.0.0-beta.6
  - @ai-tools/provider@4.0.0-beta.4
  - @ai-tools/openai-compatible@3.0.0-beta.8

## 2.0.0-beta.9

### Patch Changes

- Updated dependencies [776b617]
  - @ai-tools/provider-utils@5.0.0-beta.5
  - @ai-tools/provider@4.0.0-beta.3
  - @ai-tools/openai-compatible@3.0.0-beta.7

## 2.0.0-beta.8

### Patch Changes

- Updated dependencies [61753c3]
  - @ai-tools/provider-utils@5.0.0-beta.4
  - @ai-tools/openai-compatible@3.0.0-beta.6

## 2.0.0-beta.7

### Patch Changes

- 811cd8e: fix(provider/alibaba): handle single-item content array cache control

## 2.0.0-beta.6

### Patch Changes

- Updated dependencies [f7d4f01]
  - @ai-tools/provider-utils@5.0.0-beta.3
  - @ai-tools/provider@4.0.0-beta.2
  - @ai-tools/openai-compatible@3.0.0-beta.5

## 2.0.0-beta.5

### Patch Changes

- Updated dependencies [5c2a5a2]
  - @ai-tools/provider@4.0.0-beta.1
  - @ai-tools/openai-compatible@3.0.0-beta.4
  - @ai-tools/provider-utils@5.0.0-beta.2

## 2.0.0-beta.4

### Patch Changes

- Updated dependencies [8f3e1da]
  - @ai-tools/openai-compatible@3.0.0-beta.3

## 2.0.0-beta.3

### Patch Changes

- 4ab27b9: chore(alibaba): update v3 specs to v4

## 2.0.0-beta.2

### Patch Changes

- 45b3d76: fix(security): prevent streaming tool calls from finalizing on parsable partial JSON

  Streaming tool call arguments were finalized using `isParsableJson()` as a heuristic for completion. If partial accumulated JSON happened to be valid JSON before all chunks arrived, the tool call would be executed with incomplete arguments. Tool call finalization now only occurs in `flush()` after the stream is fully consumed.

- f7295cb: revert incorrect fix https://github.com/khulnasoft/ai-toolkit/pull/13172
- Updated dependencies [45b3d76]
- Updated dependencies [f7295cb]
  - @ai-tools/openai-compatible@3.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- Updated dependencies [531251e]
  - @ai-tools/provider-utils@5.0.0-beta.1
  - @ai-tools/openai-compatible@3.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- 8359612: Start v7 pre-release

### Patch Changes

- Updated dependencies [8359612]
  - @ai-tools/openai-compatible@3.0.0-beta.0
  - @ai-tools/provider@4.0.0-beta.0
  - @ai-tools/provider-utils@5.0.0-beta.0

## 1.0.10

### Patch Changes

- Updated dependencies [ad4cfc2]
  - @ai-tools/provider-utils@4.0.19
  - @ai-tools/openai-compatible@2.0.35

## 1.0.9

### Patch Changes

- Updated dependencies [824b295]
  - @ai-tools/provider-utils@4.0.18
  - @ai-tools/openai-compatible@2.0.34

## 1.0.8

### Patch Changes

- Updated dependencies [89caf28]
  - @ai-tools/openai-compatible@2.0.33

## 1.0.7

### Patch Changes

- Updated dependencies [08336f1]
  - @ai-tools/provider-utils@4.0.17
  - @ai-tools/openai-compatible@2.0.32

## 1.0.6

### Patch Changes

- Updated dependencies [58bc42d]
  - @ai-tools/provider-utils@4.0.16
  - @ai-tools/openai-compatible@2.0.31

## 1.0.5

### Patch Changes

- 6fe0630: fix(provider/alibaba): fix cache control for non-system messages

## 1.0.4

### Patch Changes

- Updated dependencies [4024a3a]
  - @ai-tools/provider-utils@4.0.15
  - @ai-tools/openai-compatible@2.0.30

## 1.0.3

### Patch Changes

- 99fbed8: feat: normalize provider specific model options type names and ensure they are exported
- Updated dependencies [99fbed8]
  - @ai-tools/openai-compatible@2.0.29

## 1.0.2

### Patch Changes

- 4d8c6b9: feat (provider/alibaba): add video generation support

## 1.0.1

### Patch Changes

- Updated dependencies [7168375]
  - @ai-tools/provider@3.0.8
  - @ai-tools/openai-compatible@2.0.28
  - @ai-tools/provider-utils@4.0.14

## 1.0.0

### Major Changes

- aa924c7: feat(provider/alibaba): initial alibaba provider
