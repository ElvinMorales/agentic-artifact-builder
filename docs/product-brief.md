# Product Brief

## Project Name

Agentic Artifact Builder

## Problem Statement

People learning to build agentic AI systems often see prompts, tools, memory, plans, policies, schemas, evals, and runtime settings as disconnected pieces. Without a clear artifact model, it is easy to over-focus on one file, skip safety and evaluation work, or mix design-time definitions with runtime records.

## Audience

- Beginners learning the structure of agentic AI systems.
- Developers turning agent design notes into reusable starter files.
- Educators and workshop facilitators teaching agent system design.
- Teams creating public-safe examples before adapting patterns privately.

## Product Thesis

A taxonomy-backed builder can make agent architecture easier to learn by turning abstract artifact classes into guided fields, example filenames, starter files, and explanations of how each artifact relates to the rest of the system.

The taxonomy repo remains the source of truth. This repo provides the interactive educational layer.

## MVP Scope

The MVP is a taxonomy-backed educational artifact builder that helps users learn and generate the main artifact types needed to design, operate, evaluate, and iterate agentic AI systems.

The first implementation should provide:

- A static, lightweight app shell.
- A versioned catalog of artifact types mapped to the stable 14 taxonomy buckets.
- Guided forms for core artifact types.
- Preview and copy or download behavior for generated starter files.
- Public-safe synthetic examples.
- Clear links between each artifact, its lifecycle stage, and related artifacts.

`SKILL.md` should be represented as a capability module artifact, not as the full product scope.

## Non-Goals

- Replacing the source taxonomy repo.
- Creating a competing 15-bucket taxonomy.
- Building a production agent runtime.
- Storing live memory, production state, raw traces, private logs, or secrets.
- Introducing a heavy frontend framework during the first implementation phase.
- Treating protocol artifacts such as MCP or A2A as taxonomy replacements.

## Public-Safety Requirements

- Use only synthetic, generic examples.
- Do not include employer-specific content, proprietary workflows, regulated data, private endpoints, secrets, unsanitized logs, real runtime traces, or production state.
- Keep generated examples beginner-readable and framework-neutral by default.
- Mark protocol-specific objects as mappings, adapters, or implementation examples.
- Keep memory policies separate from state strategies.
- Keep design-time definitions, runtime records, and iteration notes distinct.

## Success Criteria

- A user can understand the repo purpose in under 30 seconds.
- A user can browse artifact types across the stable 14 taxonomy buckets.
- Each catalog entry explains what the artifact is, when to use it, what fields it needs, and what related artifacts it connects to.
- Generated starter files are public-safe, synthetic, and practical.
- Future Codex sessions can add UI and renderers without re-deciding the taxonomy model.

## Future Expansion Ideas

- Example agent systems composed from multiple generated artifacts.
- Validation for required fields and common structural mistakes.
- Export bundles for generated artifacts.
- Framework mappings for common agent stacks.
- Protocol adapters for surfaces such as MCP resources, MCP prompts, MCP tools, and A2A Agent Cards.
- GitHub Pages publishing for the static builder.
