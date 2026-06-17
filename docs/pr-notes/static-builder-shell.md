# Static Builder Shell PR Notes

## Summary

This PR records the static builder shell implementation that is already present on `main` and updates stale project status language.

## Issues addressed

Closes #5  
Closes #6  
Closes #7  

## Changes

- Updates README status to reflect the early static MVP shell
- Adds implementation notes for the static builder shell
- Documents validation and known limitations

## Current shell capabilities

- Catalog-driven artifact picker grouped by taxonomy bucket
- Learning panel for selected artifacts
- Generic guided form generated from catalog fields
- Live Markdown preview
- Synthetic example loading
- Reset current form
- Copy generated Markdown
- Download generated `.md` file

## Validation

- `git status --short --branch`
- `git diff --check`
- `node --check src/app.js`
- `node --check src/renderers/markdownRenderer.js`
- `node --check src/examples/exampleValues.js`
- Catalog sanity check confirmed 14 taxonomy buckets and 17 artifact entries
- Renderer sanity check confirmed generated Markdown includes expected selected-artifact content
- Temporary local static-server HTTP check returned 200 for `http://localhost:8000` and `http://localhost:8000/app.js`

Browser click-through validation was not available in this session because the in-app browser surface was not exposed.
