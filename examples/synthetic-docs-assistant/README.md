# Synthetic Docs Assistant Example

This example is a fully synthetic agent artifact bundle generated from the current Agentic Artifact Builder catalog. It shows how the 18 current builder artifact types can fit together for a small documentation assistant that helps learners turn public-safe notes into structured starter docs.

## What This Is

`synthetic-docs-assistant` is an educational example for public review. It demonstrates how identity, operating style, capabilities, tools, resources, prompts, interfaces, memory, state, planning, handoffs, guardrails, output schemas, evaluation, runtime, and iteration artifacts can reference each other without becoming one large document.

The generated files are in `generated/`. The scenario field values used to generate them are committed in [`scenario-values.js`](./scenario-values.js), keyed by catalog artifact id. `tests/exampleFixtures.test.mjs` regenerates every file from those values with the current catalog and renderers and asserts a byte-exact match against `generated/`, so the "generated from the current catalog" claim above is checked on every `npm run validate` / `npm test` run and in CI, not just asserted in prose. If a renderer or the catalog changes in a way that would silently orphan this pack, that test fails and names the affected file(s).

One artifact, `public-scaffold-release-package` (`release-package.md`), intentionally reuses the same values as `src/examples/exampleValues.js`'s entry for that id, rather than duplicating a second synthetic set — see the comment above that entry in `scenario-values.js`.

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

1. Identity: `agent.yaml`, `persona.md`
2. Operating style: `principles.md`
3. Capability modules: `SKILL.md`
4. Tools: `tools.yaml`
5. Knowledge and resources: `resources.yaml`
6. Prompts and interfaces: `prompt.md`, `interface.md`
7. Memory: `memory.md`
8. State: `state-strategy.md`
9. Planning and orchestration: `plan.md`, `handoffs.md`
10. Guardrails and governance: `guardrails.md`
11. Outputs and schemas: `output.md`
12. Evaluation and observability: `eval-rubric.md`
13. Runtime and deployment: `runtime.md`
14. Learning and iteration: `CHANGELOG.md`, `release-package.md`

## How The Artifacts Relate

Start with `agent.yaml` for identity and scope, then read `persona.md` and `principles.md` for collaboration behavior. `SKILL.md`, `tools.yaml`, and `resources.yaml` describe reusable capability, tool, and reference boundaries.

`prompt.md` and `interface.md` describe model-facing instructions and interaction contracts. `memory.md` defines durable preference policy, while `state-strategy.md` defines current session and workflow state. These are intentionally separate.

`plan.md` and `handoffs.md` describe visible coordination and transfer of work. `guardrails.md` defines approval and safety boundaries. `output.md` describes the generated output contract, `eval-rubric.md` describes review criteria, `runtime.md` describes non-secret runtime assumptions, `CHANGELOG.md` records iteration notes, and `release-package.md` prepares public-safe release communication without claiming production readiness.

Runtime files in this example are templates only. They must not be replaced in the public repository with unsanitized live sessions, traces, logs, private state snapshots, secrets, private memory stores, or workspace snapshots.

## Files With Generic Rather Than Scenario-Specific Content

Most files in this bundle name the documentation-assistant scenario directly (for example `agent.yaml` names "Synthetic Docs Assistant", `SKILL.md` describes a documentation-drafting skill). Three files are scenario-neutral instead, because their sections describe how the *builder itself* behaves rather than how this one example agent behaves:

- `principles.md` (`operating-principles`) - decision and escalation rules written for drafting any catalog artifact, not for documentation specifically.
- `tools.yaml` (`tool-spec`) - a template-lookup tool over the builder's own local example collection, not a documentation-domain tool.
- `state-strategy.md` (`state-strategy`) - session/state fields for the builder's drafting workflow (selected artifact, form values, review status), which apply the same way regardless of which artifact scenario is being drafted.

Because these three describe builder-level behavior rather than documentation-assistant-specific behavior, keeping their values scenario-neutral makes them reusable as-is for other future example packs, without rewriting their field values.

## Why The Examples Are Synthetic

This repository is public. The examples avoid employer-specific content, proprietary workflows, regulated data, secrets, private URLs, account ids, real logs, runtime traces, transcripts, memory entries, and live state snapshots. Synthetic examples make the artifact shapes inspectable without exposing private information.

## Public-Safety Review

Review this example with [the public-safety checklist](../../docs/public-safety-checklist.md). The checklist covers secrets, private data, proprietary content, regulated data, logs and traces, memory and state boundaries, tool side effects, protocol mappings, placeholders, and publish-readiness.

## Private Adaptation

To adapt this pattern privately, copy the artifact structure into a private workspace and replace placeholders only after the appropriate security, privacy, legal, compliance, and operational review. Do not commit private values, real identifiers, runtime traces, memory entries, or state snapshots back to this public repository.
