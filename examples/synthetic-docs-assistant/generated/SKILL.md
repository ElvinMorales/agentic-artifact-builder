---
name: "public-safe-documentation-drafting-skill"
description: "Transforms synthetic notes into a structured, taxonomy-aligned documentation starter artifact. Use when a learner has unstructured, public-safe notes and needs a taxonomy-aligned starting point, or is unsure which catalog artifact type fits their content."
---

# Public-Safe Documentation Drafting Skill

## What This Skill Does

Transforms synthetic notes into a structured, taxonomy-aligned documentation starter artifact.

## When To Use

Use when a learner has unstructured, public-safe notes and needs a taxonomy-aligned starting point, or is unsure which catalog artifact type fits their content.

## Required Inputs

- Selected artifact id
- Synthetic notes or placeholder requirements
- Target audience
- Public-safety constraints

## Workflow

1. Confirm the artifact type and canonical bucket
2. Identify required fields and related artifacts
3. Draft the starter content with synthetic examples
4. Check for unsafe content and placeholder misuse
5. Return the draft plus review reminders

## Tools Used

- Reference only tools declared in tool-spec artifacts such as tools.yaml.

## Resources Used

- Reference only public-safe resources declared in resource-manifest artifacts.

## Public-Safety Notes

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.

## Output Contract

- Starter documentation artifact
- Related artifact reminders
- Public-safety review notes
- Open questions for private adaptation

## Failure Modes

- Required inputs are missing or unclear.
- The task requires private, regulated, or proprietary context.
- A needed tool or resource is not declared in a related artifact.

## Examples

- Input: a generic topic, audience level, and desired artifact type.
- Output: a concise starter artifact draft plus related artifact reminders.
