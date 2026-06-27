# Migration Plan: Enterprise Architecture Restructuring

**Project Timeline**: 20 weeks (5 months)  
**Target Release**: v4.0  
**Team Size**: 3-5 engineers  
**Risk Level**: Medium (backwards compatibility concerns)

---

## Phase Overview

```
Week 1-2:    Planning & Documentation ✅ IN PROGRESS
Week 3-6:    Infrastructure Setup
Week 7-18:   Package Migration
Week 19-20:  Release & Communication
```

---

## Phase 1: Planning & Documentation (Weeks 1-2)

### Goals

- Finalize all architecture decisions
- Get stakeholder buy-in
- Create detailed implementation checklist
- Communicate plan to team

### Deliverables

- [x] ARCHITECTURE_REDESIGN.md (main document)
- [x] ADR template and initial ADRs
- [x] CONTRIBUTOR_ONBOARDING.md
- [ ] Detailed task breakdown
- [ ] Risk assessment & mitigation
- [ ] Team communication plan

### Tasks

- [ ] **ADR Review** (1 day)

  - ADR-001: Monorepo organization & domain-driven design
  - ADR-002: Package naming & public API boundaries
  - ADR-003: Version management & release strategy
  - ADR-004: Testing architecture & coverage requirements
  - ADR-005: CI/CD pipeline organization
  - ADR-006: CODEOWNERS governance model

- [ ] **Stakeholder Approval** (2 days)

  - Get buy-in from:
    - @vercel/ai-sdk-maintainers
    - @vercel/ai-sdk-core
    - @vercel/ai-sdk-providers
    - @vercel/ai-sdk-adapters
    - Community representatives
  - Address concerns
  - Lock in timeline

- [ ] **Create Detailed Checklist** (1 day)

  - Break down each directory move
  - Create task cards (Jira/GitHub Projects)
  - Assign owners
  - Estimate effort

- [ ] **Team Communication** (1 day)
  - Write announcement post
  - Create FAQ document
  - Schedule kickoff meeting
  - Update README with migration notice

### Metrics

- [ ] All ADRs approved
- [ ] 100% of stakeholders signed off
- [ ] Team understands plan
- [ ] Public announcement made

---

## Phase 2: Infrastructure Setup (Weeks 3-6)

### Goals

- Update Turbo & TypeScript configs
- Create CODEOWNERS
- Set up generation tools
- Verify new structure works

### Deliverables

- [ ] Updated turbo.json with new pipeline
- [ ] Updated tsconfig.base.json with path mappings
- [ ] CODEOWNERS file with all teams
- [ ] Generation CLI tool working
- [ ] New example scaffolding
- [ ] Updated pnpm-workspace.yaml

### Tasks

#### Week 3: Core Configuration

- [ ] **Update turbo.json** (1 day)

  ```json
  {
    "pipeline": {
      "build": {
        "outputs": ["dist/**", "build/**"]
      },
      "@ai-sdk/core#build": {
        "outputs": ["dist/**"],
        "cache": false
      },
      "@ai-sdk/providers:*#build": {
        "outputs": ["dist/**"],
        "dependsOn": ["@ai-sdk/core#build"]
      }
      // ... etc
    }
  }
  ```

- [ ] **Update TypeScript Paths** (1 day)

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@ai-sdk/core": ["packages/core/ai/src"],
        "@ai-sdk/core/*": ["packages/core/ai/src/*"],
        "@ai-sdk/providers/*": ["packages/providers/*/src"],
        "@ai-sdk/adapters/*": ["packages/adapters/*/src"],
        "@ai-sdk/*": ["packages/*/src"]
      }
    }
  }
  ```

- [ ] **Update pnpm-workspace.yaml** (1 day)
  ```yaml
  packages:
    - 'packages/core/*'
    - 'packages/providers/*'
    - 'packages/adapters/*'
    - 'packages/mcp/*'
    - 'packages/validation/*'
    - 'packages/special/*'
    - 'packages/infrastructure/*'
    - 'examples/*'
    - 'tools/*'
    - 'apps/*'
  ```

#### Week 4: Ownership & Governance

- [ ] **Create CODEOWNERS** (1 day)

  - Map all directories
  - Add team handles
  - Set approval requirements
  - Test automated assignment

- [ ] **Create Contributing Guide** (1 day)

  - Update CONTRIBUTING.md
  - Add workflow diagrams
  - Create PR template
  - Document troubleshooting

- [ ] **Set up GitHub Branch Rules** (0.5 day)
  - Require CODEOWNERS approval
  - Require status checks
  - Require changeset
  - Auto-squash merge

#### Week 5: Tools & Automation

- [ ] **Create Package Generator** (2 days)

  - `pnpm generate provider`
  - `pnpm generate adapter`
  - `pnpm generate example`
  - Test generators

- [ ] **Create Example Registry** (1 day)

  - Build `examples/registry.json`
  - Create discovery CLI
  - `pnpm search-examples`

- [ ] **Health Check Script** (1 day)
  - Verify directory structure
  - Check type references
  - Validate dependencies
  - Report issues

#### Week 6: Testing & Validation

- [ ] **Verify Build System** (1 day)

  - Run full build
  - Check output
  - Fix issues
  - Document problems

- [ ] **Test CI/CD** (1 day)

  - Run GitHub Actions workflow
  - Check test execution
  - Verify artifacts
  - Check deployment

- [ ] **Create Migration Test Suite** (1 day)
  - Verify no imports broke
  - Check type exports
  - Validate public APIs
  - Integration tests

### Metrics

- [ ] All configuration files updated
- [ ] CODEOWNERS covers 100% of repo
- [ ] Generators work end-to-end
- [ ] Full build succeeds
- [ ] All tests pass

---

## Phase 3: Package Migration (Weeks 7-18)

This is the bulk of the work. It's done in waves to minimize disruption.

### Wave 1: Core Layer (Weeks 7-8)

**Target**: Migrate `packages/core/*` → `packages/core/{subdomain}/`

```
Before:
packages/
├── ai/
├── react/
├── rsc/
└── ... (50 packages mixed)

After:
packages/
├── core/
│   ├── ai/
│   ├── shared/
│   └── telemetry/
```

**Tasks:**

- [ ] **Organize core packages** (3 days)

  - [ ] Create `packages/core/` directory
  - [ ] Move `packages/ai/` → `packages/core/ai/`
  - [ ] Create `packages/core/shared/` from utilities
  - [ ] Create `packages/core/telemetry/` from telemetry code
  - [ ] Update all imports
  - [ ] Run tests

- [ ] **Update references** (2 days)

  - [ ] Update package.json files
  - [ ] Update import paths across repo
  - [ ] Update docs links
  - [ ] Update examples

- [ ] **Validate** (1 day)
  - [ ] Run `pnpm types:check`
  - [ ] Run all tests
  - [ ] Manual spot-checks

**Risk**: Core is most critical. Highest testing effort.

### Wave 2: Provider Layer (Weeks 9-14)

**Target**: Migrate all provider packages to `packages/providers/`

```
Before:
packages/
├── openai/
├── anthropic/
├── google/
├── ... (30 providers scattered)

After:
packages/
├── providers/
│   ├── openai/
│   ├── anthropic/
│   ├── google-vertex/
│   ├── groq/
│   ├── cohere/
│   └── ... (30+ providers organized)
```

**Tasks:**

- [ ] **Create providers directory structure** (1 day)

  - [ ] Create `packages/providers/` directory
  - [ ] Create `packages/providers/_shared/` for utilities

- [ ] **Move providers** (4 days)

  - [ ] Group by provider type if needed
  - [ ] Move each provider package
  - [ ] Update imports within provider
  - [ ] Update package dependencies

  **Implementation per provider:**

  ```bash
  # For each provider:
  mv packages/{provider}/ packages/providers/{provider}/
  # Fix imports
  grep -r "@ai-sdk/{provider}" packages/ | xargs sed -i ''
  # Run tests
  pnpm test --filter=@ai-sdk/{provider}
  ```

- [ ] **Create \_shared utilities** (2 days)

  - [ ] Extract common provider code
  - [ ] Create `packages/providers/_shared/`
  - [ ] Update all providers to use shared code
  - [ ] Add tests for shared utilities

- [ ] **Update documentation** (1 day)
  - [ ] Update provider guides
  - [ ] Update getting started docs
  - [ ] Update API reference

**Parallel Execution**: Providers can be moved in parallel since they're independent.

### Wave 3: Adapter Layer (Weeks 15-16)

**Target**: Migrate framework adapters to `packages/adapters/`

```
Before:
packages/
├── react/
├── svelte/
├── vue/
├── angular/
└── rsc/

After:
packages/
├── adapters/
│   ├── react/
│   ├── rsc/
│   ├── svelte/
│   ├── vue/
│   └── angular/
```

**Tasks:**

- [ ] **Organize adapters** (2 days)

  - [ ] Create `packages/adapters/` directory
  - [ ] Move each adapter package
  - [ ] Update imports

- [ ] **Update dependencies** (1 day)

  - [ ] Update package.json references
  - [ ] Update import statements
  - [ ] Verify peer dependencies

- [ ] **Test integrations** (2 days)
  - [ ] Test with core packages
  - [ ] Test with examples
  - [ ] Run full test suite

**Parallel Execution**: Each adapter can be moved independently.

### Wave 4: Special & Infrastructure (Week 17)

**Target**: Organize remaining packages

```
Before:
packages/
├── gateway/
├── mcp/
├── codemod/
├── valibot/
├── test-server/
└── ... (mixed purposes)

After:
packages/
├── special/
│   ├── gateway/
│   ├── khulnasoft/
│   └── aws/
├── mcp/
│   ├── core/
│   ├── server/
│   └── tools/
├── validation/
│   ├── valibot/
│   └── provider/
└── infrastructure/
    ├── test-server/
    └── eslint-config/
```

**Tasks:**

- [ ] **Organize special packages** (2 days)

  - [ ] Create directories
  - [ ] Move packages
  - [ ] Update imports

- [ ] **Organize MCP** (1 day)

  - [ ] Create `packages/mcp/` structure
  - [ ] Move MCP packages
  - [ ] Update references

- [ ] **Organize validation & infra** (1 day)

  - [ ] Create `packages/validation/`
  - [ ] Create `packages/infrastructure/`
  - [ ] Move packages

- [ ] **Final validation** (1 day)
  - [ ] Full type check
  - [ ] Full test run
  - [ ] Manual verification

### Wave 5: Examples Reorganization (Week 18)

**Target**: Categorize and organize 20+ examples

```
Before:
examples/
├── react-chat/
├── next-app/
├── angular-example/
├── openai-streaming/
├── anthropic-tool-calling/
└── ... (flat, hard to discover)

After:
examples/
├── 01-foundations/
│   ├── simple-text-generation/
│   └── streaming-text-generation/
├── 02-framework-integration/
│   ├── 01-react-hooks/
│   ├── 02-next-js/
│   └── ...
├── 03-integrations/
│   ├── openai/
│   ├── anthropic/
│   └── ...
└── ...
```

**Tasks:**

- [ ] **Create example categories** (1 day)

  - [ ] Create 6 main categories
  - [ ] Create subcategories
  - [ ] Create directory structure

- [ ] **Migrate examples** (2 days)

  - [ ] Move each example to new location
  - [ ] Update imports
  - [ ] Create example.json for each
  - [ ] Update documentation links

- [ ] **Create example registry** (1 day)
  - [ ] Build registry.json
  - [ ] Test discovery CLI
  - [ ] Document for contributors

---

## Phase 4: Release & Communication (Weeks 19-20)

### Goals

- Create clean release
- Communicate changes to users
- Migrate external packages
- Establish new workflow

### Deliverables

- [ ] v4.0 release with new structure
- [ ] Migration guide for users
- [ ] Updated onboarding docs
- [ ] Blog post announcing changes
- [ ] Live migration workshop

### Tasks

#### Week 19: Pre-Release

- [ ] **Create Migration Guide** (2 days)

  - Write: "Migrating from v3 to v4"
  - Document breaking changes
  - Provide upgrade path
  - Create codemods for common changes

- [ ] **Test Full Release** (1 day)

  - [ ] Verify all packages build
  - [ ] Run complete test suite
  - [ ] Check published types
  - [ ] Test from npm

- [ ] **Update Documentation** (2 days)
  - [ ] Update all docs for new structure
  - [ ] Fix all import examples
  - [ ] Update getting started
  - [ ] Update API reference

#### Week 20: Release

- [ ] **Release v4.0** (1 day)

  - [ ] Bump versions
  - [ ] Create changelog
  - [ ] Run CI/CD
  - [ ] Publish to npm
  - [ ] GitHub release

- [ ] **Community Communication** (2 days)

  - [ ] Publish blog post
  - [ ] Post announcement on socials
  - [ ] Send email to users
  - [ ] Post on Discord

- [ ] **Host Migration Workshop** (1 day)

  - [ ] Live walkthrough
  - [ ] Q&A session
  - [ ] Record for archive

- [ ] **Monitor & Support** (ongoing)
  - [ ] Watch for issues
  - [ ] Help with migrations
  - [ ] Fix bugs quickly

---

## Risk Assessment & Mitigation

### High Risk: Breaking Changes

**Risk**: Users have code that breaks with new structure

**Mitigation**:

- Extensive testing before release
- Create codemods for automatic migration
- Provide clear upgrade guide
- Support period with hotfixes
- Early beta period for feedback

### Medium Risk: Migration Errors

**Risk**: We miss import updates, causing runtime errors

**Mitigation**:

- Create automated validator
- Run comprehensive test suite
- Manual spot-checks by team
- Code review of every move

### Medium Risk: Performance Regression

**Risk**: Build times increase with new structure

**Mitigation**:

- Monitor build times during migration
- Optimize Turbo pipeline as needed
- Cache build artifacts
- Benchmark before/after

### Low Risk: Developer Confusion

**Risk**: Developers get confused with new structure

**Mitigation**:

- Extensive documentation
- Clear CODEOWNERS
- Generation tools to scaffold new packages
- Contributor onboarding guide

---

## Success Criteria

### End-to-End

- [ ] All 50+ packages migrated
- [ ] All examples reorganized
- [ ] All documentation updated
- [ ] All tests passing
- [ ] Build time acceptable (< 15 min)
- [ ] v4.0 released on npm
- [ ] No critical bugs reported

### Developer Experience

- [ ] Onboarding time < 30 minutes
- [ ] First contribution time < 2 hours
- [ ] Code discovery time < 5 minutes
- [ ] 90%+ developer satisfaction

### Operational

- [ ] CODEOWNERS covers 100% of repo
- [ ] Zero unowned packages
- [ ] CI/CD time < 15 minutes
- [ ] No breaking changes in core APIs (only reorganization)

---

## Team Structure

### Suggested Team Composition

```
Project Lead (1)
├── Architecture Owner
├── Coordinates across teams
└── Release manager

Core Wave Lead (1)
├── Owns packages/core/ reorganization
├── Coordinates with @vercel/ai-sdk-core
└── Handles most critical code

Provider Wave Lead (1)
├── Owns packages/providers/ reorganization
├── Coordinates provider migrations
└── Manages parallel execution

Example/Docs Lead (1)
├── Reorganizes examples
├── Updates all documentation
└── Creates discovery tools

Infrastructure Lead (0.5)
├── Updates configs
├── Maintains CI/CD
└── Verifies structure compliance
```

### Communication Channels

- **Weekly sync**: Progress review
- **Slack channel**: `#ai-toolkit-migration`
- **GitHub Projects**: Detailed task tracking
- **Office hours**: Support & troubleshooting

---

## Rollback Plan

If critical issues arise, we have a rollback path:

### Partial Rollback (< 20% impact)

- Revert affected package migrations
- Keep successful migrations
- Release patch with limited structure change

### Full Rollback (critical)

- Revert all changes
- Stay on v3.x
- Plan for v5.0 different approach

### Decision Criteria

- More than 5 critical bugs
- Performance regression > 50%
- Loss of test coverage
- Major API incompatibility

---

## Detailed Task Breakdown

### For Jira/GitHub Projects

Each package migration follows this template:

```
[MIGRATION] Move {package} to {new location}

Description:
- Move packages/{old}/ → packages/{new}/
- Update all imports
- Update docs
- Verify tests pass

Definition of Done:
- [ ] Package moved
- [ ] All imports updated (grep verified)
- [ ] Tests passing
- [ ] Types checking
- [ ] No console errors in examples
- [ ] Code reviewed
- [ ] Merged to main
```

---

## Documentation Updates Schedule

- **Week 7**: Start updating docs as migrations happen
- **Week 15**: All docs updated for new structure
- **Week 19**: Final review & polish

---

## Version Management During Migration

### Versioning Strategy

- **v3.x**: Maintain current structure (bug fixes only)
- **v4.0-alpha.1**: First reorganized release
- **v4.0-rc.1**: Release candidate (full testing)
- **v4.0**: Final release
- **v3.x → v4.0**: Long migration period with clear guide

---

## Post-Migration Work

After release, continue with:

- Monitor for issues in production
- Gather feedback from community
- Plan next improvements
- Establish new governance practices
- Scale testing & CI/CD

---

**Status**: Planning Phase (Weeks 1-2)  
**Next Review**: End of Week 2  
**Approval Required**: All stakeholders sign off
