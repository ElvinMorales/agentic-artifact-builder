# Rendering Strategy

## Why Forms Stay Catalog-Driven

The builder uses `src/data/artifactCatalog.js` as the UI contract. Artifact entries define the canonical taxonomy bucket, lifecycle stage, learning notes, fields, public-safety notes, and related artifacts. This keeps the picker, learning panel, and form rendering aligned to the stable 14-bucket taxonomy without creating a second product model.

## Why Renderers Are Layered On Top

Catalog fields are intentionally generic, but starter files should resemble the artifact being built. Artifact-specific renderers translate the same catalog values into more realistic formats, such as YAML-like manifests, `SKILL.md` documents, prompt files, and interface guidance.

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

## Covered In This Pass

- `agent-manifest`
- `role-profile`
- `operating-principles`
- `skill-module`
- `tool-spec`
- `resource-manifest`
- `system-task-prompt`
- `interface-schema`

## Fallback-Only Artifact IDs

- `memory-policy`
- `state-strategy`
- `plan-record`
- `handoff-contract`
- `guardrails-governance-policy`
- `output-schema`
- `eval-rubric`
- `runtime-config`
- `iteration-changelog-note`
