# Contributing

Thanks for helping improve Agentic Artifact Builder. This project is the interactive educational builder layer for the public [Agentic AI Artifact Taxonomy](https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy).

The taxonomy repository is the conceptual source of truth. Contributions here should help people learn, browse, and generate public-safe starter artifacts without redefining the taxonomy.

## Project Boundaries

- Preserve the stable 14 top-level taxonomy buckets.
- Keep memory and state separate.
- Keep design-time, runtime, and iteration artifacts separate.
- Treat plans and handoffs as sub-surfaces inside Planning and orchestration.
- Treat protocol surfaces such as MCP resources, MCP prompts, MCP tools, and A2A Agent Cards as mappings or adapters, not taxonomy replacements.
- Keep generated examples educational starter artifacts, not production guarantees.
- Do not add frameworks, dependencies, package managers, or build tooling unless an issue explicitly requires it.

## Public-Safety Rules

Use synthetic, generic examples only.

Do not include employer-specific content, proprietary workflows, regulated data, secrets, private logs, real traces, real memory entries, live state snapshots, private URLs, account IDs, credentials, customer data, employee data, or private endpoints.

Before adding examples, review `docs/public-safety-checklist.md`.

## Proposing A New Artifact Renderer

Open an issue with:

- The generic artifact class.
- The canonical taxonomy bucket.
- Suggested filenames.
- Expected starter file sections.
- Related artifacts.
- Public-safety considerations.
- Optional framework or protocol mappings, clearly framed as examples.

Renderers should make generated output more useful while keeping the form catalog-driven and taxonomy-aligned.

## Adding Or Modifying Catalog Entries

Catalog changes live in `src/data/artifactCatalog.js`.

Each artifact entry should include:

- One canonical taxonomy bucket.
- Possible filenames as examples.
- Lifecycle stage.
- Learning goals.
- Guided fields.
- Public-safety notes.
- Related artifacts.

Update docs when a catalog change affects product scope, taxonomy alignment, or generated output. Add or update tests when validation or renderer behavior changes.

## Adding Examples Safely

Examples should be:

- Synthetic and generic.
- Beginner-friendly.
- Clear about related artifacts.
- Free of private, proprietary, regulated, or operational data.
- Explicit that private adaptation needs separate review.

Use placeholders such as `EXAMPLE_API_KEY`, `example-session-001`, and `https://example.invalid/service` when a shape needs a value.

## Local Validation

Run these checks before opening a pull request:

```bash
git status --short --branch
git diff --check
node --check src/app.js
node --check src/renderers/markdownRenderer.js
node --check src/renderers/artifactRenderers.js
node --check src/renderers/rendererUtils.js
node --check src/examples/exampleValues.js
node --check src/data/artifactCatalog.js
node tests/catalogIntegrity.test.mjs
node tests/rendererSmoke.test.mjs
```

If your change touches UI behavior, also run the static app locally:

```bash
python -m http.server 8000 -d src --bind 127.0.0.1
```

Then check the relevant screen in a browser.

## Pull Request Expectations

Keep pull requests focused. Link the issue being addressed, summarize the change, list validation performed, and call out any follow-up work.

For UI changes, include a screenshot or manual check note. For documentation-only changes, do not add tooling just to create extra validation.

## Issue Triage Notes

Good issues explain the user-facing problem, the artifact type or doc page involved, and the expected outcome. If an issue proposes a new artifact template, confirm the canonical taxonomy bucket and public-safety boundaries before implementation.
