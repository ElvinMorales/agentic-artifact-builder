# Security Policy

Agentic Artifact Builder is a static, dependency-free educational web app. It has no server-side runtime, no database, no authentication, and no installable package — it does not run as a service and does not process or store user data. A conventional vulnerability-disclosure policy (supported versions, patch SLAs, CVE coordination) does not fit a project with that shape, so this document describes what to report instead.

## What To Report Here

- **A public-safety problem in a committed example** — a generated fixture, example pack, or doc snippet that looks like it contains a real secret, private URL, account identifier, or other value that `docs/public-safety-checklist.md` and the automated scan (`tests/publicSafetyScan.test.mjs`) should have caught.
- **A defect in generated output** — the builder or a renderer producing incorrect, unsafe, or taxonomy-misaligned starter files.

This repository does not accept reports about hosting infrastructure (GitHub Pages) or the GitHub platform itself — report those to GitHub directly.

## How To Report

- If the report involves a value that looks like a real secret, private URL, or other sensitive data already committed to this public repository, use [GitHub's private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability) (repository's Security tab → "Report a vulnerability") instead of a public issue, so the report itself does not republish the sensitive value.
- Otherwise, open a plain bug report using the repository's issue templates. Most defects in generated output are not sensitive and benefit from public triage like any other bug.

## Do Not Paste Sensitive Values Into A Report

Whatever channel you use, do not paste the actual secret, private URL, log line, stack trace, or state snapshot into the report itself. Describe its shape and location instead — which file, which line, which rule should have caught it. Restating the sensitive value in a bug report, even a private one, recreates the exact harm this repository's public-safety rules exist to prevent. See `docs/public-safety-checklist.md` for the categories of value this project treats as unsafe to publish.

## Maintainer Contact

<!-- placeholder for maintainer: fill in a contact address or preferred channel here if private vulnerability reporting is not enabled for this repository -->
No dedicated security contact address is published. Use the reporting paths above.
