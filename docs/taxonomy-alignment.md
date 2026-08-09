# Taxonomy Alignment

## Source Of Truth

The [Agentic AI Artifact Taxonomy](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy) repository is the source of truth for the conceptual model.

This repository is the educational builder layer. It should help users learn the taxonomy by generating concrete starter artifacts, but it must not redefine the taxonomy.

## Stable 14-Bucket Model

The builder aligns to these stable top-level buckets:

1. Identity
2. Operating style
3. Capability modules
4. Tools
5. Knowledge and resources
6. Prompts and interfaces
7. Memory
8. State
9. Planning and orchestration
10. Guardrails and governance
11. Outputs and schemas
12. Evaluation and observability
13. Runtime and deployment
14. Learning and iteration

Do not add a 15th top-level bucket. New builder flows must map back to one of these buckets.

## Builder Flows And Buckets

The UI may expose focused flows for specific artifact surfaces, such as:

- System prompts and task prompts.
- Interface schemas.
- Plan records.
- Handoff contracts.
- Runtime configs.
- Evaluation rubrics.

These are builder flows, not new top-level taxonomy buckets. Each flow should carry an explicit canonical bucket id in the artifact catalog.

## Prompts, Interfaces, Plans, And Handoffs

Prompts and interfaces may need different UI fields because prompts describe model instructions while interfaces describe user, tool, or system interaction contracts. Both still map to Prompts and interfaces.

Plans and handoffs may also need different UI fields because plans describe intended work while handoffs describe transfer of context, ownership, or next actions. Both still map to Planning and orchestration.

## Protocols And Frameworks

Protocol-specific objects such as MCP resources, MCP prompts, MCP tools, or A2A Agent Cards should be modeled as mappings, adapters, or implementation examples.

They must not replace the taxonomy buckets. A protocol object should be described with the pattern:

Generic artifact class -> possible filenames -> framework or protocol mapping -> implementation example.

## Memory And State

Memory and state must stay separate.

Memory artifacts define what should be remembered, how memory is scoped, retention rules, user controls, privacy boundaries, and retrieval expectations.

State artifacts define the current or resumable condition of a process, task, session, workflow, or runtime. State may reference memory, but it is not the same thing as memory.

## Design-Time, Runtime, And Iteration Boundaries

The builder documents lifecycle stages in [artifact-lifecycle.md](artifact-lifecycle.md). Lifecycle stages help learners understand when an artifact is usually created or used; they do not add taxonomy buckets.

Design-time artifacts describe intended structure, policy, prompts, interfaces, schemas, memory rules, and reusable templates before or during implementation.

Runtime artifacts describe safe execution posture, configuration, resumable state, plans, or handoffs. Public examples may use templates and placeholders, but they must not include unsanitized live runtime data.

Iteration artifacts describe evaluation, observability review, what changed, why it changed, what was learned, and what should be improved next.

Do not collapse these into one artifact. A generated example may link them together, but the catalog and UI should keep their roles distinct.

## Public-Safe Alignment

All taxonomy-aligned examples in this repo must be synthetic and generic. Do not add employer-specific workflows, proprietary content, regulated data, private endpoints, secrets, unsanitized logs, production traces, live memory stores, or production state.

## Upstream Surface Coverage (v0.3.0)

`sourceTaxonomy` in `src/data/artifactCatalog.js` pins this repo's mapping to the upstream taxonomy's `v0.3.0` tag (commit `4b66f0996734ca57fc214ec3541081c9a9a5b94f`). This section states which of that tag's `templates/` and `schemas/` surfaces this builder covers, so a learner can tell "deliberately out of scope" from "missing."

### Templates

| Upstream file | Builder artifact | Coverage |
| --- | --- | --- |
| `AGENT.md`, `agent.yaml` | `agent-manifest` | Covered |
| `persona.md` | `role-profile` | Covered |
| `principles.md` | `operating-principles` | Covered |
| `SKILL.md` | `skill-module` | Covered |
| `tools.yaml` | `tool-spec` | Covered |
| `resources.yaml` | `resource-manifest` | Covered |
| `PROMPT.md` | `system-task-prompt` | Covered |
| `INTERFACE.md` | `interface-schema` | Covered |
| `MEMORY.md`, `memory-policy.yaml` | `memory-policy` | Covered |
| `state-strategy.md` | `state-strategy` | Covered - see the Markdown-vs-schema note below |
| `PLAN.md` | `plan-record` | Covered |
| `HANDOFFS.md` | `handoff-contract` | Covered - see the Markdown-vs-schema note below |
| `GUARDRAILS.md` | `guardrails-governance-policy` | Covered |
| `output.schema.json` | `output-schema` | Covered |
| `eval-rubric.md` | `eval-rubric` | Covered |
| `RUNTIME.md` | `runtime-config` | Covered |
| `ITERATION.md` | `iteration-changelog-note` | Covered |
| `templates/README.md` | - | Not applicable - documents the templates folder itself, not an artifact |
| `templates/ui-harness/**` (`README.md`, `artifact.schema.json`, `harness-contract.md`, `session.schema.json`, `workflow.schema.json`) | - | Not covered |

### Schemas

| Upstream file | Builder artifact | Coverage |
| --- | --- | --- |
| `handoff.schema.json` | `handoff-contract` | Covered - see the Markdown-vs-schema note below |
| `state.schema.json` | `state-strategy` | Covered - see the Markdown-vs-schema note below |
| `approval.schema.json` | - | Not covered |

Notes:

- `handoff-contract` and `state-strategy` generate a Markdown starter document describing the handoff or state shape in prose, not a machine-validatable JSON Schema matching upstream's `schemas/handoff.schema.json` or `schemas/state.schema.json`. Their `exampleFilenames` list the `.schema.json` name as one suggested place to save the artifact, per this repo's "filenames are suggestions" convention (see `AGENTS.md`), but the renderer output itself is Markdown, not JSON Schema.
- `approval.schema.json` has no corresponding builder artifact. `guardrails-governance-policy` has a free-text `approvalRules` field, but nothing here generates an approval JSON Schema.
- `templates/ui-harness/` (an interactive UI test-harness contract) has no corresponding builder artifact or taxonomy bucket mapping today.

This is a coverage statement, not a backlog: deciding whether to build any of the not-covered surfaces is a separate, tracked follow-up, not settled by this table.

## Updating The Pinned Reference

`sourceTaxonomy` (`src/data/artifactCatalog.js`) pins `tag` and `commit` together, not a prose version string. Update both fields together, from a release tag, never from `main`:

1. Resolve the upstream repository's latest release tag to its commit SHA (for example via the GitHub API's tags endpoint).
2. Update `sourceTaxonomy.tag` and `sourceTaxonomy.commit` together in the same change.
3. Re-check the coverage tables above against the new tag's `templates/` and `schemas/` contents, and update them if the surface set changed.
4. `tests/catalogIntegrity.test.mjs` checks the pinned reference's *shape* (a semver-style tag and a 40-character hex commit) but makes no network call; it cannot catch a tag that no longer resolves to that commit upstream, or a coverage table that has gone stale. That verification is manual, at update time.

Do not pin to `main`: `main` moves between releases and can carry unreleased work with no coverage review yet. A tag is the stable reference point this catalog's coverage claims are checked against.
