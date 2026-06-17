# Synthetic Docs Assistant Example

This example is a fully synthetic agent artifact bundle generated from the current Agentic Artifact Builder catalog. It shows how the 17 current builder artifact types can fit together for a small documentation assistant that helps learners turn public-safe notes into structured starter docs.

## What This Is

`synthetic-docs-assistant` is an educational example for public review. It demonstrates how identity, operating style, capabilities, tools, resources, prompts, interfaces, memory, state, planning, handoffs, guardrails, output schemas, evaluation, runtime, and iteration artifacts can reference each other without becoming one large document.

The generated files are in `generated/`.

## Lifecycle Stages Demonstrated

The same files also show the builder's three lifecycle stages:

- Design-time artifacts define intended structure, policy, prompts, schemas, memory rules, and reusable templates.
- Runtime artifacts describe safe execution posture, state strategy, plans, handoffs, and placeholder configuration without publishing live runtime data.
- Iteration artifacts capture evaluation criteria, review findings, changelog notes, and improvement loops.

See [artifact lifecycle stages](../../docs/artifact-lifecycle.md) for the controlled stage values.

## What This Is Not

This is not a production agent, deployment guide, security approval, compliance review, memory store, runtime trace, or private workflow template. It does not access private systems, publish content, call external tools, or guarantee safe behavior in a real deployment.

## Taxonomy Buckets Demonstrated

The bundle preserves the stable 14 top-level buckets from the taxonomy:

1. Identity: `AGENT.yaml`, `persona.md`
2. Operating style: `principles.md`
3. Capability modules: `SKILL.md`
4. Tools: `tools.yaml`
5. Knowledge and resources: `resources.yaml`
6. Prompts and interfaces: `PROMPT.md`, `INTERFACE.md`
7. Memory: `MEMORY.md`
8. State: `state-strategy.md`
9. Planning and orchestration: `PLAN.md`, `HANDOFFS.md`
10. Guardrails and governance: `GUARDRAILS.md`
11. Outputs and schemas: `OUTPUT.md`
12. Evaluation and observability: `eval-rubric.md`
13. Runtime and deployment: `RUNTIME.md`
14. Learning and iteration: `CHANGELOG.md`

## How The Artifacts Relate

Start with `AGENT.yaml` for identity and scope, then read `persona.md` and `principles.md` for collaboration behavior. `SKILL.md`, `tools.yaml`, and `resources.yaml` describe reusable capability, tool, and reference boundaries.

`PROMPT.md` and `INTERFACE.md` describe model-facing instructions and interaction contracts. `MEMORY.md` defines durable preference policy, while `state-strategy.md` defines current session and workflow state. These are intentionally separate.

`PLAN.md` and `HANDOFFS.md` describe visible coordination and transfer of work. `GUARDRAILS.md` defines approval and safety boundaries. `OUTPUT.md` describes the generated output contract, `eval-rubric.md` describes review criteria, `RUNTIME.md` describes non-secret runtime assumptions, and `CHANGELOG.md` records iteration notes.

Runtime files in this example are templates only. They must not be replaced in the public repository with unsanitized live sessions, traces, logs, private state snapshots, secrets, private memory stores, or workspace snapshots.

## Why The Examples Are Synthetic

This repository is public. The examples avoid employer-specific content, proprietary workflows, regulated data, secrets, private URLs, account ids, real logs, runtime traces, transcripts, memory entries, and live state snapshots. Synthetic examples make the artifact shapes inspectable without exposing private information.

## Public-Safety Review

Review this example with [the public-safety checklist](../../docs/public-safety-checklist.md). The checklist covers secrets, private data, proprietary content, regulated data, logs and traces, memory and state boundaries, tool side effects, protocol mappings, placeholders, and publish-readiness.

## Private Adaptation

To adapt this pattern privately, copy the artifact structure into a private workspace and replace placeholders only after the appropriate security, privacy, legal, compliance, and operational review. Do not commit private values, real identifiers, runtime traces, memory entries, or state snapshots back to this public repository.
