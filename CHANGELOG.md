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
- Added repository convention and community files: `.gitattributes` (LF line endings), `.editorconfig`, `CLAUDE.md` (pointing to `AGENTS.md`), `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CODEOWNERS`, and a fourth issue template for engineering and maintenance work.

### Changed

- Reduced the lifecycle stage vocabulary from five values to the three documented stages and reassigned the skill module, tool spec, and interface schema artifacts from the removed `build-time` stage to `design-time`.
- Unified generated download filenames to a lowercase convention (for example `PROMPT.md` to `prompt.md`, `AGENT.yaml` to `agent.yaml`) and derived each download's content type from its filename extension instead of a hardcoded markdown type.
- Replaced the validation workflow's inline `node --check` and test commands with the new `check:syntax` and `test` npm scripts.
- Collapsed the validation workflow's syntax-check and test steps into a single step running `npm run validate`.

### Fixed

- Surfaced each catalog artifact's `publicSafetyNotes` in the generated output for the eight renderers that previously declared but never rendered them (`agent-manifest`, `role-profile`, `system-task-prompt`, `interface-schema`, `plan-record`, `handoff-contract`, `output-schema`, `public-scaffold-release-package`), so `plan-record` and `handoff-contract` now reflect the runtime-safety note added in #31. Removed two hardcoded lines in `output-schema` and `handoff-contract` that restated catalog notes verbatim, so the notes now have one source of truth instead of two that could drift.
- Replaced the placeholder release-notes URL in the public announcement draft with the actual `v0.1.0` release URL.
- Broadened `check:syntax` to collect any `.js`, `.mjs`, or `.cjs` file under `src/`, `tests/`, and `examples/`, instead of only `src/**/*.js`, `tests/**/*.test.mjs`, and `examples/**/*.js`.
- Removed an unreachable `${{ ... }}` allowlist pattern from the public-safety scan's placeholder list: the credential-assignment rule's whitespace guard already exits before that pattern could ever be checked for the conventional (spaced) form, so the entry was dead code.

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
