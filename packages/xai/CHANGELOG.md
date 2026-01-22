# @ai-toolkit/xai

## 3.0.29

### Patch Changes

- Updated dependencies [78555ad]
  - @ai-toolkit/openai-compatible@2.0.16

## 3.0.28

### Patch Changes

- Updated dependencies [7116ef3]
  - @ai-toolkit/openai-compatible@2.0.15

## 3.0.27

### Patch Changes

- Updated dependencies [1612a57]
  - @ai-toolkit/openai-compatible@2.0.14

## 3.0.26

### Patch Changes

- Updated dependencies [5c090e7]
  - @ai-toolkit/provider@3.0.4
  - @ai-toolkit/openai-compatible@2.0.13
  - @ai-toolkit/provider-utils@4.0.8

## 3.0.25

### Patch Changes

- Updated dependencies [78a133a]
  - @ai-toolkit/openai-compatible@2.0.12

## 3.0.24

### Patch Changes

- Updated dependencies [46f46e4]
  - @ai-toolkit/provider-utils@4.0.7
  - @ai-toolkit/openai-compatible@2.0.11

## 3.0.23

### Patch Changes

- Updated dependencies [1b11dcb]
  - @ai-toolkit/provider-utils@4.0.6
  - @ai-toolkit/provider@3.0.3
  - @ai-toolkit/openai-compatible@2.0.10

## 3.0.22

### Patch Changes

- Updated dependencies [bc02a3c]
  - @ai-toolkit/openai-compatible@2.0.9

## 3.0.21

### Patch Changes

- Updated dependencies [78fcb18]
  - @ai-toolkit/openai-compatible@2.0.8

## 3.0.20

### Patch Changes

- Updated dependencies [cd7bb0e]
  - @ai-toolkit/openai-compatible@2.0.7

## 3.0.19

### Patch Changes

- Updated dependencies [34d1c8a]
  - @ai-toolkit/provider-utils@4.0.5
  - @ai-toolkit/openai-compatible@2.0.6

## 3.0.18

### Patch Changes

- 9ed771c: feat(provider/xai): add image support to responses api

## 3.0.17

### Patch Changes

- Updated dependencies [d54c380]
  - @ai-toolkit/openai-compatible@2.0.5

## 3.0.16

### Patch Changes

- f446e23: fix(provider/xai): make streaming providerMetadata structure consistent with non-streaming

## 3.0.15

### Patch Changes

- ed1587d: feat (provider/xai): add support for encrypted reasoning content

## 3.0.14

### Patch Changes

- 0a081cb: fix (provider/xai): set response format to allow object generation

## 3.0.13

### Patch Changes

- 7ac2437: fix(provider/xai): send reasoning-end before text-start in streaming

## 3.0.12

### Patch Changes

- e7bdbc7: fix(provider/xai): handle error responses returned with 200 status

## 3.0.11

### Patch Changes

- 9a53f59: fix (provider/xai): no duplicate text delta in responses api

## 3.0.10

### Patch Changes

- 659c53d: fixed streaming tool input for custom_tool_call types (x_search, view_x_video) which were incorrectly returning empty input values

## 3.0.9

### Patch Changes

- 173dcfd: added support for streaming custom tool input chunks in xAI

## 3.0.8

### Patch Changes

- Updated dependencies [d937c8f]
  - @ai-toolkit/provider@3.0.2
  - @ai-toolkit/openai-compatible@2.0.4
  - @ai-toolkit/provider-utils@4.0.4

## 3.0.7

### Patch Changes

- 23179aa: fix (provider/xai): use correct format for function tools

## 3.0.6

### Patch Changes

- 77012ef: fix(xai): correct token counting for reasoning models to prevent negative text_output_tokens

## 3.0.5

### Patch Changes

- e7f0a6f: fix(xai): add missing stream response schema and provider tool name parsing

## 3.0.4

### Patch Changes

- Updated dependencies [0b429d4]
  - @ai-toolkit/provider-utils@4.0.3
  - @ai-toolkit/openai-compatible@2.0.3

## 3.0.3

### Patch Changes

- 863d34f: fix: trigger release to update `@latest`
- Updated dependencies [863d34f]
  - @ai-toolkit/openai-compatible@2.0.2
  - @ai-toolkit/provider@3.0.1
  - @ai-toolkit/provider-utils@4.0.2

## 3.0.2

### Patch Changes

- 2761f04: feat (provider/xai): fix chat usage output token computation

## 3.0.1

### Patch Changes

- Updated dependencies [29264a3]
  - @ai-toolkit/provider-utils@4.0.1
  - @ai-toolkit/openai-compatible@2.0.1

## 3.0.0

### Major Changes

- dee8b05: ai SDK 6 beta

### Minor Changes

- 78928cb: release: start 5.1 beta

### Patch Changes

- 0c3b58b: fix(provider): add specificationVersion to ProviderV3
- 8d9e8ad: chore(provider): remove generics from EmbeddingModelV3

  Before

  ```ts
  model.textEmbeddingModel('my-model-id');
  ```

  After

  ```ts
  model.embeddingModel('my-model-id');
  ```

- 2625a04: feat(openai); update spec for mcp approval
- b9e5b77: feat(xai): Support `parallel_function_calling` provider option for XAI provider
- 95f65c2: chore: use import \* from zod/v4
- 954c356: feat(openai): allow custom names for provider-defined tools
- 544d4e8: chore(specification): rename v3 provider defined tool to provider tool
- e8109d3: feat: tool execution approval
- ed329cb: feat: `Provider-V3`
- 3bd2689: feat: extended token usage
- 1cad0ab: feat: add provider version to user-agent header
- 8a2c18e: fix(provider/xai): remove json schema unsupported warning
- 8dac895: feat: `LanguageModelV3`
- 457318b: chore(provider,ai): switch to SharedV3Warning and unified warnings
- 366f50b: chore(provider): add deprecated textEmbeddingModel and textEmbedding aliases
- 248b540: fix(xai): responses model fixes
- 4616b86: chore: update zod peer depenedency version
- b39ec2c: Fix Responses API validation errors for server-side tools (web_search, x_search, code_execution). Add missing custom_tool_call type and streaming event schemas.
- 8514146: add grok-4-1 model IDs
- 5ad1bbe: feat: xai server-side tool calling
- 522f6b8: feat: `ImageModelV3`
- 1861f6f: feat(xai) add grok-4-fast model ids
- cbf52cd: feat: expose raw finish reason
- 10c1322: fix: moved dependency `@ai-toolkit/test-server` to devDependencies
- 4b4c37b: fix(xai): add cache input tokens
- 9cded0d: fix(provider/xai): correct sources format in searchParameters
- 47c0ac0: fix(xai): use correct parameter names for maxOutputTokens
- Updated dependencies
  - @ai-toolkit/openai-compatible@2.0.0
  - @ai-toolkit/provider@3.0.0
  - @ai-toolkit/provider-utils@4.0.0

## 3.0.0-beta.69

### Patch Changes

- Updated dependencies [475189e]
  - @ai-toolkit/provider@3.0.0-beta.32
  - @ai-toolkit/openai-compatible@2.0.0-beta.60
  - @ai-toolkit/provider-utils@4.0.0-beta.59

## 3.0.0-beta.68

### Patch Changes

- 2625a04: feat(openai); update spec for mcp approval
- Updated dependencies [2625a04]
  - @ai-toolkit/openai-compatible@2.0.0-beta.59
  - @ai-toolkit/provider@3.0.0-beta.31
  - @ai-toolkit/provider-utils@4.0.0-beta.58

## 3.0.0-beta.67

### Patch Changes

- cbf52cd: feat: expose raw finish reason
- Updated dependencies [cbf52cd]
  - @ai-toolkit/openai-compatible@2.0.0-beta.58
  - @ai-toolkit/provider@3.0.0-beta.30
  - @ai-toolkit/provider-utils@4.0.0-beta.57

## 3.0.0-beta.66

### Patch Changes

- Updated dependencies [9549c9e]
  - @ai-toolkit/provider@3.0.0-beta.29
  - @ai-toolkit/openai-compatible@2.0.0-beta.57
  - @ai-toolkit/provider-utils@4.0.0-beta.56

## 3.0.0-beta.65

### Patch Changes

- Updated dependencies [50b70d6]
  - @ai-toolkit/provider-utils@4.0.0-beta.55
  - @ai-toolkit/openai-compatible@2.0.0-beta.56

## 3.0.0-beta.64

### Patch Changes

- 9cded0d: fix(provider/xai): correct sources format in searchParameters

## 3.0.0-beta.63

### Patch Changes

- Updated dependencies [9061dc0]
  - @ai-toolkit/openai-compatible@2.0.0-beta.55
  - @ai-toolkit/provider-utils@4.0.0-beta.54
  - @ai-toolkit/provider@3.0.0-beta.28

## 3.0.0-beta.62

### Patch Changes

- 366f50b: chore(provider): add deprecated textEmbeddingModel and textEmbedding aliases
- Updated dependencies [366f50b]
  - @ai-toolkit/openai-compatible@2.0.0-beta.54
  - @ai-toolkit/provider@3.0.0-beta.27
  - @ai-toolkit/provider-utils@4.0.0-beta.53

## 3.0.0-beta.61

### Patch Changes

- Updated dependencies [763d04a]
  - @ai-toolkit/provider-utils@4.0.0-beta.52
  - @ai-toolkit/openai-compatible@2.0.0-beta.53

## 3.0.0-beta.60

### Patch Changes

- 47c0ac0: fix(xai): use correct parameter names for maxOutputTokens

## 3.0.0-beta.59

### Patch Changes

- Updated dependencies [c1efac4]
  - @ai-toolkit/provider-utils@4.0.0-beta.51
  - @ai-toolkit/openai-compatible@2.0.0-beta.52

## 3.0.0-beta.58

### Patch Changes

- Updated dependencies [32223c8]
  - @ai-toolkit/provider-utils@4.0.0-beta.50
  - @ai-toolkit/openai-compatible@2.0.0-beta.51

## 3.0.0-beta.57

### Patch Changes

- Updated dependencies [83e5744]
  - @ai-toolkit/provider-utils@4.0.0-beta.49
  - @ai-toolkit/openai-compatible@2.0.0-beta.50

## 3.0.0-beta.56

### Patch Changes

- Updated dependencies [960ec8f]
  - @ai-toolkit/provider-utils@4.0.0-beta.48
  - @ai-toolkit/openai-compatible@2.0.0-beta.49

## 3.0.0-beta.55

### Patch Changes

- Updated dependencies [e9e157f]
  - @ai-toolkit/provider-utils@4.0.0-beta.47
  - @ai-toolkit/openai-compatible@2.0.0-beta.48

## 3.0.0-beta.54

### Patch Changes

- Updated dependencies [81e29ab]
  - @ai-toolkit/provider-utils@4.0.0-beta.46
  - @ai-toolkit/openai-compatible@2.0.0-beta.47

## 3.0.0-beta.53

### Patch Changes

- 3bd2689: feat: extended token usage
- Updated dependencies [3bd2689]
  - @ai-toolkit/openai-compatible@2.0.0-beta.46
  - @ai-toolkit/provider@3.0.0-beta.26
  - @ai-toolkit/provider-utils@4.0.0-beta.45

## 3.0.0-beta.52

### Patch Changes

- Updated dependencies [53f3368]
  - @ai-toolkit/provider@3.0.0-beta.25
  - @ai-toolkit/openai-compatible@2.0.0-beta.45
  - @ai-toolkit/provider-utils@4.0.0-beta.44

## 3.0.0-beta.51

### Patch Changes

- Updated dependencies [dce03c4]
  - @ai-toolkit/provider-utils@4.0.0-beta.43
  - @ai-toolkit/provider@3.0.0-beta.24
  - @ai-toolkit/openai-compatible@2.0.0-beta.44

## 3.0.0-beta.50

### Patch Changes

- Updated dependencies [3ed5519]
  - @ai-toolkit/provider-utils@4.0.0-beta.42
  - @ai-toolkit/openai-compatible@2.0.0-beta.43

## 3.0.0-beta.49

### Patch Changes

- Updated dependencies [1bd7d32]
  - @ai-toolkit/openai-compatible@2.0.0-beta.42
  - @ai-toolkit/provider-utils@4.0.0-beta.41
  - @ai-toolkit/provider@3.0.0-beta.23

## 3.0.0-beta.48

### Patch Changes

- 544d4e8: chore(specification): rename v3 provider defined tool to provider tool
- Updated dependencies [544d4e8]
  - @ai-toolkit/openai-compatible@2.0.0-beta.41
  - @ai-toolkit/provider-utils@4.0.0-beta.40
  - @ai-toolkit/provider@3.0.0-beta.22

## 3.0.0-beta.47

### Patch Changes

- 954c356: feat(openai): allow custom names for provider-defined tools
- Updated dependencies [954c356]
  - @ai-toolkit/provider-utils@4.0.0-beta.39
  - @ai-toolkit/provider@3.0.0-beta.21
  - @ai-toolkit/openai-compatible@2.0.0-beta.40

## 3.0.0-beta.46

### Patch Changes

- Updated dependencies [03849b0]
  - @ai-toolkit/provider-utils@4.0.0-beta.38
  - @ai-toolkit/openai-compatible@2.0.0-beta.39

## 3.0.0-beta.45

### Patch Changes

- 457318b: chore(provider,ai): switch to SharedV3Warning and unified warnings
- Updated dependencies [457318b]
  - @ai-toolkit/openai-compatible@2.0.0-beta.38
  - @ai-toolkit/provider@3.0.0-beta.20
  - @ai-toolkit/provider-utils@4.0.0-beta.37

## 3.0.0-beta.44

### Patch Changes

- 8d9e8ad: chore(provider): remove generics from EmbeddingModelV3

  Before

  ```ts
  model.textEmbeddingModel('my-model-id');
  ```

  After

  ```ts
  model.embeddingModel('my-model-id');
  ```

- 8514146: add grok-4-1 model IDs
- Updated dependencies [8d9e8ad]
  - @ai-toolkit/openai-compatible@2.0.0-beta.37
  - @ai-toolkit/provider@3.0.0-beta.19
  - @ai-toolkit/provider-utils@4.0.0-beta.36

## 3.0.0-beta.43

### Patch Changes

- Updated dependencies [10d819b]
  - @ai-toolkit/provider@3.0.0-beta.18
  - @ai-toolkit/openai-compatible@2.0.0-beta.36
  - @ai-toolkit/provider-utils@4.0.0-beta.35

## 3.0.0-beta.42

### Patch Changes

- b39ec2c: Fix Responses API validation errors for server-side tools (web_search, x_search, code_execution). Add missing custom_tool_call type and streaming event schemas.

## 3.0.0-beta.41

### Patch Changes

- 248b540: fix(xai): responses model fixes

## 3.0.0-beta.40

### Patch Changes

- Updated dependencies [db913bd]
  - @ai-toolkit/provider@3.0.0-beta.17
  - @ai-toolkit/openai-compatible@2.0.0-beta.35
  - @ai-toolkit/provider-utils@4.0.0-beta.34

## 3.0.0-beta.39

### Patch Changes

- 4b4c37b: fix(xai): add cache input tokens

## 3.0.0-beta.38

### Patch Changes

- 8a2c18e: fix(provider/xai): remove json schema unsupported warning

## 3.0.0-beta.37

### Patch Changes

- Updated dependencies [b681d7d]
  - @ai-toolkit/provider@3.0.0-beta.16
  - @ai-toolkit/openai-compatible@2.0.0-beta.34
  - @ai-toolkit/provider-utils@4.0.0-beta.33

## 3.0.0-beta.36

### Patch Changes

- Updated dependencies [32d8dbb]
  - @ai-toolkit/provider-utils@4.0.0-beta.32
  - @ai-toolkit/openai-compatible@2.0.0-beta.33

## 3.0.0-beta.35

### Patch Changes

- Updated dependencies [bb36798]
  - @ai-toolkit/provider@3.0.0-beta.15
  - @ai-toolkit/openai-compatible@2.0.0-beta.32
  - @ai-toolkit/provider-utils@4.0.0-beta.31

## 3.0.0-beta.34

### Patch Changes

- 5ad1bbe: feat: xai server-side tool calling

## 3.0.0-beta.33

### Patch Changes

- Updated dependencies [4f16c37]
  - @ai-toolkit/provider-utils@4.0.0-beta.30
  - @ai-toolkit/openai-compatible@2.0.0-beta.31

## 3.0.0-beta.32

### Patch Changes

- Updated dependencies [af3780b]
  - @ai-toolkit/provider@3.0.0-beta.14
  - @ai-toolkit/openai-compatible@2.0.0-beta.30
  - @ai-toolkit/provider-utils@4.0.0-beta.29

## 3.0.0-beta.31

### Patch Changes

- Updated dependencies [016b111]
  - @ai-toolkit/provider-utils@4.0.0-beta.28
  - @ai-toolkit/openai-compatible@2.0.0-beta.29

## 3.0.0-beta.30

### Patch Changes

- Updated dependencies [37c58a0]
  - @ai-toolkit/provider@3.0.0-beta.13
  - @ai-toolkit/openai-compatible@2.0.0-beta.28
  - @ai-toolkit/provider-utils@4.0.0-beta.27

## 3.0.0-beta.29

### Patch Changes

- Updated dependencies [d1bdadb]
  - @ai-toolkit/provider@3.0.0-beta.12
  - @ai-toolkit/openai-compatible@2.0.0-beta.27
  - @ai-toolkit/provider-utils@4.0.0-beta.26

## 3.0.0-beta.28

### Patch Changes

- Updated dependencies [4c44a5b]
  - @ai-toolkit/provider@3.0.0-beta.11
  - @ai-toolkit/openai-compatible@2.0.0-beta.26
  - @ai-toolkit/provider-utils@4.0.0-beta.25

## 3.0.0-beta.27

### Patch Changes

- 0c3b58b: fix(provider): add specificationVersion to ProviderV3
- Updated dependencies [0c3b58b]
  - @ai-toolkit/openai-compatible@2.0.0-beta.25
  - @ai-toolkit/provider@3.0.0-beta.10
  - @ai-toolkit/provider-utils@4.0.0-beta.24

## 3.0.0-beta.26

### Patch Changes

- Updated dependencies [a755db5]
  - @ai-toolkit/provider@3.0.0-beta.9
  - @ai-toolkit/openai-compatible@2.0.0-beta.24
  - @ai-toolkit/provider-utils@4.0.0-beta.23

## 3.0.0-beta.25

### Patch Changes

- Updated dependencies [58920e0]
  - @ai-toolkit/provider-utils@4.0.0-beta.22
  - @ai-toolkit/openai-compatible@2.0.0-beta.23

## 3.0.0-beta.24

### Patch Changes

- Updated dependencies [293a6b7]
  - @ai-toolkit/provider-utils@4.0.0-beta.21
  - @ai-toolkit/openai-compatible@2.0.0-beta.22

## 3.0.0-beta.23

### Patch Changes

- b9e5b77: feat(xai): Support `parallel_function_calling` provider option for XAI provider

## 3.0.0-beta.22

### Patch Changes

- Updated dependencies [fca786b]
  - @ai-toolkit/provider-utils@4.0.0-beta.20
  - @ai-toolkit/openai-compatible@2.0.0-beta.21

## 3.0.0-beta.21

### Patch Changes

- Updated dependencies [3794514]
  - @ai-toolkit/provider-utils@4.0.0-beta.19
  - @ai-toolkit/provider@3.0.0-beta.8
  - @ai-toolkit/openai-compatible@2.0.0-beta.20

## 3.0.0-beta.20

### Patch Changes

- Updated dependencies [81d4308]
  - @ai-toolkit/provider@3.0.0-beta.7
  - @ai-toolkit/openai-compatible@2.0.0-beta.19
  - @ai-toolkit/provider-utils@4.0.0-beta.18

## 3.0.0-beta.19

### Patch Changes

- Updated dependencies [703459a]
  - @ai-toolkit/provider-utils@4.0.0-beta.17
  - @ai-toolkit/openai-compatible@2.0.0-beta.18

## 3.0.0-beta.18

### Patch Changes

- Updated dependencies [b689220]
  - @ai-toolkit/openai-compatible@2.0.0-beta.17

## 3.0.0-beta.17

### Patch Changes

- Updated dependencies [6306603]
  - @ai-toolkit/provider-utils@4.0.0-beta.16
  - @ai-toolkit/openai-compatible@2.0.0-beta.16

## 3.0.0-beta.16

### Patch Changes

- Updated dependencies [f0b2157]
  - @ai-toolkit/provider-utils@4.0.0-beta.15
  - @ai-toolkit/openai-compatible@2.0.0-beta.15

## 3.0.0-beta.15

### Patch Changes

- Updated dependencies [3b1d015]
  - @ai-toolkit/provider-utils@4.0.0-beta.14
  - @ai-toolkit/openai-compatible@2.0.0-beta.14

## 3.0.0-beta.14

### Patch Changes

- Updated dependencies [d116b4b]
  - @ai-toolkit/provider-utils@4.0.0-beta.13
  - @ai-toolkit/openai-compatible@2.0.0-beta.13

## 3.0.0-beta.13

### Patch Changes

- Updated dependencies [7e32fea]
  - @ai-toolkit/provider-utils@4.0.0-beta.12
  - @ai-toolkit/openai-compatible@2.0.0-beta.12

## 3.0.0-beta.12

### Patch Changes

- 95f65c2: chore: use import \* from zod/v4
- Updated dependencies
  - @ai-toolkit/openai-compatible@2.0.0-beta.11
  - @ai-toolkit/provider-utils@4.0.0-beta.11

## 3.0.0-beta.11

### Major Changes

- dee8b05: ai SDK 6 beta

### Patch Changes

- Updated dependencies [dee8b05]
  - @ai-toolkit/openai-compatible@2.0.0-beta.10
  - @ai-toolkit/provider@3.0.0-beta.6
  - @ai-toolkit/provider-utils@4.0.0-beta.10

## 2.1.0-beta.10

### Patch Changes

- Updated dependencies [521c537]
  - @ai-toolkit/provider-utils@3.1.0-beta.9
  - @ai-toolkit/openai-compatible@1.1.0-beta.9

## 2.1.0-beta.9

### Patch Changes

- Updated dependencies [e06565c]
  - @ai-toolkit/provider-utils@3.1.0-beta.8
  - @ai-toolkit/openai-compatible@1.1.0-beta.8

## 2.1.0-beta.8

### Patch Changes

- e8109d3: feat: tool execution approval
- Updated dependencies
  - @ai-toolkit/provider@2.1.0-beta.5
  - @ai-toolkit/openai-compatible@1.1.0-beta.7
  - @ai-toolkit/provider-utils@3.1.0-beta.7

## 2.1.0-beta.7

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.1.0-beta.6
  - @ai-toolkit/provider-utils@3.1.0-beta.6
  - @ai-toolkit/provider@2.1.0-beta.4

## 2.1.0-beta.6

### Patch Changes

- 8dac895: feat: `LanguageModelV3`
- 10c1322: fix: moved dependency `@ai-toolkit/test-server` to devDependencies
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.1.0-beta.5
  - @ai-toolkit/provider-utils@3.1.0-beta.5
  - @ai-toolkit/provider@2.1.0-beta.3

## 2.1.0-beta.5

### Patch Changes

- 4616b86: chore: update zod peer depenedency version
- Updated dependencies [4616b86]
  - @ai-toolkit/openai-compatible@1.1.0-beta.4
  - @ai-toolkit/provider-utils@3.1.0-beta.4

## 2.1.0-beta.4

### Patch Changes

- ed329cb: feat: `Provider-V3`
- 522f6b8: feat: `ImageModelV3`
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.1.0-beta.3
  - @ai-toolkit/provider@2.1.0-beta.2
  - @ai-toolkit/provider-utils@3.1.0-beta.3

## 2.1.0-beta.3

### Patch Changes

- 1cad0ab: feat: add provider version to user-agent header
- Updated dependencies [0c4822d]
  - @ai-toolkit/openai-compatible@1.1.0-beta.2
  - @ai-toolkit/provider@2.1.0-beta.1
  - @ai-toolkit/provider-utils@3.1.0-beta.2

## 2.1.0-beta.2

### Patch Changes

- 1861f6f: feat(xai) add grok-4-fast model ids

## 2.1.0-beta.1

### Patch Changes

- Updated dependencies
  - @ai-toolkit/test-server@1.0.0-beta.0
  - @ai-toolkit/provider-utils@3.1.0-beta.1
  - @ai-toolkit/openai-compatible@1.1.0-beta.1

## 2.1.0-beta.0

### Minor Changes

- 78928cb: release: start 5.1 beta

### Patch Changes

- Updated dependencies [78928cb]
  - @ai-toolkit/openai-compatible@1.1.0-beta.0
  - @ai-toolkit/provider@2.1.0-beta.0
  - @ai-toolkit/provider-utils@3.1.0-beta.0

## 2.0.20

### Patch Changes

- 3a10095: added new xai x live search fields

## 2.0.19

### Patch Changes

- Updated dependencies [28363da]
  - @ai-toolkit/openai-compatible@1.0.18

## 2.0.18

### Patch Changes

- Updated dependencies [3aed04c]
  - @ai-toolkit/openai-compatible@1.0.17

## 2.0.17

### Patch Changes

- Updated dependencies [0294b58]
  - @ai-toolkit/provider-utils@3.0.9
  - @ai-toolkit/openai-compatible@1.0.16

## 2.0.16

### Patch Changes

- Updated dependencies [99964ed]
  - @ai-toolkit/provider-utils@3.0.8
  - @ai-toolkit/openai-compatible@1.0.15

## 2.0.15

### Patch Changes

- Updated dependencies [818f021]
  - @ai-toolkit/openai-compatible@1.0.14

## 2.0.14

### Patch Changes

- ddb70ed: feat(xai) add grok-code-fast-1 model id

## 2.0.13

### Patch Changes

- Updated dependencies [886e7cd]
  - @ai-toolkit/provider-utils@3.0.7
  - @ai-toolkit/openai-compatible@1.0.13

## 2.0.12

### Patch Changes

- Updated dependencies [1b5a3d3]
  - @ai-toolkit/provider-utils@3.0.6
  - @ai-toolkit/openai-compatible@1.0.12

## 2.0.11

### Patch Changes

- Updated dependencies [0857788]
  - @ai-toolkit/provider-utils@3.0.5
  - @ai-toolkit/openai-compatible@1.0.11

## 2.0.10

### Patch Changes

- Updated dependencies [7ca3aee]
  - @ai-toolkit/openai-compatible@1.0.10

## 2.0.9

### Patch Changes

- Updated dependencies [68751f9]
  - @ai-toolkit/provider-utils@3.0.4
  - @ai-toolkit/openai-compatible@1.0.9

## 2.0.8

### Patch Changes

- Updated dependencies [515c891]
  - @ai-toolkit/openai-compatible@1.0.8

## 2.0.7

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.3
  - @ai-toolkit/openai-compatible@1.0.7

## 2.0.6

### Patch Changes

- Updated dependencies [38ac190]
  - @ai-toolkit/provider-utils@3.0.2
  - @ai-toolkit/openai-compatible@1.0.6

## 2.0.5

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.5

## 2.0.4

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [a0934f8]
  - @ai-toolkit/openai-compatible@1.0.3

## 2.0.2

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.2
  - @ai-toolkit/provider-utils@3.0.1

## 2.0.1

### Patch Changes

- Updated dependencies [0e8ed8e]
  - @ai-toolkit/openai-compatible@1.0.1

## 2.0.0

### Major Changes

- d5f588f: AI TOOLKIT 5
- 516be5b: ### Move Image Model Settings into generate options

  Image Models no longer have settings. Instead, `maxImagesPerCall` can be passed directly to `generateImage()`. All other image settings can be passed to `providerOptions[provider]`.

  Before

  ```js
  await generateImage({
    model: luma.image('photon-flash-1', {
      maxImagesPerCall: 5,
      pollIntervalMillis: 500,
    }),
    prompt,
    n: 10,
  });
  ```

  After

  ```js
  await generateImage({
    model: luma.image('photon-flash-1'),
    prompt,
    n: 10,
    maxImagesPerCall: 5,
    providerOptions: {
      luma: { pollIntervalMillis: 5 },
    },
  });
  ```

  Pull Request: https://github.com/khulnasoft/ai-toolkit/pull/6180

### Minor Changes

- b94b4ed: add live search

### Patch Changes

- 41cab5c: fix(providers/xai): edit supported models for structured output
- fa49207: feat(providers/openai-compatible): convert to providerOptions
- cf8280e: fix(providers/xai): return actual usage when streaming instead of NaN
- e2aceaf: feat: add raw chunk support
- eb173f1: chore (providers): remove model shorthand deprecation warnings
- 9301f86: refactor (image-model): rename `ImageModelV1` to `ImageModelV2`
- 6d835a7: fix (provider/grok): filter duplicated reasoning chunks
- d9b26f2: chore (providers/xai): update grok-3 model aliases
- 66b9661: feat (provider/xai): export XaiProviderOptions
- 9e986f7: feat (provider/xai): add grok-4 model id
- d1a034f: feature: using Zod 4 for internal stuff
- 107cd62: Add native XAI chat language model implementation
- 205077b: fix: improve Zod compatibility
- a7d3fbd: feat (providers/xai): add grok-3 models
- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0
  - @ai-toolkit/provider@2.0.0
  - @ai-toolkit/openai-compatible@1.0.0

## 2.0.0-beta.15

### Patch Changes

- Updated dependencies [88a8ee5]
  - @ai-toolkit/provider-utils@3.0.0-beta.10
  - @ai-toolkit/openai-compatible@1.0.0-beta.13

## 2.0.0-beta.14

### Patch Changes

- Updated dependencies [27deb4d]
  - @ai-toolkit/provider@2.0.0-beta.2
  - @ai-toolkit/openai-compatible@1.0.0-beta.12
  - @ai-toolkit/provider-utils@3.0.0-beta.9

## 2.0.0-beta.13

### Patch Changes

- eb173f1: chore (providers): remove model shorthand deprecation warnings
- Updated dependencies [dd5fd43]
  - @ai-toolkit/provider-utils@3.0.0-beta.8
  - @ai-toolkit/openai-compatible@1.0.0-beta.11

## 2.0.0-beta.12

### Patch Changes

- Updated dependencies [e7fcc86]
  - @ai-toolkit/provider-utils@3.0.0-beta.7
  - @ai-toolkit/openai-compatible@1.0.0-beta.10

## 2.0.0-beta.11

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.0-beta.9
  - @ai-toolkit/provider-utils@3.0.0-beta.6

## 2.0.0-beta.10

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-beta.5
  - @ai-toolkit/openai-compatible@1.0.0-beta.8

## 2.0.0-beta.9

### Patch Changes

- 205077b: fix: improve Zod compatibility
- Updated dependencies [205077b]
  - @ai-toolkit/openai-compatible@1.0.0-beta.7
  - @ai-toolkit/provider-utils@3.0.0-beta.4

## 2.0.0-beta.8

### Patch Changes

- 6d835a7: fix (provider/grok): filter duplicated reasoning chunks

## 2.0.0-beta.7

### Patch Changes

- Updated dependencies [281bb1c]
  - @ai-toolkit/openai-compatible@1.0.0-beta.6

## 2.0.0-beta.6

### Patch Changes

- Updated dependencies [05d2819]
  - @ai-toolkit/provider-utils@3.0.0-beta.3
  - @ai-toolkit/openai-compatible@1.0.0-beta.5

## 2.0.0-beta.5

### Patch Changes

- 66b9661: feat (provider/xai): export XaiProviderOptions
- Updated dependencies [1b101e1]
  - @ai-toolkit/openai-compatible@1.0.0-beta.4

## 2.0.0-beta.4

### Patch Changes

- 9e986f7: feat (provider/xai): add grok-4 model id

## 2.0.0-beta.3

### Patch Changes

- Updated dependencies [7b069ed]
  - @ai-toolkit/openai-compatible@1.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- d1a034f: feature: using Zod 4 for internal stuff
- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-beta.2
  - @ai-toolkit/openai-compatible@1.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-beta.1
  - @ai-toolkit/provider-utils@3.0.0-beta.1
  - @ai-toolkit/openai-compatible@1.0.0-beta.1

## 2.0.0-alpha.15

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-alpha.15
  - @ai-toolkit/provider-utils@3.0.0-alpha.15
  - @ai-toolkit/openai-compatible@1.0.0-alpha.15

## 2.0.0-alpha.14

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-alpha.14
  - @ai-toolkit/openai-compatible@1.0.0-alpha.14
  - @ai-toolkit/provider-utils@3.0.0-alpha.14

## 2.0.0-alpha.13

### Patch Changes

- Updated dependencies [68ecf2f]
  - @ai-toolkit/provider@2.0.0-alpha.13
  - @ai-toolkit/openai-compatible@1.0.0-alpha.13
  - @ai-toolkit/provider-utils@3.0.0-alpha.13

## 2.0.0-alpha.12

### Patch Changes

- e2aceaf: feat: add raw chunk support
- Updated dependencies [e2aceaf]
  - @ai-toolkit/openai-compatible@1.0.0-alpha.12
  - @ai-toolkit/provider@2.0.0-alpha.12
  - @ai-toolkit/provider-utils@3.0.0-alpha.12

## 2.0.0-alpha.11

### Patch Changes

- Updated dependencies [c1e6647]
  - @ai-toolkit/provider@2.0.0-alpha.11
  - @ai-toolkit/openai-compatible@1.0.0-alpha.11
  - @ai-toolkit/provider-utils@3.0.0-alpha.11

## 2.0.0-alpha.10

### Patch Changes

- Updated dependencies [c4df419]
  - @ai-toolkit/provider@2.0.0-alpha.10
  - @ai-toolkit/openai-compatible@1.0.0-alpha.10
  - @ai-toolkit/provider-utils@3.0.0-alpha.10

## 2.0.0-alpha.9

### Minor Changes

- b94b4ed: add live search

### Patch Changes

- 107cd62: Add native XAI chat language model implementation
- Updated dependencies [811dff3]
  - @ai-toolkit/provider@2.0.0-alpha.9
  - @ai-toolkit/openai-compatible@1.0.0-alpha.9
  - @ai-toolkit/provider-utils@3.0.0-alpha.9

## 2.0.0-alpha.8

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-alpha.8
  - @ai-toolkit/provider@2.0.0-alpha.8
  - @ai-toolkit/openai-compatible@1.0.0-alpha.8

## 2.0.0-alpha.7

### Patch Changes

- Updated dependencies [5c56081]
  - @ai-toolkit/provider@2.0.0-alpha.7
  - @ai-toolkit/openai-compatible@1.0.0-alpha.7
  - @ai-toolkit/provider-utils@3.0.0-alpha.7

## 2.0.0-alpha.6

### Patch Changes

- Updated dependencies [0d2c085]
  - @ai-toolkit/provider@2.0.0-alpha.6
  - @ai-toolkit/openai-compatible@1.0.0-alpha.6
  - @ai-toolkit/provider-utils@3.0.0-alpha.6

## 2.0.0-alpha.4

### Patch Changes

- Updated dependencies [dc714f3]
  - @ai-toolkit/provider@2.0.0-alpha.4
  - @ai-toolkit/openai-compatible@1.0.0-alpha.4
  - @ai-toolkit/provider-utils@3.0.0-alpha.4

## 2.0.0-alpha.3

### Patch Changes

- Updated dependencies [6b98118]
  - @ai-toolkit/provider@2.0.0-alpha.3
  - @ai-toolkit/openai-compatible@1.0.0-alpha.3
  - @ai-toolkit/provider-utils@3.0.0-alpha.3

## 2.0.0-alpha.2

### Patch Changes

- Updated dependencies [26535e0]
  - @ai-toolkit/provider@2.0.0-alpha.2
  - @ai-toolkit/openai-compatible@1.0.0-alpha.2
  - @ai-toolkit/provider-utils@3.0.0-alpha.2

## 2.0.0-alpha.1

### Patch Changes

- Updated dependencies [3f2f00c]
  - @ai-toolkit/provider@2.0.0-alpha.1
  - @ai-toolkit/openai-compatible@1.0.0-alpha.1
  - @ai-toolkit/provider-utils@3.0.0-alpha.1

## 2.0.0-canary.19

### Patch Changes

- Updated dependencies [faf8446]
  - @ai-toolkit/provider-utils@3.0.0-canary.19
  - @ai-toolkit/openai-compatible@1.0.0-canary.19

## 2.0.0-canary.18

### Patch Changes

- Updated dependencies [40acf9b]
  - @ai-toolkit/provider-utils@3.0.0-canary.18
  - @ai-toolkit/openai-compatible@1.0.0-canary.18

## 2.0.0-canary.17

### Major Changes

- 516be5b: ### Move Image Model Settings into generate options

  Image Models no longer have settings. Instead, `maxImagesPerCall` can be passed directly to `generateImage()`. All other image settings can be passed to `providerOptions[provider]`.

  Before

  ```js
  await generateImage({
    model: luma.image('photon-flash-1', {
      maxImagesPerCall: 5,
      pollIntervalMillis: 500,
    }),
    prompt,
    n: 10,
  });
  ```

  After

  ```js
  await generateImage({
    model: luma.image('photon-flash-1'),
    prompt,
    n: 10,
    maxImagesPerCall: 5,
    providerOptions: {
      luma: { pollIntervalMillis: 5 },
    },
  });
  ```

  Pull Request: https://github.com/khulnasoft/ai-toolkit/pull/6180

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.0-canary.17
  - @ai-toolkit/provider-utils@3.0.0-canary.17

## 2.0.0-canary.16

### Patch Changes

- Updated dependencies [87b828f]
  - @ai-toolkit/provider-utils@3.0.0-canary.16
  - @ai-toolkit/openai-compatible@1.0.0-canary.16

## 2.0.0-canary.15

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-canary.15
  - @ai-toolkit/provider@2.0.0-canary.14
  - @ai-toolkit/openai-compatible@1.0.0-canary.15

## 2.0.0-canary.14

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-canary.14
  - @ai-toolkit/provider@2.0.0-canary.13
  - @ai-toolkit/openai-compatible@1.0.0-canary.14

## 2.0.0-canary.13

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-canary.12
  - @ai-toolkit/openai-compatible@1.0.0-canary.13
  - @ai-toolkit/provider-utils@3.0.0-canary.13

## 2.0.0-canary.12

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-canary.11
  - @ai-toolkit/openai-compatible@1.0.0-canary.12
  - @ai-toolkit/provider-utils@3.0.0-canary.12

## 2.0.0-canary.11

### Patch Changes

- 9301f86: refactor (image-model): rename `ImageModelV1` to `ImageModelV2`
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.0-canary.11
  - @ai-toolkit/provider-utils@3.0.0-canary.11
  - @ai-toolkit/provider@2.0.0-canary.10

## 2.0.0-canary.10

### Patch Changes

- cf8280e: fix(providers/xai): return actual usage when streaming instead of NaN
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.0-canary.10
  - @ai-toolkit/provider@2.0.0-canary.9
  - @ai-toolkit/provider-utils@3.0.0-canary.10

## 2.0.0-canary.9

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-canary.8
  - @ai-toolkit/openai-compatible@1.0.0-canary.9
  - @ai-toolkit/provider-utils@3.0.0-canary.9

## 2.0.0-canary.8

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-canary.8
  - @ai-toolkit/provider@2.0.0-canary.7
  - @ai-toolkit/openai-compatible@1.0.0-canary.8

## 2.0.0-canary.7

### Patch Changes

- 41cab5c: fix(providers/xai): edit supported models for structured output
- fa49207: feat(providers/openai-compatible): convert to providerOptions
- d9b26f2: chore (providers/xai): update grok-3 model aliases
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.0-canary.7
  - @ai-toolkit/provider@2.0.0-canary.6
  - @ai-toolkit/provider-utils@3.0.0-canary.7

## 2.0.0-canary.6

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.0.0-canary.6
  - @ai-toolkit/provider@2.0.0-canary.5
  - @ai-toolkit/provider-utils@3.0.0-canary.6

## 2.0.0-canary.5

### Patch Changes

- a7d3fbd: feat (providers/xai): add grok-3 models
- Updated dependencies [6f6bb89]
  - @ai-toolkit/provider@2.0.0-canary.4
  - @ai-toolkit/openai-compatible@1.0.0-canary.5
  - @ai-toolkit/provider-utils@3.0.0-canary.5

## 2.0.0-canary.4

### Patch Changes

- Updated dependencies [d1a1aa1]
  - @ai-toolkit/provider@2.0.0-canary.3
  - @ai-toolkit/openai-compatible@1.0.0-canary.4
  - @ai-toolkit/provider-utils@3.0.0-canary.4

## 2.0.0-canary.3

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-canary.3
  - @ai-toolkit/provider@2.0.0-canary.2
  - @ai-toolkit/openai-compatible@1.0.0-canary.3

## 2.0.0-canary.2

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.0.0-canary.1
  - @ai-toolkit/openai-compatible@1.0.0-canary.2
  - @ai-toolkit/provider-utils@3.0.0-canary.2

## 2.0.0-canary.1

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@3.0.0-canary.1
  - @ai-toolkit/openai-compatible@1.0.0-canary.1

## 2.0.0-canary.0

### Major Changes

- d5f588f: AI TOOLKIT 5

### Patch Changes

- Updated dependencies [d5f588f]
  - @ai-toolkit/provider-utils@3.0.0-canary.0
  - @ai-toolkit/openai-compatible@1.0.0-canary.0
  - @ai-toolkit/provider@2.0.0-canary.0

## 1.2.6

### Patch Changes

- Updated dependencies [d186cca]
  - @ai-toolkit/openai-compatible@0.2.5

## 1.2.5

### Patch Changes

- Updated dependencies [28be004]
  - @ai-toolkit/provider-utils@2.2.3
  - @ai-toolkit/openai-compatible@0.2.4

## 1.2.4

### Patch Changes

- Updated dependencies [b01120e]
  - @ai-toolkit/provider-utils@2.2.2
  - @ai-toolkit/openai-compatible@0.2.3

## 1.2.3

### Patch Changes

- a6b55cc: feat (providers/openai-compatible): add openai-compatible image model and use as xai image model base
- Updated dependencies [a6b55cc]
  - @ai-toolkit/openai-compatible@0.2.2

## 1.2.2

### Patch Changes

- Updated dependencies [f10f0fa]
  - @ai-toolkit/provider-utils@2.2.1
  - @ai-toolkit/openai-compatible@0.2.1

## 1.2.1

### Patch Changes

- 82b5620: fix (providers/xai): handle raw b64 image response data

## 1.2.0

### Minor Changes

- 5bc638d: AI TOOLKIT 4.2

### Patch Changes

- Updated dependencies [5bc638d]
  - @ai-toolkit/openai-compatible@0.2.0
  - @ai-toolkit/provider@1.1.0
  - @ai-toolkit/provider-utils@2.2.0

## 1.1.18

### Patch Changes

- 6f0e741: feat (providers/xai): add xai image model support

## 1.1.17

### Patch Changes

- Updated dependencies [d0c4659]
  - @ai-toolkit/provider-utils@2.1.15
  - @ai-toolkit/openai-compatible@0.1.17

## 1.1.16

### Patch Changes

- Updated dependencies [0bd5bc6]
  - @ai-toolkit/provider@1.0.12
  - @ai-toolkit/openai-compatible@0.1.16
  - @ai-toolkit/provider-utils@2.1.14

## 1.1.15

### Patch Changes

- Updated dependencies [2e1101a]
  - @ai-toolkit/provider@1.0.11
  - @ai-toolkit/openai-compatible@0.1.15
  - @ai-toolkit/provider-utils@2.1.13

## 1.1.14

### Patch Changes

- Updated dependencies [1531959]
  - @ai-toolkit/provider-utils@2.1.12
  - @ai-toolkit/openai-compatible@0.1.14

## 1.1.13

### Patch Changes

- Updated dependencies [e1d3d42]
  - @ai-toolkit/openai-compatible@0.1.13
  - @ai-toolkit/provider@1.0.10
  - @ai-toolkit/provider-utils@2.1.11

## 1.1.12

### Patch Changes

- Updated dependencies [ddf9740]
  - @ai-toolkit/provider@1.0.9
  - @ai-toolkit/openai-compatible@0.1.12
  - @ai-toolkit/provider-utils@2.1.10

## 1.1.11

### Patch Changes

- Updated dependencies [2761f06]
  - @ai-toolkit/provider@1.0.8
  - @ai-toolkit/openai-compatible@0.1.11
  - @ai-toolkit/provider-utils@2.1.9

## 1.1.10

### Patch Changes

- Updated dependencies [2e898b4]
  - @ai-toolkit/provider-utils@2.1.8
  - @ai-toolkit/openai-compatible@0.1.10

## 1.1.9

### Patch Changes

- Updated dependencies [3ff4ef8]
  - @ai-toolkit/provider-utils@2.1.7
  - @ai-toolkit/openai-compatible@0.1.9

## 1.1.8

### Patch Changes

- Updated dependencies [d89c3b9]
  - @ai-toolkit/provider@1.0.7
  - @ai-toolkit/openai-compatible@0.1.8
  - @ai-toolkit/provider-utils@2.1.6

## 1.1.7

### Patch Changes

- Updated dependencies [f2c6c37]
  - @ai-toolkit/openai-compatible@0.1.7

## 1.1.6

### Patch Changes

- Updated dependencies [3a602ca]
  - @ai-toolkit/provider-utils@2.1.5
  - @ai-toolkit/openai-compatible@0.1.6

## 1.1.5

### Patch Changes

- Updated dependencies [066206e]
  - @ai-toolkit/provider-utils@2.1.4
  - @ai-toolkit/openai-compatible@0.1.5

## 1.1.4

### Patch Changes

- Updated dependencies [39e5c1f]
  - @ai-toolkit/provider-utils@2.1.3
  - @ai-toolkit/openai-compatible@0.1.4

## 1.1.3

### Patch Changes

- Updated dependencies [361fd08]
  - @ai-toolkit/openai-compatible@0.1.3

## 1.1.2

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@0.1.2
  - @ai-toolkit/provider-utils@2.1.2
  - @ai-toolkit/provider@1.0.6

## 1.1.1

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@2.1.1
  - @ai-toolkit/openai-compatible@0.1.1
  - @ai-toolkit/provider@1.0.5

## 1.1.0

### Minor Changes

- 62ba5ad: release: AI TOOLKIT 4.1

### Patch Changes

- Updated dependencies [62ba5ad]
  - @ai-toolkit/openai-compatible@0.1.0
  - @ai-toolkit/provider-utils@2.1.0

## 1.0.19

### Patch Changes

- Updated dependencies [00114c5]
  - @ai-toolkit/provider-utils@2.0.8
  - @ai-toolkit/openai-compatible@0.0.18

## 1.0.18

### Patch Changes

- Updated dependencies [ae57beb]
  - @ai-toolkit/openai-compatible@0.0.17

## 1.0.17

### Patch Changes

- 7611964: feat (provider/xai): Support structured output for latest models.
- Updated dependencies [7611964]
  - @ai-toolkit/openai-compatible@0.0.16

## 1.0.16

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider-utils@2.0.7
  - @ai-toolkit/openai-compatible@0.0.15

## 1.0.15

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@1.0.4
  - @ai-toolkit/provider-utils@2.0.6
  - @ai-toolkit/openai-compatible@0.0.14

## 1.0.14

### Patch Changes

- Updated dependencies [6564812]
  - @ai-toolkit/openai-compatible@0.0.13

## 1.0.13

### Patch Changes

- Updated dependencies [70003b8]
  - @ai-toolkit/openai-compatible@0.0.12

## 1.0.12

### Patch Changes

- 5ed5e45: chore (config): Use ts-library.json tsconfig for no-UI libs.
- Updated dependencies
  - @ai-toolkit/openai-compatible@0.0.11
  - @ai-toolkit/provider-utils@2.0.5
  - @ai-toolkit/provider@1.0.3

## 1.0.11

### Patch Changes

- Updated dependencies [baae8f4]
  - @ai-toolkit/openai-compatible@0.0.10

## 1.0.10

### Patch Changes

- Updated dependencies [9c7653b]
  - @ai-toolkit/openai-compatible@0.0.9

## 1.0.9

### Patch Changes

- Updated dependencies [6faab13]
  - @ai-toolkit/openai-compatible@0.0.8

## 1.0.8

### Patch Changes

- 50821de: feat (docs): Use new grok-2 model in xai example code.

## 1.0.7

### Patch Changes

- 4e9032c: feat (provider/xai): Add grok-2 models, use openai-compatible base impl.

## 1.0.6

### Patch Changes

- Updated dependencies [09a9cab]
  - @ai-toolkit/provider@1.0.2
  - @ai-toolkit/provider-utils@2.0.4

## 1.0.5

### Patch Changes

- Updated dependencies [0984f0b]
  - @ai-toolkit/provider-utils@2.0.3

## 1.0.4

### Patch Changes

- b1f31da: chore (providers): Remove obsolete 'internal' from several packages.

## 1.0.3

### Patch Changes

- Updated dependencies [b446ae5]
  - @ai-toolkit/provider@1.0.1
  - @ai-toolkit/provider-utils@2.0.2

## 1.0.2

### Patch Changes

- Updated dependencies [c3ab5de]
  - @ai-toolkit/provider-utils@2.0.1

## 1.0.1

### Patch Changes

- 870c09e: feat (provider/xai): add groq-vision-beta support

## 1.0.0

### Patch Changes

- 75d0065: feat (providers/xai): Initial xAI provider.
- Updated dependencies
  - @ai-toolkit/provider-utils@2.0.0
  - @ai-toolkit/provider@1.0.0

## 1.0.0-canary.1

### Patch Changes

- 75d0065: feat (providers/xai): Initial xAI provider.
