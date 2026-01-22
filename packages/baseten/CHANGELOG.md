# @ai-toolkit/baseten

## 1.0.17

### Patch Changes

- Updated dependencies [78555ad]
  - @ai-toolkit/openai-compatible@2.0.16

## 1.0.16

### Patch Changes

- Updated dependencies [7116ef3]
  - @ai-toolkit/openai-compatible@2.0.15

## 1.0.15

### Patch Changes

- Updated dependencies [1612a57]
  - @ai-toolkit/openai-compatible@2.0.14

## 1.0.14

### Patch Changes

- Updated dependencies [5c090e7]
  - @ai-toolkit/provider@3.0.4
  - @ai-toolkit/openai-compatible@2.0.13
  - @ai-toolkit/provider-utils@4.0.8

## 1.0.13

### Patch Changes

- Updated dependencies [78a133a]
  - @ai-toolkit/openai-compatible@2.0.12

## 1.0.12

### Patch Changes

- Updated dependencies [46f46e4]
  - @ai-toolkit/provider-utils@4.0.7
  - @ai-toolkit/openai-compatible@2.0.11

## 1.0.11

### Patch Changes

- Updated dependencies [1b11dcb]
  - @ai-toolkit/provider-utils@4.0.6
  - @ai-toolkit/provider@3.0.3
  - @ai-toolkit/openai-compatible@2.0.10

## 1.0.10

### Patch Changes

- Updated dependencies [bc02a3c]
  - @ai-toolkit/openai-compatible@2.0.9

## 1.0.9

### Patch Changes

- Updated dependencies [78fcb18]
  - @ai-toolkit/openai-compatible@2.0.8

## 1.0.8

### Patch Changes

- Updated dependencies [cd7bb0e]
  - @ai-toolkit/openai-compatible@2.0.7

## 1.0.7

### Patch Changes

- Updated dependencies [34d1c8a]
  - @ai-toolkit/provider-utils@4.0.5
  - @ai-toolkit/openai-compatible@2.0.6

## 1.0.6

### Patch Changes

- Updated dependencies [d54c380]
  - @ai-toolkit/openai-compatible@2.0.5

## 1.0.5

### Patch Changes

- Updated dependencies [d937c8f]
  - @ai-toolkit/provider@3.0.2
  - @ai-toolkit/openai-compatible@2.0.4
  - @ai-toolkit/provider-utils@4.0.4

## 1.0.4

### Patch Changes

- Updated dependencies [0b429d4]
  - @ai-toolkit/provider-utils@4.0.3
  - @ai-toolkit/openai-compatible@2.0.3

## 1.0.3

### Patch Changes

- 863d34f: fix: trigger release to update `@latest`
- Updated dependencies [863d34f]
  - @ai-toolkit/openai-compatible@2.0.2
  - @ai-toolkit/provider@3.0.1
  - @ai-toolkit/provider-utils@4.0.2

## 1.0.2

### Patch Changes

- Updated dependencies [29264a3]
  - @ai-toolkit/provider-utils@4.0.1
  - @ai-toolkit/openai-compatible@2.0.1

## 1.0.1

### Patch Changes

- c0c8a0e: Add zai/glm-4.7 model support

## 1.0.0

### Major Changes

- dee8b05: ai SDK 6 beta
- 6cc9cd0: Added Baseten as a Provider for AI TOOLKIT

### Patch Changes

- 0c3b58b: fix(provider): add specificationVersion to ProviderV3
- ab9af9c: add moonshotai/Kimi-K2-Thinking model ID for Baseten provider
- 8d9e8ad: chore(provider): remove generics from EmbeddingModelV3

  Before

  ```ts
  model.textEmbeddingModel('my-model-id');
  ```

  After

  ```ts
  model.embeddingModel('my-model-id');
  ```

- 95f65c2: chore: use import \* from zod/v4
- 0c4822d: feat: `EmbeddingModelV3`
- ed329cb: feat: `Provider-V3`
- 1cad0ab: feat: add provider version to user-agent header
- 916bc46: bumped performance client to 0.0.10
- 8dac895: feat: `LanguageModelV3`
- 366f50b: chore(provider): add deprecated textEmbeddingModel and textEmbedding aliases
- 4616b86: chore: update zod peer depenedency version
- Updated dependencies
  - @ai-toolkit/openai-compatible@2.0.0
  - @ai-toolkit/provider@3.0.0
  - @ai-toolkit/provider-utils@4.0.0

## 1.0.0-beta.62

### Patch Changes

- Updated dependencies [475189e]
  - @ai-toolkit/provider@3.0.0-beta.32
  - @ai-toolkit/openai-compatible@2.0.0-beta.60
  - @ai-toolkit/provider-utils@4.0.0-beta.59

## 1.0.0-beta.61

### Patch Changes

- Updated dependencies [2625a04]
  - @ai-toolkit/openai-compatible@2.0.0-beta.59
  - @ai-toolkit/provider@3.0.0-beta.31
  - @ai-toolkit/provider-utils@4.0.0-beta.58

## 1.0.0-beta.60

### Patch Changes

- Updated dependencies [cbf52cd]
  - @ai-toolkit/openai-compatible@2.0.0-beta.58
  - @ai-toolkit/provider@3.0.0-beta.30
  - @ai-toolkit/provider-utils@4.0.0-beta.57

## 1.0.0-beta.59

### Patch Changes

- Updated dependencies [9549c9e]
  - @ai-toolkit/provider@3.0.0-beta.29
  - @ai-toolkit/openai-compatible@2.0.0-beta.57
  - @ai-toolkit/provider-utils@4.0.0-beta.56

## 1.0.0-beta.58

### Patch Changes

- Updated dependencies [50b70d6]
  - @ai-toolkit/provider-utils@4.0.0-beta.55
  - @ai-toolkit/openai-compatible@2.0.0-beta.56

## 1.0.0-beta.57

### Patch Changes

- Updated dependencies [9061dc0]
  - @ai-toolkit/openai-compatible@2.0.0-beta.55
  - @ai-toolkit/provider-utils@4.0.0-beta.54
  - @ai-toolkit/provider@3.0.0-beta.28

## 1.0.0-beta.56

### Patch Changes

- 366f50b: chore(provider): add deprecated textEmbeddingModel and textEmbedding aliases
- Updated dependencies [366f50b]
  - @ai-toolkit/openai-compatible@2.0.0-beta.54
  - @ai-toolkit/provider@3.0.0-beta.27
  - @ai-toolkit/provider-utils@4.0.0-beta.53

## 1.0.0-beta.55

### Patch Changes

- Updated dependencies [763d04a]
  - @ai-toolkit/provider-utils@4.0.0-beta.52
  - @ai-toolkit/openai-compatible@2.0.0-beta.53

## 1.0.0-beta.54

### Patch Changes

- Updated dependencies [c1efac4]
  - @ai-toolkit/provider-utils@4.0.0-beta.51
  - @ai-toolkit/openai-compatible@2.0.0-beta.52

## 1.0.0-beta.53

### Patch Changes

- Updated dependencies [32223c8]
  - @ai-toolkit/provider-utils@4.0.0-beta.50
  - @ai-toolkit/openai-compatible@2.0.0-beta.51

## 1.0.0-beta.52

### Patch Changes

- Updated dependencies [83e5744]
  - @ai-toolkit/provider-utils@4.0.0-beta.49
  - @ai-toolkit/openai-compatible@2.0.0-beta.50

## 1.0.0-beta.51

### Patch Changes

- Updated dependencies [960ec8f]
  - @ai-toolkit/provider-utils@4.0.0-beta.48
  - @ai-toolkit/openai-compatible@2.0.0-beta.49

## 1.0.0-beta.50

### Patch Changes

- Updated dependencies [e9e157f]
  - @ai-toolkit/provider-utils@4.0.0-beta.47
  - @ai-toolkit/openai-compatible@2.0.0-beta.48

## 1.0.0-beta.49

### Patch Changes

- Updated dependencies [81e29ab]
  - @ai-toolkit/provider-utils@4.0.0-beta.46
  - @ai-toolkit/openai-compatible@2.0.0-beta.47

## 1.0.0-beta.48

### Patch Changes

- Updated dependencies [3bd2689]
  - @ai-toolkit/openai-compatible@2.0.0-beta.46
  - @ai-toolkit/provider@3.0.0-beta.26
  - @ai-toolkit/provider-utils@4.0.0-beta.45

## 1.0.0-beta.47

### Patch Changes

- Updated dependencies [53f3368]
  - @ai-toolkit/provider@3.0.0-beta.25
  - @ai-toolkit/openai-compatible@2.0.0-beta.45
  - @ai-toolkit/provider-utils@4.0.0-beta.44

## 1.0.0-beta.46

### Patch Changes

- Updated dependencies [dce03c4]
  - @ai-toolkit/provider-utils@4.0.0-beta.43
  - @ai-toolkit/provider@3.0.0-beta.24
  - @ai-toolkit/openai-compatible@2.0.0-beta.44

## 1.0.0-beta.45

### Patch Changes

- Updated dependencies [3ed5519]
  - @ai-toolkit/provider-utils@4.0.0-beta.42
  - @ai-toolkit/openai-compatible@2.0.0-beta.43

## 1.0.0-beta.44

### Patch Changes

- Updated dependencies [1bd7d32]
  - @ai-toolkit/openai-compatible@2.0.0-beta.42
  - @ai-toolkit/provider-utils@4.0.0-beta.41
  - @ai-toolkit/provider@3.0.0-beta.23

## 1.0.0-beta.43

### Patch Changes

- Updated dependencies [544d4e8]
  - @ai-toolkit/openai-compatible@2.0.0-beta.41
  - @ai-toolkit/provider-utils@4.0.0-beta.40
  - @ai-toolkit/provider@3.0.0-beta.22

## 1.0.0-beta.42

### Patch Changes

- Updated dependencies [954c356]
  - @ai-toolkit/provider-utils@4.0.0-beta.39
  - @ai-toolkit/provider@3.0.0-beta.21
  - @ai-toolkit/openai-compatible@2.0.0-beta.40

## 1.0.0-beta.41

### Patch Changes

- Updated dependencies [03849b0]
  - @ai-toolkit/provider-utils@4.0.0-beta.38
  - @ai-toolkit/openai-compatible@2.0.0-beta.39

## 1.0.0-beta.40

### Patch Changes

- Updated dependencies [457318b]
  - @ai-toolkit/openai-compatible@2.0.0-beta.38
  - @ai-toolkit/provider@3.0.0-beta.20
  - @ai-toolkit/provider-utils@4.0.0-beta.37

## 1.0.0-beta.39

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

- Updated dependencies [8d9e8ad]
  - @ai-toolkit/openai-compatible@2.0.0-beta.37
  - @ai-toolkit/provider@3.0.0-beta.19
  - @ai-toolkit/provider-utils@4.0.0-beta.36

## 1.0.0-beta.38

### Patch Changes

- Updated dependencies [10d819b]
  - @ai-toolkit/provider@3.0.0-beta.18
  - @ai-toolkit/openai-compatible@2.0.0-beta.36
  - @ai-toolkit/provider-utils@4.0.0-beta.35

## 1.0.0-beta.37

### Patch Changes

- Updated dependencies [db913bd]
  - @ai-toolkit/provider@3.0.0-beta.17
  - @ai-toolkit/openai-compatible@2.0.0-beta.35
  - @ai-toolkit/provider-utils@4.0.0-beta.34

## 1.0.0-beta.36

### Patch Changes

- ab9af9c: add moonshotai/Kimi-K2-Thinking model ID for Baseten provider

## 1.0.0-beta.35

### Patch Changes

- Updated dependencies [b681d7d]
  - @ai-toolkit/provider@3.0.0-beta.16
  - @ai-toolkit/openai-compatible@2.0.0-beta.34
  - @ai-toolkit/provider-utils@4.0.0-beta.33

## 1.0.0-beta.34

### Patch Changes

- Updated dependencies [32d8dbb]
  - @ai-toolkit/provider-utils@4.0.0-beta.32
  - @ai-toolkit/openai-compatible@2.0.0-beta.33

## 1.0.0-beta.33

### Patch Changes

- Updated dependencies [bb36798]
  - @ai-toolkit/provider@3.0.0-beta.15
  - @ai-toolkit/openai-compatible@2.0.0-beta.32
  - @ai-toolkit/provider-utils@4.0.0-beta.31

## 1.0.0-beta.32

### Patch Changes

- Updated dependencies [4f16c37]
  - @ai-toolkit/provider-utils@4.0.0-beta.30
  - @ai-toolkit/openai-compatible@2.0.0-beta.31

## 1.0.0-beta.31

### Patch Changes

- Updated dependencies [af3780b]
  - @ai-toolkit/provider@3.0.0-beta.14
  - @ai-toolkit/openai-compatible@2.0.0-beta.30
  - @ai-toolkit/provider-utils@4.0.0-beta.29

## 1.0.0-beta.30

### Patch Changes

- Updated dependencies [016b111]
  - @ai-toolkit/provider-utils@4.0.0-beta.28
  - @ai-toolkit/openai-compatible@2.0.0-beta.29

## 1.0.0-beta.29

### Patch Changes

- Updated dependencies [37c58a0]
  - @ai-toolkit/provider@3.0.0-beta.13
  - @ai-toolkit/openai-compatible@2.0.0-beta.28
  - @ai-toolkit/provider-utils@4.0.0-beta.27

## 1.0.0-beta.28

### Patch Changes

- Updated dependencies [d1bdadb]
  - @ai-toolkit/provider@3.0.0-beta.12
  - @ai-toolkit/openai-compatible@2.0.0-beta.27
  - @ai-toolkit/provider-utils@4.0.0-beta.26

## 1.0.0-beta.27

### Patch Changes

- Updated dependencies [4c44a5b]
  - @ai-toolkit/provider@3.0.0-beta.11
  - @ai-toolkit/openai-compatible@2.0.0-beta.26
  - @ai-toolkit/provider-utils@4.0.0-beta.25

## 1.0.0-beta.26

### Patch Changes

- 0c3b58b: fix(provider): add specificationVersion to ProviderV3
- Updated dependencies [0c3b58b]
  - @ai-toolkit/openai-compatible@2.0.0-beta.25
  - @ai-toolkit/provider@3.0.0-beta.10
  - @ai-toolkit/provider-utils@4.0.0-beta.24

## 1.0.0-beta.25

### Patch Changes

- Updated dependencies [a755db5]
  - @ai-toolkit/provider@3.0.0-beta.9
  - @ai-toolkit/openai-compatible@2.0.0-beta.24
  - @ai-toolkit/provider-utils@4.0.0-beta.23

## 1.0.0-beta.24

### Patch Changes

- Updated dependencies [58920e0]
  - @ai-toolkit/provider-utils@4.0.0-beta.22
  - @ai-toolkit/openai-compatible@2.0.0-beta.23

## 1.0.0-beta.23

### Patch Changes

- Updated dependencies [293a6b7]
  - @ai-toolkit/provider-utils@4.0.0-beta.21
  - @ai-toolkit/openai-compatible@2.0.0-beta.22

## 1.0.0-beta.22

### Patch Changes

- Updated dependencies [fca786b]
  - @ai-toolkit/provider-utils@4.0.0-beta.20
  - @ai-toolkit/openai-compatible@2.0.0-beta.21

## 1.0.0-beta.21

### Patch Changes

- Updated dependencies [3794514]
  - @ai-toolkit/provider-utils@4.0.0-beta.19
  - @ai-toolkit/provider@3.0.0-beta.8
  - @ai-toolkit/openai-compatible@2.0.0-beta.20

## 1.0.0-beta.20

### Patch Changes

- Updated dependencies [81d4308]
  - @ai-toolkit/provider@3.0.0-beta.7
  - @ai-toolkit/openai-compatible@2.0.0-beta.19
  - @ai-toolkit/provider-utils@4.0.0-beta.18

## 1.0.0-beta.19

### Patch Changes

- Updated dependencies [703459a]
  - @ai-toolkit/provider-utils@4.0.0-beta.17
  - @ai-toolkit/openai-compatible@2.0.0-beta.18

## 1.0.0-beta.18

### Patch Changes

- Updated dependencies [b689220]
  - @ai-toolkit/openai-compatible@2.0.0-beta.17

## 1.0.0-beta.17

### Patch Changes

- Updated dependencies [6306603]
  - @ai-toolkit/provider-utils@4.0.0-beta.16
  - @ai-toolkit/openai-compatible@2.0.0-beta.16

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies [f0b2157]
  - @ai-toolkit/provider-utils@4.0.0-beta.15
  - @ai-toolkit/openai-compatible@2.0.0-beta.15

## 1.0.0-beta.15

### Patch Changes

- Updated dependencies [3b1d015]
  - @ai-toolkit/provider-utils@4.0.0-beta.14
  - @ai-toolkit/openai-compatible@2.0.0-beta.14

## 1.0.0-beta.14

### Patch Changes

- Updated dependencies [d116b4b]
  - @ai-toolkit/provider-utils@4.0.0-beta.13
  - @ai-toolkit/openai-compatible@2.0.0-beta.13

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies [7e32fea]
  - @ai-toolkit/provider-utils@4.0.0-beta.12
  - @ai-toolkit/openai-compatible@2.0.0-beta.12

## 1.0.0-beta.12

### Patch Changes

- 95f65c2: chore: use import \* from zod/v4
- Updated dependencies
  - @ai-toolkit/openai-compatible@2.0.0-beta.11
  - @ai-toolkit/provider-utils@4.0.0-beta.11

## 1.0.0-beta.11

### Major Changes

- dee8b05: ai SDK 6 beta

### Patch Changes

- Updated dependencies [dee8b05]
  - @ai-toolkit/openai-compatible@2.0.0-beta.10
  - @ai-toolkit/provider@3.0.0-beta.6
  - @ai-toolkit/provider-utils@4.0.0-beta.10

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies [521c537]
  - @ai-toolkit/provider-utils@3.1.0-beta.9
  - @ai-toolkit/openai-compatible@1.1.0-beta.9

## 1.0.0-beta.9

### Patch Changes

- Updated dependencies [e06565c]
  - @ai-toolkit/provider-utils@3.1.0-beta.8
  - @ai-toolkit/openai-compatible@1.1.0-beta.8

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies
  - @ai-toolkit/provider@2.1.0-beta.5
  - @ai-toolkit/openai-compatible@1.1.0-beta.7
  - @ai-toolkit/provider-utils@3.1.0-beta.7

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies
  - @ai-toolkit/openai-compatible@1.1.0-beta.6
  - @ai-toolkit/provider-utils@3.1.0-beta.6
  - @ai-toolkit/provider@2.1.0-beta.4

## 1.0.0-beta.6

### Patch Changes

- 916bc46: bumped performance client to 0.0.10

## 1.0.0-beta.5

### Patch Changes

- 8dac895: feat: `LanguageModelV3`
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.1.0-beta.5
  - @ai-toolkit/provider-utils@3.1.0-beta.5
  - @ai-toolkit/provider@2.1.0-beta.3

## 1.0.0-beta.4

### Patch Changes

- 4616b86: chore: update zod peer depenedency version
- Updated dependencies [4616b86]
  - @ai-toolkit/openai-compatible@1.1.0-beta.4
  - @ai-toolkit/provider-utils@3.1.0-beta.4

## 1.0.0-beta.3

### Patch Changes

- ed329cb: feat: `Provider-V3`
- Updated dependencies
  - @ai-toolkit/openai-compatible@1.1.0-beta.3
  - @ai-toolkit/provider@2.1.0-beta.2
  - @ai-toolkit/provider-utils@3.1.0-beta.3

## 1.0.0-beta.2

### Patch Changes

- 0c4822d: feat: `EmbeddingModelV3`
- 1cad0ab: feat: add provider version to user-agent header
- Updated dependencies [0c4822d]
  - @ai-toolkit/openai-compatible@1.1.0-beta.2
  - @ai-toolkit/provider@2.1.0-beta.1
  - @ai-toolkit/provider-utils@3.1.0-beta.2

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [cbb1d35]
  - @ai-toolkit/provider-utils@3.1.0-beta.1
  - @ai-toolkit/openai-compatible@1.1.0-beta.1

## 1.0.0-beta.0

### Major Changes

- 6cc9cd0: Added Baseten as a Provider for AI TOOLKIT
