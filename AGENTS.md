# AGENTS.md

Instructions for Codex and other coding agents working in this repository.

## Repo Purpose

Agentic Artifact Builder is the interactive educational builder layer for the public [Agentic AI Artifact Taxonomy](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy).

The builder helps users select an artifact type, fill guided fields, and generate clean starter files for learning how agentic AI systems are designed, operated, evaluated, and iterated.

## Source Of Truth

Treat the taxonomy repo as the conceptual source of truth. This repo should not redefine the taxonomy or introduce competing top-level categories.

Preserve the stable 14 top-level buckets:

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

Do not add or imply a 15-bucket taxonomy.

## Public-Safety Rules

- Use synthetic, generic examples only.
- Do not include employer-specific content, secrets, private data, proprietary workflows, regulated data, unsanitized logs, real runtime traces, production state, live memory stores, or private endpoints.
- Keep generated examples safe for a public repository.
- Do not embed credentials, API keys, tokens, account ids, customer data, or private URLs.

## Taxonomy Boundaries

- Model prompts and interfaces as sub-surfaces inside Prompts and interfaces.
- Model plans and handoffs as sub-surfaces inside Planning and orchestration.
- Do not treat protocol artifacts such as MCP resources, MCP prompts, MCP tools, or A2A Agent Cards as taxonomy replacements.
- Use the pattern: generic artifact class -> possible filenames -> framework or protocol mappings -> implementation example.
- Treat filenames as suggestions unless a protocol or framework requires a specific name.

## Memory Vs State

Keep memory and state separate.

Memory artifacts define what may be remembered, retention expectations, privacy boundaries, retrieval behavior, and user controls.

State artifacts define current or resumable process, workflow, session, task, or runtime condition.

Do not merge memory policy fields into state strategy fields or describe state as long-term memory.

## Design-Time, Runtime, And Iteration

Keep these artifact roles distinct:

- Design-time artifacts define intended behavior, policies, interfaces, schemas, and evaluation criteria.
- Runtime artifacts define configuration, deployment assumptions, environment settings, and operational behavior.
- Iteration artifacts record changes, lessons, review notes, and next improvements.

Generated examples may link across these roles, but should not collapse them.

## Framework-Neutral Language

Prefer framework-neutral descriptions. Add framework or protocol mappings only as examples or adapters.

Do not make React, Vue, Svelte, Next.js, Vite, or any other framework part of the default architecture unless an issue explicitly calls for it. Prefer plain HTML, CSS, and JavaScript for the first implementation phase.

Do not add dependencies unless they are necessary for the issue being implemented.

## Adding Artifact Types

When adding or changing artifact types:

- Update `src/data/artifactCatalog.js`.
- Map every artifact to one canonical bucket.
- Include possible filenames as examples.
- Include lifecycle stage, learning goals, fields, public-safety notes, and related artifacts.
- Keep public-safety guidance attached to each artifact entry.
- Update docs when a catalog change affects product scope, taxonomy alignment, or generated output.
- Add or update validation/tests once validation or renderers exist.

## Generated Examples

Generated examples should be:

- Synthetic and generic.
- Clear enough for beginners.
- Precise enough for builders to adapt.
- Free of private, proprietary, regulated, or operational data.
- Explicit about related artifacts when a file depends on another file.

## Validation Expectations

For documentation and catalog changes, run:

```bash
git status
git diff --check
```

When implementation tooling exists, also run the relevant validation or test commands documented in the repo. Do not add new tooling just to satisfy a documentation-only change.

## Suggested Commit Style

Use concise conventional-style commits when practical:

- `docs: align builder scope with taxonomy`
- `docs: add product roadmap`
- `data: add artifact catalog entries`
- `ui: add static catalog browser`
- `test: validate artifact catalog shape`
