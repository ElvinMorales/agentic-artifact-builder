# Filename Convention

This documents the single convention that `src/data/artifactCatalog.js` (`exampleFilenames`), `artifactDownloadFilenames`, the committed example pack, and the pack README must agree on for each artifact's suggested filename.

Per [AGENTS.md](../AGENTS.md), filenames are suggestions unless a protocol or framework requires a specific name. This document records which suggested filenames are protocol-driven and which are this repository's own style choice.

## Content Type

The download button derives the blob's content type from the download filename's extension (`src/renderers/markdownRenderer.js#getDownloadContentType`), not from a hardcoded value:

| Extension | Content type |
| --- | --- |
| `.md` | `text/markdown;charset=utf-8` |
| `.yaml`, `.yml` | `text/yaml;charset=utf-8` |
| `.json` | `application/json;charset=utf-8` |
| anything else | `text/plain;charset=utf-8` |

## Identity Artifact Spelling

`agent-manifest` has exactly one YAML filename spelling: `agent.yaml` (lowercase). This is used in `artifactCatalog.js`'s `exampleFilenames`, `artifactDownloadFilenames`, the committed `examples/synthetic-docs-assistant/generated/agent.yaml` file, and that example's README. Do not reintroduce an uppercase `AGENT.yaml` variant.

## Skill Module: Name Length And Package Path

The companion [taxonomy repo](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy)'s Agent Skills standard mapping requires the frontmatter `name` to:

- be 1–64 characters,
- use lowercase letters, digits, and single hyphens with no leading or trailing hyphen, and
- match the parent directory the `SKILL.md` file lives in.

`slugify()` (`src/renderers/rendererUtils.js`) caps its output at 64 characters and strips any trailing hyphen left by truncation, so the generated frontmatter `name` always satisfies the length and character constraints.

For the parent-directory requirement: `getDownloadFilename(artifact, values)` returns a directory-scoped path for `skill-module`, e.g. `research/SKILL.md`, where the directory segment is the same slug used for the frontmatter `name`.

**Browser limitation.** The HTML `download` attribute does not create real subdirectories. Per the HTML spec (and confirmed against MDN), a `/` or `\` in the `download` attribute value is sanitized to `_` by the browser before saving. So a requested `research/SKILL.md` is actually saved by the browser as `research_SKILL.md` in the user's downloads folder, not as `research/SKILL.md` on disk.

Given that, and without adding a zip dependency (out of scope for this change), the app:

- still requests the directory-scoped path, so the saved filename is prefixed with the correct skill slug and is traceable back to the frontmatter `name`, and
- shows a status message with the filename the browser will actually save (`getSavedFilename()` in `src/app.js`), not the unsanitized path, so the UI never claims a directory was created when it wasn't.

Users who want a conformant Agent Skills package must manually move the downloaded file into `<skill-slug>/SKILL.md` before treating it as one — the same requirement the taxonomy repo's own `templates/SKILL.md` calls out ("a bare `templates/SKILL.md` is not an Agent Skills package because its parent directory does not match `name`").

## Lowercase Basename Pattern

The taxonomy repo's `templates/ui-harness/artifact.schema.json` constrains `suggested_filename` to:

```
^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+$
```

That schema self-describes as an "educational starter shape," not a universal runtime standard. This repository's rule:

**Lowercase-hyphenated basenames, unless an external standard or established ecosystem convention requires otherwise.**

Two kinds of documented exceptions are allowed under that rule:

### Protocol-driven exception

- `SKILL.md` — required uppercase by the Agent Skills standard itself. Not a repository choice.

### Ecosystem-convention exception

- `CHANGELOG.md` (`iteration-changelog-note`) — `CHANGELOG.md` is a widely recognized convention across open-source and package ecosystems (npm, Keep a Changelog, GitHub's own changelog rendering), independent of this repository or the taxonomy repo. Nothing in the taxonomy mandates it, but the ecosystem convention is established enough to keep as-is rather than rename to `changelog.md`.

All other download filenames that previously used an uppercase basename as a plain repository style choice — `PROMPT.md`, `INTERFACE.md`, `MEMORY.md`, `PLAN.md`, `HANDOFFS.md`, `GUARDRAILS.md`, `OUTPUT.md`, `RUNTIME.md` — have been renamed to `prompt.md`, `interface.md`, `memory.md`, `plan.md`, `handoffs.md`, `guardrails.md`, `output.md`, and `runtime.md` respectively, since none of them had a protocol or ecosystem convention requiring uppercase.

## Enforcement

`tests/filenameConvention.test.mjs` fails if any `artifactDownloadFilenames` entry's basename violates the lowercase pattern above and is not in the documented exception list in that test (kept in sync with this document). Adding a new artifact type with an uppercase or otherwise non-conforming filename, without adding it to both this document and the test's exception list, is treated as a regression.
