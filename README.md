# Agentic Artifact Builder

An interactive educational builder for creating agentic AI artifacts from a framework-neutral taxonomy.

This repository is the public companion project to the [Agentic AI Artifact Taxonomy](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy). The taxonomy repository is the conceptual source of truth. This repository is the interactive builder layer that helps people learn the taxonomy by selecting artifact types, filling guided fields, and generating clean starter files.

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

## MVP

The MVP is:

> A taxonomy-backed educational artifact builder that helps users learn and generate the main artifact types needed to design, operate, evaluate, and iterate agentic AI systems.

The first usable version should include:

- A versioned artifact catalog aligned to the taxonomy repo.
- A static app shell that lets users browse artifact types by bucket and lifecycle stage.
- Guided fields for a small set of core artifact types.
- Generated starter files with synthetic, generic examples.
- Short learning notes that explain how each artifact relates to nearby artifacts.

`SKILL.md` is one artifact type for capability modules. It is not the whole product.

## Run Locally

The first app shell is a static browser app with no framework or build step. From the repository root, run:

```bash
python -m http.server 8000 -d src
```

Then open:

```text
http://localhost:8000
```

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

## Status

Early foundation. The current focus is documentation, taxonomy alignment, and the initial artifact catalog before app UI implementation.
