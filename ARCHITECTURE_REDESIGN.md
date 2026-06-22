# AI Toolkit: Enterprise Monorepo Architecture Redesign

**Status:** Architecture Proposal v1.0  
**Date:** June 2026  
**Audience:** Principal Engineers, Tech Leads, Contributors  
**Scope:** Complete restructuring for 500+ contributors, 100+ packages, 1000+ examples

---

## Executive Summary

This document proposes a **domain-driven, layered architecture** that transforms the current flat monorepo into an enterprise-grade system optimized for:

- **Scalability**: Support 500+ concurrent contributors
- **Clarity**: Crystal-clear ownership and boundaries
- **DX**: Superior developer experience with automated workflows
- **Enterprise**: Production-grade governance and standards
- **Growth**: Built for 100+ packages and 1000+ examples

**Key Changes:**

- Move from flat `packages/` to domain-organized structure
- Separate AI providers, MCPs, framework adapters, and tools
- Establish clear internal vs. public APIs
- Create comprehensive onboarding & governance
- Implement ownership, testing, and CI/CD strategies

---

## Current State Analysis

### Existing Structure Issues

```
❌ packages/ (50+ packages mixed together)
   - Core SDK packages (ai, react, rsc)
   - 30+ AI provider packages
   - Framework adapters (angular, svelte, vue)
   - Internal tools (provider-utils, codemod)
   - Test utilities (test-server, valibot)
   - MCP implementation (mcp)

❌ examples/ (20+ examples at root level)
   - Scattered across different frameworks
   - No categorization or discovery path
   - Difficult to maintain consistency

❌ content/ (Documentation scattered)
   - Docs live in apps/docs/content
   - Cookbook examples in content/cookbook
   - Provider docs in content/providers
   - Duplication across multiple sources

❌ tools/ (Unclear ownership)
   - Build tools, linters, etc.
   - No clear separation of concerns
   - Mixed with packages/
```

### Current Problems

1. **Poor Discoverability**: 50 packages in flat structure; hard to find related code
2. **Unclear Ownership**: No CODEOWNERS; difficult to know who maintains what
3. **Mixed Concerns**: Providers, tools, adapters all in one directory
4. **Duplicated Docs**: Same concepts explained in multiple places
5. **Onboarding Friction**: New contributors can't easily find where to add features
6. **CI/CD Complexity**: Turbo can't easily target specific domains
7. **Versioning Confusion**: Public APIs, internal APIs, and examples versions mixed
8. **Testing Scattered**: Tests live in packages; hard to run domain-level suites

---

## Enterprise Architecture Principles

### 1. Domain-Driven Design

- Group related packages by business capability
- Each domain has clear responsibility
- Domains can be understood independently

### 2. Layered Architecture

- **Core Layer**: Foundation packages (ai, react, rsc)
- **Provider Layer**: AI provider integrations
- **Adapter Layer**: Framework-specific implementations
- **Tool Layer**: Developer utilities and infrastructure
- **Example Layer**: Reference implementations

### 3. Explicit Boundaries

- **Public APIs**: Versioned, stable, change-controlled
- **Internal APIs**: Subject to change, documented
- **Example APIs**: For reference only, not for production
- **Tool APIs**: Internal developer infrastructure

### 4. Clear Ownership

- CODEOWNERS enforces review requirements
- Domain leads have decision authority
- Automated governance prevents accidental changes

### 5. Enterprise Developer Experience

- Automated setup (monorepo setup guides)
- One-command onboarding
- Clear contribution workflows
- Automated governance checks

---

## Proposed Repository Structure

```
ai-toolkit/
├── README.md                              # Quick start guide
├── CONTRIBUTING.md                         # Contribution workflow
├── ARCHITECTURE.md                         # Architecture overview (this doc)
├── CODEOWNERS                              # Ownership & review requirements
├── ADR/                                    # Architecture Decision Records
│   ├── ADR-001-monorepo-strategy.md
│   ├── ADR-002-version-management.md
│   ├── ADR-003-testing-strategy.md
│   └── ...
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE/
│   ├── workflows/                          # CI/CD pipelines
│   │   ├── ci.yml                          # Main CI pipeline
│   │   ├── release.yml                     # Release automation
│   │   ├── docs.yml                        # Documentation
│   │   └── governance.yml                  # Automated checks
│   ├── scripts/
│   └── DISCUSSION_TEMPLATE/
│
├── .devcontainer/                          # Local dev setup
│
├── biome.json                              # Code quality rules
├── turbo.json                              # Turbo configuration
├── tsconfig.base.json                      # Shared TypeScript config
├── pnpm-workspace.yaml                     # Workspace definition
├── package.json                            # Root package scripts
│
# ============================================================
# CORE LAYER - Foundation packages (Framework-agnostic)
# ============================================================
├── packages/core/                          # Core SDK packages
│   ├── ai/                                 # @ai-sdk/core
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── shared/                             # @ai-sdk/shared
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── errors/
│   │   └── package.json
│   │
│   └── telemetry/                          # @ai-sdk/telemetry
│       ├── src/
│       └── package.json
│
# ============================================================
# PROVIDER LAYER - LLM provider integrations
# ============================================================
├── packages/providers/                     # AI provider packages
│   ├── openai/                             # @ai-sdk/openai
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── anthropic/                          # @ai-sdk/anthropic
│   │   ├── src/
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── google-vertex/                      # @ai-sdk/google-vertex
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── cohere/                             # @ai-sdk/cohere
│   ├── mistral/                            # @ai-sdk/mistral
│   ├── groq/                               # @ai-sdk/groq
│   ├── deepinfra/                          # @ai-sdk/deepinfra
│   ├── xai/                                # @ai-sdk/xai
│   ├── togetherai/                         # @ai-sdk/togetherai
│   ├── fireworks/                          # @ai-sdk/fireworks
│   ├── replicate/                          # @ai-sdk/replicate
│   │
│   # ✅ 27 more provider directories follow same pattern
│   │
│   └── openai-compatible/                  # @ai-sdk/openai-compatible
│       ├── src/
│       └── package.json
│
# ============================================================
# FRAMEWORK ADAPTER LAYER - Framework-specific implementations
# ============================================================
├── packages/adapters/                      # Framework adapters
│   ├── react/                              # @ai-sdk/react
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   ├── components/
│   │   │   └── ui/
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── rsc/                                # @ai-sdk/rsc (Next.js specific)
│   │   ├── src/
│   │   ├── tests/
│   │   │   └── e2e/
│   │   │       └── next-server/
│   │   └── package.json
│   │
│   ├── angular/                            # @ai-sdk/angular
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── svelte/                             # @ai-sdk/svelte
│   │   ├── src/
│   │   └── package.json
│   │
│   └── vue/                                # @ai-sdk/vue
│       ├── src/
│       └── package.json
│
# ============================================================
# MCP LAYER - Model Context Protocol implementations
# ============================================================
├── packages/mcp/                           # MCP-specific packages
│   ├── core/                               # @ai-sdk/mcp-core
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── server/                             # @ai-sdk/mcp-server
│   │   ├── src/
│   │   └── package.json
│   │
│   └── tools/                              # @ai-sdk/mcp-tools
│       ├── src/
│       └── package.json
│
# ============================================================
# VALIDATION LAYER - Schema & validation libraries
# ============================================================
├── packages/validation/                    # Validation packages
│   ├── valibot/                            # @ai-sdk/valibot
│   │   ├── src/
│   │   └── package.json
│   │
│   └── provider/                           # @ai-sdk/provider
│       ├── src/
│       └── package.json
│
# ============================================================
# SPECIAL PURPOSE PACKAGES
# ============================================================
├── packages/special/
│   ├── gateway/                            # @ai-sdk/gateway (Vercel AI Gateway)
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── khulnasoft/                         # @ai-sdk/khulnasoft (Internal)
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── aws/                                # AWS-specific implementations
│   │   ├── bedrock/                        # @ai-sdk/aws-bedrock
│   │   └── package.json
│   │
│   ├── azure/                              # Azure-specific
│   │   ├── src/
│   │   └── package.json
│   │
│   └── developer-tools/                    # Development utilities
│       ├── codemod/                        # @ai-sdk/codemod
│       ├── devtools/                       # @ai-sdk/devtools
│       └── package.json
│
# ============================================================
# TESTING & INFRASTRUCTURE
# ============================================================
├── packages/infrastructure/                # Testing & infra packages
│   ├── test-server/                        # @ai-sdk/test-server
│   │   ├── src/
│   │   └── package.json
│   │
│   └── eslint-config/                      # @ai-sdk/eslint-config
│       ├── index.js
│       └── package.json
│
# ============================================================
# EXAMPLE LAYER - Categorized reference implementations
# ============================================================
├── examples/                               # Organized by use case
│   ├── 01-foundations/                     # Basic patterns
│   │   ├── 01-simple-text-generation/
│   │   ├── 02-streaming-text-generation/
│   │   ├── 03-tool-calling/
│   │   ├── 04-structured-data/
│   │   └── 05-file-handling/
│   │
│   ├── 02-framework-integration/           # Framework-specific examples
│   │   ├── 01-react-hooks/
│   │   │   ├── use-chat/
│   │   │   ├── use-completion/
│   │   │   └── use-object/
│   │   │
│   │   ├── 02-next-js/
│   │   │   ├── server-actions/
│   │   │   ├── route-handlers/
│   │   │   ├── app-router/
│   │   │   └── rsc-integration/
│   │   │
│   │   ├── 03-vue/
│   │   ├── 04-angular/
│   │   ├── 05-svelte/
│   │   └── 06-node-js/
│   │
│   ├── 03-integrations/                    # Provider-specific examples
│   │   ├── openai/
│   │   ├── anthropic/
│   │   ├── google-vertex/
│   │   ├── cohere/
│   │   └── ... (all providers)
│   │
│   ├── 04-advanced-patterns/               # Complex real-world patterns
│   │   ├── 01-multi-turn-conversation/
│   │   ├── 02-ai-agents/
│   │   ├── 03-rag-systems/
│   │   ├── 04-streaming-ssr/
│   │   ├── 05-cost-optimization/
│   │   ├── 06-error-recovery/
│   │   └── 07-multi-modal/
│   │
│   ├── 05-production-apps/                 # Full production apps
│   │   ├── chatbot-saas/
│   │   ├── content-generator/
│   │   ├── ai-research-assistant/
│   │   └── code-generation-tool/
│   │
│   ├── 06-mcp-integrations/                # MCP examples
│   │   ├── local-tools/
│   │   ├── api-integration/
│   │   └── custom-server/
│   │
│   └── package.json                        # Shared example deps
│
# ============================================================
# DOCUMENTATION LAYER
# ============================================================
├── apps/
│   ├── docs/                               # Main documentation site
│   │   ├── content/
│   │   │   ├── 00-introduction/
│   │   │   ├── 01-getting-started/
│   │   │   ├── 02-guides/
│   │   │   ├── 03-api-reference/
│   │   │   ├── 04-examples/                # Link to examples/
│   │   │   ├── 05-integrations/            # Provider guides
│   │   │   ├── 06-troubleshooting/
│   │   │   └── 07-migration-guides/
│   │   ├── app/
│   │   └── package.json
│   │
│   └── www/                                # Website / landing page
│       ├── app/
│       └── package.json
│
├── content/                                # Shared content (deprecated)
│   └── [Can be gradually migrated to apps/docs]
│
# ============================================================
# TOOLING & GOVERNANCE
# ============================================================
├── tools/                                  # Build & development tools
│   ├── cli/                                # Monorepo CLI
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── generator/                          # Code generation
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── scripts/                            # Node.js scripts
│   │   ├── generate-examples.mjs
│   │   ├── validate-packages.mjs
│   │   ├── sync-versions.mjs
│   │   └── update-docs.mjs
│   │
│   └── templates/                          # Generator templates
│       ├── provider-package/
│       ├── framework-adapter/
│       ├── example/
│       └── docs/
│
# ============================================================
# INFRASTRUCTURE & RELEASE
# ============================================================
├── infra/                                  # Deployment & infrastructure
│   ├── docker/
│   ├── vercel/
│   ├── ci/
│   └── README.md
│
├── tests/                                  # Integration & e2e tests
│   ├── integration/
│   ├── e2e/
│   └── performance/
│
├── scripts/                                # Root-level scripts
│   ├── setup.sh                            # First-time setup
│   ├── validate-structure.sh               # Validate repository structure
│   ├── audit-dependencies.sh               # Security audit
│   └── health-check.sh                     # Repository health
│
├── .changesets/                            # Changeset entries
│
├── LICENSE
└── .gitignore
```

---

## Directory Ownership & Responsibilities

### Core Layer (`packages/core/`)

**Owner**: @vercel/ai-sdk-core  
**Public API**: ✅ Versioned (semver)  
**Stability**: STABLE

| Package     | Purpose                  | Dependencies      | Exports                                                |
| ----------- | ------------------------ | ----------------- | ------------------------------------------------------ |
| `ai`        | Main SDK entry point     | shared, telemetry | `generateText`, `streamText`, `generateObject`, `tool` |
| `shared`    | Shared types & utilities | none              | Types, error classes, utilities                        |
| `telemetry` | Analytics & telemetry    | none              | `recordTelemetry`, `getTelemetryData`                  |

**Ownership Rules**:

- Changes require @vercel/ai-sdk-core approval
- Breaking changes require RFC process
- Quarterly compatibility audits

---

### Provider Layer (`packages/providers/`)

**Owner**: @vercel/ai-sdk-providers (coordinator) + individual teams  
**Public API**: ✅ Versioned (semver)  
**Stability**: STABLE

**Provider Organization**:

- Each provider is independent & maintainable
- Follows `@ai-sdk/{provider}` naming convention
- Shared utilities in `packages/providers/_shared/`
- Provider-specific tests included in package

**Ownership Examples**:
| Provider | Owner | Maintenance | Support |
|----------|-------|-------------|---------|
| `openai/` | @vercel/ai-openai | Vercel | Production |
| `anthropic/` | @vercel/ai-anthropic | Vercel | Production |
| `groq/` | @groq-team | Groq | Community |
| `cohere/` | @cohere-team | Cohere | Community |
| `mistral/` | @mistral-team | Mistral | Community |

**Rules**:

- Providers can have custom CI/CD
- Owners have final say on breaking changes
- Monthly compatibility audits
- Version pinning managed per provider

---

### Adapter Layer (`packages/adapters/`)

**Owner**: @vercel/ai-sdk-adapters  
**Public API**: ✅ Versioned (semver)  
**Stability**: STABLE

| Adapter    | Framework   | Purpose              | Owners                 |
| ---------- | ----------- | -------------------- | ---------------------- |
| `react/`   | React 18+   | Hooks, components    | @vercel/ai-react-team  |
| `rsc/`     | Next.js 13+ | Server actions, RSC  | @vercel/ai-nextjs-team |
| `angular/` | Angular 15+ | Directives, services | @angular-community     |
| `svelte/`  | Svelte 3+   | Stores, components   | @svelte-community      |
| `vue/`     | Vue 3+      | Composables          | @vue-community         |

---

### MCP Layer (`packages/mcp/`)

**Owner**: @vercel/ai-mcp  
**Public API**: ✅ Versioned (semver)  
**Stability**: BETA

Implements Model Context Protocol specification. Focus on:

- Server implementations
- Tool standardization
- Resource management

---

### Special Purpose Packages

**Gateway** (`packages/special/gateway/`)

- Owner: @vercel/vercel-ai-gateway
- Public API: ✅ Versioned
- Stability: STABLE
- Provides unified interface to all providers

**Developer Tools** (`packages/special/developer-tools/`)

- Owner: @vercel/ai-developer-tools
- Public API: ✅ Versioned
- Tools: codemod, devtools, linters

---

### Testing Infrastructure (`packages/infrastructure/`)

**Owner**: @vercel/ai-infra  
**Public API**: Internal (not versioned)

Provides shared test utilities, mock servers, type fixtures.

---

## Example Organization & Discovery

### Structure by Complexity

```
examples/
├── 01-foundations/           [100 lines, 5 min to understand]
├── 02-framework-integration/ [500-1000 lines, framework patterns]
├── 03-integrations/          [Provider-specific setup]
├── 04-advanced-patterns/     [Production patterns]
└── 05-production-apps/       [Real applications, 5000+ lines]
```

### Naming Convention

Each example follows: `{level}-{category}/{provider-or-framework}/`

Example discovery:

```bash
# Find all React examples
ls examples/02-framework-integration/01-react-hooks/

# Find all OpenAI examples
find examples -type d -name "*openai*"

# Find advanced patterns
ls examples/04-advanced-patterns/
```

### Example Metadata

Each example includes `example.json`:

```json
{
  "name": "React useChat Hook",
  "category": "framework-integration",
  "framework": "react",
  "difficulty": "beginner",
  "providers": ["openai", "anthropic"],
  "timeToUnderstand": "5 minutes",
  "features": ["streaming", "multi-turn"],
  "files": ["app.tsx", "chat.ts"],
  "docs": "../../docs/examples/react-chat-hook.md"
}
```

---

## Public API vs Internal API Strategy

### Public APIs (Versioned, Stable)

```typescript
// ✅ Public: Core AI SDK
export { generateText, streamText, generateObject } from '@ai-sdk/core';

// ✅ Public: Provider packages
export { createOpenAI } from '@ai-sdk/openai';

// ✅ Public: Framework adapters
export { useChat, useCompletion } from '@ai-sdk/react';
```

**Guarantees**:

- Semantic versioning
- 6-month deprecation notices
- Stable for production use
- Backwards compatibility

### Internal APIs (Not versioned)

```typescript
// ⚠️ Internal: Subject to change without notice
import { CoreTypes } from '@ai-sdk/shared/internal';
```

**Usage Rules**:

- Document in JSDoc
- No stability guarantees
- Can change between patches
- Not for external packages

### Example APIs (Reference only)

```typescript
// ℹ️ Example: Copy & adapt, don't depend on
import { setupExample } from '../shared/setup';
```

---

## Testing Strategy

### Test Organization by Layer

```
Core Layer Tests:
packages/core/ai/tests/
├── unit/
│   ├── generators.test.ts
│   └── tools.test.ts
├── integration/
│   └── end-to-end.test.ts
└── fixtures/
    └── responses.ts

Provider Tests:
packages/providers/openai/tests/
├── unit/
├── integration/
└── fixtures/

Adapter Tests:
packages/adapters/react/tests/
├── unit/
├── integration/
└── e2e/

Example Tests:
examples/02-framework-integration/01-react-hooks/tests/
└── basic.test.tsx
```

### Test Commands

```bash
# Run all tests
pnpm test

# Run tests for specific domain
pnpm test --filter "@ai-sdk/core"

# Run integration tests only
pnpm test:integration

# Run with coverage
pnpm test:coverage
```

---

## CI/CD Pipeline Organization

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
- Lint & format check
  ├── biome check
  ├── prettier check
  └── TypeScript

- Test by domain
  ├── Core layer tests
  ├── Provider tests (parallel)
  ├── Adapter tests (parallel)
  └── Integration tests

- Build & publish
  ├── Build packages
  ├── Run publint
  └── Generate docs

- Security
  ├── Dependency audit
  ├── SBOM generation
  └── License check

- Release (on main)
  ├── Changesets publish
  ├── Update docs
  └── Notify providers
```

### Turbo Pipelines

```json
{
  "pipeline": {
    // Core layer
    "@ai-sdk/core#build": {
      "outputs": ["dist"],
      "cache": false
    },

    // Providers (parallel)
    "@ai-sdk/providers:*#build": {
      "outputs": ["dist"],
      "dependsOn": ["@ai-sdk/core#build"]
    },

    // Adapters (parallel)
    "@ai-sdk/adapters:*#build": {
      "outputs": ["dist"],
      "dependsOn": ["@ai-sdk/core#build"]
    },

    // Examples
    "@example/*#build": {
      "outputs": ["dist", "build"],
      "dependsOn": ["@ai-sdk/core#build", "@ai-sdk/providers:*#build"]
    }
  }
}
```

---

## CODEOWNERS & Governance

### CODEOWNERS Structure

```
# Root governance
* @vercel/ai-sdk-maintainers

# Core packages
packages/core/ @vercel/ai-sdk-core
packages/core/ai/ @vercel/ai-sdk-core-ai

# Providers
packages/providers/ @vercel/ai-sdk-providers
packages/providers/openai/ @vercel/ai-openai
packages/providers/anthropic/ @vercel/ai-anthropic
packages/providers/google-vertex/ @vercel/ai-google
packages/providers/groq/ @groq-team
packages/providers/cohere/ @cohere-team
# ... etc for all providers

# Adapters
packages/adapters/react/ @vercel/ai-react-team
packages/adapters/rsc/ @vercel/ai-nextjs-team
packages/adapters/angular/ @angular-community
packages/adapters/svelte/ @svelte-community
packages/adapters/vue/ @vue-community

# MCP
packages/mcp/ @vercel/ai-mcp

# Documentation
apps/docs/ @vercel/documentation-team

# CI/CD & Infra
.github/ @vercel/devops-team
infra/ @vercel/devops-team
tools/ @vercel/developer-tools-team

# Root configs
package.json @vercel/ai-sdk-maintainers
turbo.json @vercel/ai-sdk-maintainers
tsconfig.base.json @vercel/ai-sdk-maintainers
ARCHITECTURE.md @vercel/ai-sdk-maintainers
```

### Approval Requirements

```yaml
Core Layer:
  - Required approvals: 2
  - Teams: @vercel/ai-sdk-core
  - Dismiss on push: false
  - Require status checks: true

Providers:
  - Required approvals: 1 (owner) + 1 (core team)
  - Dismiss on push: false

Adapters:
  - Required approvals: 1 (owner) + 1 (core team)

Examples:
  - Required approvals: 1

Documentation:
  - Required approvals: 1
```

---

## Architecture Decision Records (ADRs)

### ADR Template Location: `ADR/template.md`

Key ADRs to create:

1. **ADR-001**: Monorepo strategy (TurboRepo + pnpm)
2. **ADR-002**: Package organization & naming
3. **ADR-003**: Version management strategy
4. **ADR-004**: API stability guarantees
5. **ADR-005**: Testing architecture
6. **ADR-006**: CI/CD organization
7. **ADR-007**: Documentation strategy
8. **ADR-008**: Example organization
9. **ADR-009**: Dependency governance
10. **ADR-010**: Security & compliance

---

## Contributor Workflow

### Getting Started (5 minutes)

```bash
# Clone & setup
git clone https://github.com/vercel/ai-toolkit
cd ai-toolkit
pnpm setup-dev  # New script: sets up environment

# Verify setup
pnpm health-check
```

### Adding a New Provider (30 minutes)

```bash
# Generate provider scaffold
pnpm generate provider --name=my-provider

# Output:
# packages/providers/my-provider/
# ├── src/
# ├── tests/
# ├── package.json
# └── README.md

# Follow the prompts & implement
cd packages/providers/my-provider
pnpm dev

# Test & submit PR
```

### Adding a Framework Adapter (1 hour)

```bash
pnpm generate adapter --framework=next

# Output: packages/adapters/rsc/
```

### Adding an Example (30 minutes)

```bash
pnpm generate example \
  --level=02-framework-integration \
  --category=next-js \
  --name=server-actions

# Output: examples/02-framework-integration/02-next-js/server-actions/
```

### Submitting a PR

1. **Check ownership**: CODEOWNERS identifies required reviewers
2. **Automated checks**: CI runs lint, test, type-check
3. **Review**: Required approvers review
4. **Merge**: Automatically triggers related CI/CD

---

## Scaling Guidelines (Future Preparation)

### At 100+ Packages

- Consider domain subgroups: `packages/providers/{domain}/{provider}/`
- Example: `packages/providers/text-generation/openai/`, `packages/providers/image-generation/openai/`
- Establish shared utilities under `packages/providers/_shared/`

### At 1000+ Examples

- Add example registry: `examples/registry.json`
- Implement example search & discovery CLI: `pnpm search-examples`
- Organize by business problem, not technology
- Create example template system

### At 500+ Contributors

- Establish code review SLAs
- Create bot-assisted approval workflow
- Implement automatic permission management
- Create contributor tiers (triager, committer, maintainer)

---

## Naming Conventions

### Package Names

```
Public packages:
@ai-sdk/core
@ai-sdk/{provider-name}
@ai-sdk/{framework-name}
@ai-sdk/{category}/{subcategory}

Internal packages:
@ai-sdk/{domain}-internal
@ai-sdk-private/{internal-tool}

Examples:
@example/{level}/{category}/{name}
```

### Type Names

```
// Core types
AITextGenerationResult
AIToolResult
AIModelAdapter

// Provider-specific
OpenAILanguageModel
AnthropicLanguageModel

// Framework-specific
UseChatResult
UseCompletionResult
```

### Function Names

```
// Generators
generateText()
streamText()
generateObject()

// Hooks
useChat()
useCompletion()
useObject()

// Utilities
createOpenAI()
createAnthropic()
```

---

## Version Management Strategy

### Semantic Versioning

**Public packages**: `@ai-sdk/*`

- `MAJOR`: Breaking API changes
- `MINOR`: New features (backwards compatible)
- `PATCH`: Bug fixes

**Example packages**: No version (git-based, no releases)

**Internal packages**: No semver (subject to change)

### Release Cadence

- **Core**: Monthly aligned releases
- **Providers**: Quarterly coordinated releases + on-demand hotfixes
- **Adapters**: As needed
- **Examples**: Continuous (no version)

### Changesets Workflow

Each PR includes changeset:

```bash
pnpm changeset

# Follow prompts:
# 1. Select affected packages
# 2. Choose change type (major/minor/patch)
# 3. Write human-readable summary
```

---

## Migration Plan (Phased Approach)

### Phase 1: Planning & Documentation (Week 1)

- [x] Create this architecture document
- [ ] Create ADRs for each major decision
- [ ] Update CONTRIBUTING.md
- [ ] Create migration checklist

### Phase 2: Infrastructure Setup (Weeks 2-4)

- [ ] Reorganize directories
- [ ] Update turbo.json
- [ ] Create CODEOWNERS
- [ ] Update tsconfig references
- [ ] Create generation templates

### Phase 3: Package Migration (Weeks 5-12)

- [ ] Migrate core packages
- [ ] Migrate provider packages
- [ ] Migrate adapter packages
- [ ] Migrate special packages
- [ ] Update imports across repo

### Phase 4: Example Reorganization (Weeks 13-16)

- [ ] Categorize examples
- [ ] Add example.json metadata
- [ ] Create example registry
- [ ] Update documentation links

### Phase 5: Documentation & Tooling (Weeks 17-20)

- [ ] Update all docs
- [ ] Create generation CLI
- [ ] Add contributor guides
- [ ] Create architecture diagrams

### Phase 6: Release & Communication (Week 21+)

- [ ] Release v4.0 with new structure
- [ ] Announce to community
- [ ] Migrate external packages
- [ ] Sunset old structure

---

## Success Metrics

### Developer Experience

- [ ] Onboarding time < 30 minutes
- [ ] First contribution time < 2 hours
- [ ] Package discovery time < 5 minutes
- [ ] 90% contributor satisfaction

### Operational Excellence

- [ ] CI/CD time < 15 minutes
- [ ] Release time < 1 hour
- [ ] 99.9% uptime
- [ ] Zero unowned packages

### Scalability

- [ ] Support 500+ contributors
- [ ] 100+ packages maintainable
- [ ] 1000+ examples discoverable
- [ ] Zero critical bugs in core

---

## Next Steps

1. **Review & Approve**: Get stakeholder sign-off
2. **Create ADRs**: Document all major decisions
3. **Plan Migration**: Create detailed timeline
4. **Update CONTRIBUTING.md**: Document new workflow
5. **Start Phase 1**: Begin implementation
6. **Communicate**: Update team & community

---

## Appendix A: Current Structure Mapping

### packages/ → New Location

| Current                    | New Location                                | Category       |
| -------------------------- | ------------------------------------------- | -------------- |
| `ai`                       | `packages/core/ai`                          | Core           |
| `react`                    | `packages/adapters/react`                   | Adapter        |
| `rsc`                      | `packages/adapters/rsc`                     | Adapter        |
| `openai`                   | `packages/providers/openai`                 | Provider       |
| `anthropic`                | `packages/providers/anthropic`              | Provider       |
| ... (all providers)        | `packages/providers/{provider}`             | Provider       |
| `angular`, `svelte`, `vue` | `packages/adapters/{framework}`             | Adapter        |
| `mcp`                      | `packages/mcp/core`                         | MCP            |
| `gateway`                  | `packages/special/gateway`                  | Special        |
| `valibot`                  | `packages/validation/valibot`               | Validation     |
| `codemod`                  | `packages/special/developer-tools/codemod`  | Tool           |
| `devtools`                 | `packages/special/developer-tools/devtools` | Tool           |
| `test-server`              | `packages/infrastructure/test-server`       | Infrastructure |

---

## Appendix B: CODEOWNERS Template

```
# Root governance
* @vercel/ai-sdk-maintainers

# ===== CORE LAYER =====
packages/core/ @vercel/ai-sdk-core
packages/core/ai/ @vercel/ai-sdk-core-ai @vercel/ai-sdk-core
packages/core/shared/ @vercel/ai-sdk-core @vercel/ai-sdk-infrastructure
packages/core/telemetry/ @vercel/ai-sdk-core @vercel/devops-team

# ===== PROVIDER LAYER =====
packages/providers/ @vercel/ai-sdk-providers

# Vercel-maintained providers
packages/providers/openai/ @vercel/ai-openai
packages/providers/anthropic/ @vercel/ai-anthropic
packages/providers/google-vertex/ @vercel/ai-google
packages/providers/gateway/ @vercel/ai-gateway
packages/providers/amazon-bedrock/ @vercel/ai-aws
packages/providers/azure/ @vercel/ai-azure
packages/providers/khulnasoft/ @vercel/ai-khulnasoft

# Community providers (template-based)
packages/providers/groq/ @groq-team @vercel/ai-sdk-providers
packages/providers/cohere/ @cohere-team @vercel/ai-sdk-providers
packages/providers/mistral/ @mistral-team @vercel/ai-sdk-providers
packages/providers/openai-compatible/ @vercel/ai-sdk-providers

# ===== ADAPTER LAYER =====
packages/adapters/ @vercel/ai-sdk-adapters
packages/adapters/react/ @vercel/ai-react-team
packages/adapters/rsc/ @vercel/ai-nextjs-team
packages/adapters/angular/ @angular-community @vercel/ai-sdk-adapters
packages/adapters/svelte/ @svelte-community @vercel/ai-sdk-adapters
packages/adapters/vue/ @vue-community @vercel/ai-sdk-adapters

# ===== MCP LAYER =====
packages/mcp/ @vercel/ai-mcp

# ===== SPECIAL & INFRASTRUCTURE =====
packages/special/ @vercel/ai-sdk-core
packages/validation/ @vercel/ai-sdk-core
packages/infrastructure/ @vercel/ai-sdk-infrastructure

# ===== EXAMPLES =====
examples/ @vercel/ai-sdk-developers
examples/01-foundations/ @vercel/ai-sdk-core @vercel/ai-sdk-developers
examples/02-framework-integration/ @vercel/ai-sdk-adapters @vercel/ai-sdk-developers
examples/03-integrations/ @vercel/ai-sdk-providers @vercel/ai-sdk-developers
examples/04-advanced-patterns/ @vercel/ai-sdk-core @vercel/ai-sdk-developers
examples/05-production-apps/ @vercel/ai-sdk-core @vercel/ai-sdk-developers

# ===== DOCUMENTATION =====
apps/docs/ @vercel/documentation-team
apps/www/ @vercel/marketing-team

# ===== CONFIGURATION & CI/CD =====
.github/ @vercel/devops-team
.github/workflows/ @vercel/devops-team
infra/ @vercel/devops-team
tools/ @vercel/developer-tools-team

# ===== ROOT CONFIGURATION =====
package.json @vercel/ai-sdk-maintainers
pnpm-workspace.yaml @vercel/ai-sdk-maintainers
turbo.json @vercel/ai-sdk-maintainers
tsconfig.json @vercel/ai-sdk-maintainers
biome.json @vercel/ai-sdk-maintainers
CODEOWNERS @vercel/ai-sdk-maintainers
ARCHITECTURE.md @vercel/ai-sdk-maintainers
CONTRIBUTING.md @vercel/ai-sdk-maintainers
ADR/ @vercel/ai-sdk-maintainers
```

---

## Appendix C: TypeScript Configuration Hierarchy

```
tsconfig.json                    # Root: references others
├── tsconfig.base.json           # Shared base config
├── packages/core/tsconfig.json  # Core overrides
├── packages/providers/tsconfig.json
├── packages/adapters/tsconfig.json
├── examples/tsconfig.json
└── apps/*/tsconfig.json
```

---

## Appendix D: Example generator.mjs script

```javascript
// tools/scripts/generate-example.mjs
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateExample() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'level',
      message: 'Example level:',
      choices: [
        '01-foundations',
        '02-framework-integration',
        '03-integrations',
        '04-advanced-patterns',
        '05-production-apps',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'Example name (kebab-case):',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Example description:',
    },
  ]);

  const exampleDir = path.join(
    __dirname,
    '../../examples',
    answers.level,
    answers.name,
  );

  // Create directory
  await fs.mkdir(exampleDir, { recursive: true });

  // Create example.json
  await fs.writeFile(
    path.join(exampleDir, 'example.json'),
    JSON.stringify(
      {
        name: answers.name,
        description: answers.description,
        level: answers.level,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  console.log(`✅ Created example at ${exampleDir}`);
}

generateExample().catch(console.error);
```

---

**Document Version**: 1.0  
**Last Updated**: June 2026  
**Status**: Ready for Implementation Planning
