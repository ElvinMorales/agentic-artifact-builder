# Publishing

Agentic Artifact Builder is a static app served from `src/`. It does not need a framework, package manager, install step, or build step.

## Run Locally

From the repository root:

```bash
python -m http.server 8000 -d src --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000
```

## GitHub Pages Options

GitHub Pages can serve this app in two practical ways:

1. Use the recommended GitHub Actions workflow and upload `src/` directly.
2. Use repository Pages settings to deploy from a branch, with the app located in a supported Pages folder.

The workflow path is preferred for this repository because the source app already lives in `src/`.

## Recommended: GitHub Actions Pages Deployment

This repository includes `.github/workflows/pages.yml`, which:

- Runs on pushes to `main`.
- Uses official GitHub Pages actions.
- Uploads `src/` as the static site artifact.
- Deploys the uploaded artifact to GitHub Pages.
- Does not run `npm install`, build commands, or dependency setup.
- Does not require repository secrets.

Repository owners may still need to enable Pages in repository settings:

1. Open the repository on GitHub.
2. Go to **Settings** -> **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Save the setting, then push to `main` or rerun the Pages workflow.

Do not claim a published URL until the workflow has completed successfully and GitHub Pages shows the deployment as active.

## Manual: Deploy From A Branch

GitHub Pages also supports publishing from a branch through repository settings:

1. Open **Settings** -> **Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select the `main` branch.
4. Select a supported folder.

In GitHub's branch-based Pages settings, the supported folder choices are commonly the repository root (`/`) or `/docs`. Arbitrary folders such as `/src` are not available in all branch-based Pages configurations.

Because this app currently lives in `src/`, do not assume branch settings can publish `/src` directly. If the repository owner wants to use branch-based publishing instead of the workflow, the repo should use one of these approaches:

- Move or copy the static app entry files into a supported Pages folder such as `/docs`.
- Move or copy the static app entry files to the repository root.
- Keep the app in `src/` and use the GitHub Actions workflow instead.

Avoid adding a build tool only to move files for Pages. The current app is intentionally static and dependency-free.

## Public-Safety Reminder

Only publish synthetic, generic examples. Do not publish secrets, private data, employer-specific workflows, regulated data, raw logs, real traces, memory entries, live state snapshots, private URLs, account IDs, or credentials.

Review `docs/public-safety-checklist.md` before publishing example artifacts or screenshots.
