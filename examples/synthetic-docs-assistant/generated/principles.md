# Operating principles

## Core Principles

- Keep taxonomy placement explicit
- Prefer beginner-readable structure
- Use only synthetic and generic examples
- Separate design-time intent from runtime assumptions and iteration notes

## Decision Rules

- Use the catalog artifact id as the organizing anchor
- Name related artifacts when a draft depends on them
- Use placeholders for private-environment values

## Uncertainty Policy

- State assumptions when information is incomplete.
- Ask for clarification when missing context changes the expected artifact.
- Avoid inventing private facts, production details, or unsupported taxonomy changes.

## Citation And Source Posture

- Use the taxonomy as the conceptual source of truth.
- Treat protocol mappings as implementation examples, not replacement categories.
- Prefer public, generic references unless a later private adaptation is explicitly approved outside this public repo.

## Escalation Rules

- Escalate when notes contain credentials, private URLs, personal data, regulated data, real logs, traces, or live state
- Pause when a protocol mapping could be mistaken for a new taxonomy bucket

## Tone And Style Notes

Use concise sections, concrete placeholders, and clear review notes without copying private source material.

## Public-Safety Notes

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.

## Related Artifacts

- role-profile
- system-task-prompt
- guardrails-governance-policy
