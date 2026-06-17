# Rendering Strategy

## Why Forms Stay Catalog-Driven

The builder uses `src/data/artifactCatalog.js` as the UI contract. Artifact entries define the canonical taxonomy bucket, lifecycle stage, learning notes, fields, public-safety notes, and related artifacts. Lifecycle stages use the controlled values documented in [artifact-lifecycle.md](artifact-lifecycle.md). This keeps the picker, learning panel, and form rendering aligned to the stable 14-bucket taxonomy without creating a second product model.

## Why Renderers Are Layered On Top

Catalog fields are intentionally generic, but starter files should resemble the artifact being built. Artifact-specific renderers translate the same catalog values into more realistic formats, such as YAML-like manifests, `SKILL.md` documents, prompt files, interface guidance, policies, schema contracts, evaluation rubrics, runtime notes, and changelog entries.

This keeps the UX generic while making generated outputs more useful for learners.

## Fallback Rendering

`src/renderers/markdownRenderer.js` remains the public renderer entry point. It checks `artifactRenderers[artifact.id]` and uses that renderer when one exists. If an artifact id is not registered, the generic Markdown renderer is used.

This means new catalog entries can still render immediately before they receive a specialized renderer.

## Adding A Renderer

1. Add or confirm the artifact entry in `src/data/artifactCatalog.js`.
2. Add synthetic example values in `src/examples/exampleValues.js`.
3. Add a renderer function in `src/renderers/artifactRenderers.js`.
4. Register it in `artifactRenderers` using the artifact id.
5. Add a sensible filename in `artifactDownloadFilenames` when the default `<artifact-id>.md` is not ideal.
6. Run the syntax checks listed in the README or issue handoff.

## Taxonomy And Public Safety

Renderers must not introduce new top-level taxonomy buckets. They may show framework or protocol mappings only as examples or adapters.

Keep memory and state separate. Keep design-time, runtime, and iteration artifacts distinct. Use synthetic, generic content only, and do not include secrets, private data, proprietary workflows, regulated data, private endpoints, unsanitized logs, real traces, live memory stores, or production state.

Memory renderers describe durable reusable knowledge rules: what may be remembered, what must not be remembered, retention, review, retrieval, and deletion or correction controls. They must not generate real memory entries or live memory store exports.

State renderers describe the current or resumable condition of a run, session, thread, workflow, or task. They may describe state schemas, checkpoint posture, approval status, and resume behavior, but public examples must not commit live state snapshots, raw runtime logs, unsanitized traces, or production state.

Plan and handoff renderers are separate builder flows under the canonical Planning and orchestration bucket. Plan records capture user-visible goals, steps, dependencies, assumptions, status, replanning triggers, and completion criteria. They are not a place for hidden chain-of-thought. Handoff contracts capture transfer conditions, required payloads, authority boundaries, access changes, approval needs, fallback behavior, and audit notes.

Guardrails and governance renderers define rules, approvals, escalation paths, action boundaries, data handling posture, auditability, and review expectations. They are policy artifacts, not prompts or runtime configs.

Output schema renderers define deliverable contracts. They describe required fields, optional fields, validation expectations, example JSON output, and failure handling. Schemas are not merely prose or style preferences.

Evaluation and observability renderers define review surfaces. They document scope, scenarios, scoring criteria, must-pass checks, regression checks, public-safety checks, failure examples, and review cadence without including real logs, traces, transcripts, or incident records.

Runtime renderers define non-secret runtime assumptions, provider placeholders, tool availability, resource path posture, timeout and retry assumptions, deployment posture, and local development notes. They must use placeholders for secret references and must not generate real credentials or private endpoints.

Learning and iteration renderers record what changed, why it changed, validation performed, migration notes, limitations, follow-up tasks, and feedback signals. They connect evals, feedback, release notes, and future improvements without becoming runtime state or durable memory.

## Covered In This Pass

- `agent-manifest`
- `role-profile`
- `operating-principles`
- `skill-module`
- `tool-spec`
- `resource-manifest`
- `system-task-prompt`
- `interface-schema`
- `memory-policy`
- `state-strategy`
- `plan-record`
- `handoff-contract`
- `guardrails-governance-policy`
- `output-schema`
- `eval-rubric`
- `runtime-config`
- `iteration-changelog-note`

These five final renderers close the remaining fallback-only coverage for the current catalog while keeping the UI catalog-driven and framework-neutral.

## Future Fallback Behavior

There are no fallback-only artifact ids in the current catalog after this pass. The generic renderer remains in place for future catalog entries, unexpected ids, and early experiments before a specialized renderer is added.
