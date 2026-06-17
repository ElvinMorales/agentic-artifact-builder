# Roadmap

## Phase 0 - Repo Foundation And Taxonomy Alignment

Issues: #1, #2, #3, #20

- Update the README from a `SKILL.md`-only MVP to the full taxonomy-backed builder scope.
- Add a product brief and phased roadmap.
- Add taxonomy alignment guidance that preserves the stable 14-bucket model.
- Add the initial versioned artifact catalog.
- Add `AGENTS.md` so future coding-agent sessions follow the same boundaries.

## Phase 1 - Static Artifact Catalog And App Shell

Issues: future UI and data-consumption work

- Keep the implementation static and lightweight.
- Prefer plain HTML, CSS, and JavaScript.
- Load the versioned artifact catalog from `src/data/artifactCatalog.js`.
- Provide bucket, artifact type, lifecycle stage, and related artifact browsing.
- Avoid framework or build-tool decisions unless a future issue explicitly calls for them.

## Phase 2 - Core Builder UX

- Add guided forms for the first artifact types.
- Render generated starter files from structured catalog fields.
- Support preview, copy, and download.
- Show learning notes and public-safety reminders near the generated output.
- Treat possible filenames as examples unless a protocol or framework requires a specific name.

## Phase 3 - Artifact Groups Across The Taxonomy

- Expand guided builders across the 14 taxonomy buckets.
- Add explicit flows for prompts and interfaces while keeping them under Prompts and interfaces.
- Add explicit flows for plans and handoffs while keeping them under Planning and orchestration.
- Keep memory and state separate in both navigation and generated files.
- Keep design-time, runtime, and iteration artifacts distinct.

## Phase 4 - Examples, Validation, And GitHub Pages

- Add a synthetic example agent system that demonstrates how generated artifacts fit together.
- Add lightweight validation for required fields and catalog shape.
- Add tests only when implementation surfaces exist.
- Publish the static builder with GitHub Pages when the app shell is usable.

## Phase 5 - Optional Import/Export, Presets, And Framework Mappings

- Add export bundles for generated starter files.
- Add optional presets for common educational scenarios.
- Add framework mappings without making any framework the default taxonomy.
- Add protocol-facing mappings for MCP or A2A as adapters and examples, not replacement categories.
- Consider import flows only after generated output and validation are stable.
