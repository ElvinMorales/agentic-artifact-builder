# Artifact Lifecycle Stages

Artifact lifecycle stages help learners understand when an artifact is usually created or used. They do not replace the 14 taxonomy buckets. Each catalog entry still belongs to one canonical bucket and also has one lifecycle stage.

The builder uses three controlled stage values:

- `design-time`
- `runtime`
- `iteration`

## Design-Time

Design-time artifacts define intended behavior before or during implementation. They describe agent identity, role, operating style, capabilities, tools, resources, prompts, interfaces, memory policy, guardrails, output schemas, and reusable templates.

Public-safe examples may include placeholder policies, schema examples, prompt structures, tool contracts, and generic resource descriptions.

## Runtime

Runtime artifacts describe execution posture or operational configuration. In this catalog, state strategies, plan records, handoff contracts, and runtime configs are runtime-stage artifacts.

Public-safe examples may include sanitized templates, placeholder environment settings, state schemas, checkpoint strategies, and generic handoff contracts.

Do not commit unsanitized live sessions, traces, logs, transcripts, private state snapshots, workspace snapshots, private memory stores, secrets, credentials, account ids, private endpoints, or production runtime data.

## Iteration

Iteration artifacts capture feedback and improvement loops. They include evaluation rubrics, observability review guidance, changelog notes, release notes, versioning decisions, lessons learned, and follow-up work.

Public-safe examples may summarize synthetic findings, validation checks, reviewer notes, and improvement decisions. They should not copy private logs, real traces, private transcripts, incident records, or user content.

## Relationship To The 14 Buckets

Lifecycle stages are a second label for learning flow, not a competing taxonomy. The stable 14 buckets remain the source of taxonomy placement:

- Most structure, policy, prompt, schema, memory, and template artifacts are design-time.
- State, planning, handoff, and runtime deployment artifacts are runtime.
- Evaluation, observability, changelog, and learning artifacts are iteration.

If an artifact has nuance, document the nuance in the artifact description, learning goals, or public-safety notes instead of adding a new lifecycle stage.

## Memory And State

Memory and state stay separate.

Memory artifacts define what may be remembered, retention expectations, privacy boundaries, retrieval behavior, and user controls. They are design-time policy artifacts.

State artifacts define current or resumable process, workflow, session, task, or runtime condition. State is runtime posture, not durable memory.

## Public-Safe Templates Vs Unsafe Runtime Artifacts

Safe public examples:

- A state schema with synthetic field names.
- A runtime config with placeholder provider names and placeholder environment variables.
- A handoff contract using generic sender and receiver roles.
- A changelog note summarizing synthetic validation.

Unsafe public examples:

- Raw production logs, traces, telemetry, transcripts, or incident timelines.
- Live memory store exports or private state snapshots.
- Workspace snapshots with private paths, file contents, commands, or credentials.
- Real endpoints, account ids, tokens, customer data, employee data, or regulated data.

## How To Use Stages In The Builder

Use the lifecycle stage shown in the learning panel to decide what kind of starter file you are creating:

- Choose design-time artifacts when defining intent, policy, contracts, prompts, schemas, and reusable templates.
- Choose runtime artifacts when describing safe operational posture, resumable state, plans, handoffs, or placeholder configuration.
- Choose iteration artifacts when recording evaluation criteria, review findings, release notes, or next improvements.

Keep related artifacts linked, but do not collapse them into one file. A runtime config may reference a guardrail policy, a state strategy may reference a memory policy, and an iteration note may reference an eval rubric, but each artifact keeps its own role.
