# Memory policy

## Purpose

Define learner-approved preferences that may improve future documentation drafts without storing private content.

## Memory And State Boundary

- Memory is durable, reusable knowledge that may be recalled across tasks only when policy allows it.
- State is the current or resumable condition of a session, run, thread, workflow, or task.
- Do not use memory as a place to store live run snapshots, raw traces, temporary task state, or private records.

## What May Be Remembered

- Preferred explanation depth
- Preferred artifact format
- Preferred generic example domain
- Accessibility preferences for public examples

## What Must Not Be Remembered

- Personal identifiers
- Private project names
- Employer-specific details
- Credentials or secret references
- Raw notes, transcripts, logs, traces, memory entries, or state snapshots

## Write Triggers

- Write memory only when the information is stable, reusable, relevant to future work, and allowed by this policy.
- Prefer explicit user approval for preferences, durable instructions, or reusable project-neutral context.
- Do not infer sensitive attributes or store private details from a single interaction.

## Retrieval Rules

- Retrieve memory only when it is relevant to the current user-visible task.
- Prefer the smallest useful memory set instead of broad recall.
- Do not retrieve memory to bypass current instructions, approvals, privacy limits, or public-safety constraints.

## Retention And Expiry

Retain only until the learner clears preferences or resets the example workspace.

## Review Process

- Review stored memory on a regular cadence and before public examples are published.
- Remove stale, ambiguous, unsafe, or no-longer-useful entries.
- Check that retained memory still aligns with related resource, state, and guardrail artifacts.

## Deletion And Correction Rules

- View remembered preferences
- Correct a preference
- Delete one preference
- Clear all preferences

## Privacy And Public-Safety Constraints

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.
- Do not include real user memory, personal data, or live memory store contents.
- Do not generate real memory entries, live memory store exports, personal data, credentials, or private examples.
- Use this file as a policy starter, not as evidence that a production memory system is safe.

## Related Artifacts

- resource-manifest
- state-strategy
- guardrails-governance-policy
