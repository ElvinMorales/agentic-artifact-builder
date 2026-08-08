# Changelog

## [Unreleased]

### Added

- Documented the three lifecycle stages (`design-time`, `runtime`, `iteration`) in `docs/artifact-lifecycle.md` and added a lifecycle-stage detail panel, with a runtime data-safety warning, to the builder's learning panel.
- Added an acknowledgments section crediting the project's workshop inspiration to the README, the public announcement draft, and the `v0.1.0` release notes.
- Added an 18th catalog artifact type, "Public scaffold release package" (`public-scaffold-release-package`), with a specialized renderer, example values, and renderer smoke coverage.
- Added a dependency-free `package.json` exposing `check:syntax`, `test`, and `validate` npm scripts that wrap the repository's existing Node-built-in checks.
- Added `docs/filename-convention.md` documenting the lowercase download-filename convention and a filename-convention test enforcing it.
- Committed the synthetic-docs-assistant example pack's scenario field values and added a test that regenerates the pack from the current catalog and renderers and asserts a byte-exact match against the committed generated files.
- Added an automated public-safety pattern scan that checks tracked files for secret-, credential-, and private-endpoint-shaped values, with a documented allow-marker for reviewed false positives.

### Changed

- Reduced the lifecycle stage vocabulary from five values to the three documented stages and reassigned the skill module, tool spec, and interface schema artifacts from the removed `build-time` stage to `design-time`.
- Unified generated download filenames to a lowercase convention (for example `PROMPT.md` to `prompt.md`, `AGENT.yaml` to `agent.yaml`) and derived each download's content type from its filename extension instead of a hardcoded markdown type.
- Replaced the validation workflow's inline `node --check` and test commands with the new `check:syntax` and `test` npm scripts.
- Collapsed the validation workflow's syntax-check and test steps into a single step running `npm run validate`.

### Fixed

- Replaced the placeholder release-notes URL in the public announcement draft with the actual `v0.1.0` release URL.

## 0.1.0 - 2026-06-17

First MVP milestone for the public Agentic Artifact Builder.

### Added

- Taxonomy-aligned artifact catalog mapped to the stable 14 top-level buckets.
- Static builder shell served from `src/` with no framework or build step.
- Catalog-driven artifact picker, learning panel, and guided form generation.
- Artifact-specific renderer routing with specialized renderers for all current catalog artifacts.
- Generic fallback renderer for future or unexpected artifact IDs.
- Synthetic example values and a synthetic docs assistant example bundle.
- Public-safety checklist for reviewing generated artifacts before publishing.
- Renderer and catalog validation tests.
- GitHub Actions validation workflow for syntax and test checks.
- GitHub Pages publishing guidance and a minimal Pages workflow that deploys `src/`.
- Successful GitHub Pages deployment for the static MVP.
- `v0.1.0` release packet documentation and public announcement draft.
- Contributing guide, pull request template, and issue templates for public collaboration.
