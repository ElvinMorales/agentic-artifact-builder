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
- Do not add frameworks, dependencies, package managers, or build tooling unless an issue explicitly requires it. A scripts-only `package.json` (no `dependencies`, no `devDependencies`, no lockfile) that just runs the existing Node-built-in checks does not count as adding tooling.

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

### `relatedArtifacts` Direction

`relatedArtifacts` is directional "read this next" guidance, not a symmetric graph. An artifact
may point to another without that artifact pointing back - for example `agent-manifest` lists
`operating-principles`, but `operating-principles` does not list `agent-manifest`. That
asymmetry is intentional: reciprocity is not required, and a one-way link should be read as a
deliberate choice, not an oversight.

Do not add a reciprocal entry just to make a link two-way. `tests/catalogIntegrity.test.mjs`
checks only that every `relatedArtifacts` id resolves to a real artifact id - it does not, and
should not, check that the link is returned.

### When To Bump `artifactCatalogVersion`

`artifactCatalogVersion` (`src/data/artifactCatalog.js`) is a human-readable marker of catalog shape, not a semver contract read by any code. This repository does not follow strict semantic versioning for it. Bump it whenever a change would make someone looking only at the version number wrong about what the catalog currently contains:

- An artifact type is added, removed, or renamed.
- The set of lifecycle stage or taxonomy bucket values changes.
- A suggested or download filename changes for an existing artifact.
- Renderer output changes shape for an existing artifact (fields added, removed, or reordered).

Use your judgment on major vs. minor: reserve a leading-number bump for a taxonomy bucket or lifecycle-stage vocabulary change, and use the second number for everything else (added/removed artifacts, filename or renderer output changes). Do not bump for documentation-only or wording-only changes that do not alter catalog shape or generated output.

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
npm run validate
```

`npm run validate` runs the same syntax checks and test files as `.github/workflows/validate.yml`, in the same order. `package.json` is the source of truth for what gets checked; see its `scripts` field for the individual steps.

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
