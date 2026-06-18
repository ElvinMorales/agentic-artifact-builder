# Agentic Artifact Builder

An interactive educational builder for creating agentic AI artifacts from a framework-neutral taxonomy.

This repository is the public companion project to the [Agentic AI Artifact Taxonomy](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy). The taxonomy repository is the conceptual source of truth. This repository is the interactive builder layer that helps people learn the taxonomy by selecting artifact types, filling guided fields, and generating clean starter files.

## Live Demo

- Live demo: `https://elvinmorales.github.io/agentic-artifact-builder/`
- Release notes: [docs/releases/v0.1.0.md](docs/releases/v0.1.0.md)
- Artifact lifecycle stages: [docs/artifact-lifecycle.md](docs/artifact-lifecycle.md)

## What This Is

Agentic Artifact Builder is a lightweight learning tool for people who want to design, operate, evaluate, and iterate agentic AI systems with clear artifacts instead of scattered notes.

It is for:

- Builders learning what artifacts an agent system needs.
- Educators explaining agent architecture through concrete files.
- Teams prototyping public-safe examples before adapting them to private environments.
- Developers who want starter files that map back to a stable taxonomy.

The builder exists because agent systems are easier to understand when the major design decisions, runtime contracts, safety rules, evaluation plans, and iteration notes are written down as explicit artifacts.

## Taxonomy Relationship

The companion taxonomy repository defines the stable 14 top-level buckets:

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

This builder must not create or imply a competing taxonomy. It may provide separate builder flows for sub-surfaces such as prompts, interfaces, plans, and handoffs, but those flows must map back to the canonical 14 buckets.

The builder also labels each artifact with one lifecycle stage: `design-time`, `runtime`, or `iteration`. These stages help learners understand when an artifact is usually created or used; they do not add taxonomy buckets. See [docs/artifact-lifecycle.md](docs/artifact-lifecycle.md).

## MVP

The MVP is:

> A taxonomy-backed educational artifact builder that helps users learn and generate the main artifact types needed to design, operate, evaluate, and iterate agentic AI systems.

Version `0.1.0` includes:

- A versioned artifact catalog aligned to the taxonomy repo.
- A static app shell that lets users browse artifact types by bucket and lifecycle stage.
- Guided fields for the current catalog artifact types.
- Generated starter files with synthetic, generic examples.
- Short learning notes that explain how each artifact relates to nearby artifacts.
- Specialized renderers for all current artifact types.
- Catalog and renderer validation tests.

`SKILL.md` is one artifact type for capability modules. It is not the whole product.

## Run Locally

The first app shell is a static browser app with no framework or build step. From the repository root, run:

```bash
python -m http.server 8000 -d src --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000
```

## Publishing

The app is served directly from `src/`; no install or build step is required.

For GitHub Pages setup, see [docs/publishing.md](docs/publishing.md). The recommended path uses GitHub Actions to upload `src/` as the static Pages artifact. Branch-based Pages settings commonly support the repository root or `/docs`, so do not assume `/src` can be selected directly in every repository configuration.

## Examples And Validation

The first public-safe example pack lives in `examples/synthetic-docs-assistant/`. It contains renderer-generated starter artifacts for the current catalog and shows how the 17 builder artifact types map back to the stable 14 taxonomy buckets.

Use `docs/public-safety-checklist.md` before committing or publishing generated artifacts. Public examples must stay synthetic and must not include secrets, private data, proprietary workflows, regulated data, private logs, real traces, memory entries, or live state snapshots.

Local validation uses Node built-ins only:

```bash
node --check src/app.js
node --check src/renderers/markdownRenderer.js
node --check src/renderers/artifactRenderers.js
node --check src/renderers/rendererUtils.js
node --check src/examples/exampleValues.js
node --check src/data/artifactCatalog.js
node --check tests/catalogIntegrity.test.mjs
node --check tests/rendererSmoke.test.mjs
node tests/catalogIntegrity.test.mjs
node tests/rendererSmoke.test.mjs
```

GitHub Actions runs the same syntax and validation checks on pull requests and pushes to `main` through `.github/workflows/validate.yml`.

## Artifact Coverage

Over time, the builder should help generate starter artifacts such as:

- Agent manifests and role profiles.
- Operating principles.
- Skill modules.
- Tool specs and resource manifests.
- System prompts, task prompts, and interface schemas.
- Memory policies and state strategies.
- Plan records and handoff contracts.
- Guardrails and governance policies.
- Output schemas.
- Evaluation rubrics and observability notes.
- Runtime configs.
- Iteration or changelog notes.

Possible filenames are examples, not universal standards, unless a protocol or framework requires a specific name.

## Out Of Scope

This project is not:

- A replacement for the taxonomy repository.
- A production agent runtime.
- A hosted memory store, trace store, or workflow engine.
- A protocol-specific taxonomy for MCP, A2A, or any other integration surface.
- A heavy framework app in the initial implementation phase.
- A place for private workflows, regulated data, production traces, or secrets.

## Public Safety

This repository must stay public-safe:

- Use synthetic, generic examples only.
- Do not include employer-specific content, proprietary workflows, regulated data, private endpoints, secrets, unsanitized logs, live runtime traces, real memory stores, or production state.
- Keep examples framework-neutral unless a mapping is explicitly about a framework or protocol.
- Treat protocol-facing artifacts such as MCP resources, MCP tools, MCP prompts, or A2A Agent Cards as mappings or adapters, not as replacements for the taxonomy.

## Acknowledgments

This project was partly inspired by a skill-building workshop artifact created by [@jpak-lilly](https://github.com/jpak-lilly).

That workshop helped spark the idea for a broader, public-safe, taxonomy-aligned builder for agentic AI artifacts across manifests, skills, tools, prompts, memory/state strategies, guardrails, schemas, evals, runtime notes, and iteration records.

The builder in this repo is a separate public project and does not include private workshop materials, internal workflows, proprietary examples, or employer-specific content.

## Status

`v0.1.0` static MVP.

The repo now includes a catalog-driven static builder that lets users select taxonomy artifact types, read learning guidance, fill generated fields, preview generated starter artifacts, load synthetic examples, reset values, copy output, and download starter files.

The artifact-specific renderers now cover the current catalog: identity, operating style, capability, tool, resource, prompt, interface, memory, state, plan, handoff, guardrails, output schema, evaluation rubric, runtime config, and iteration or changelog starter files. The generic fallback renderer remains available for future catalog entries before they receive specialized output.
