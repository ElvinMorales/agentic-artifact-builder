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
