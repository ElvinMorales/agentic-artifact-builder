# State strategy

## Purpose

Track one visible drafting session for the selected artifact, current form values, safety review status, and generated preview text.

## Memory And State Boundary

- State captures the current or resumable condition of a run, session, thread, workflow, or task.
- Memory captures durable reusable knowledge governed by the memory policy.
- Do not describe state as long-term memory or use state snapshots as durable user memory.

## What State Captures

- selected_artifact_id: Current catalog artifact id
- form_values: Synthetic draft values keyed by field id
- review_status: not_started | needs_review | safe_to_publish | blocked
- last_safe_checkpoint: Synthetic checkpoint label for retry or reset

## What State Must Not Capture

- Secrets, credentials, account identifiers, private endpoints, regulated data, or proprietary workflow details.
- Raw production logs, live traces, unsanitized transcripts, or private memory store contents.
- Information that belongs in the memory policy, resource manifest, or iteration notes instead of current run state.

## Session And Thread State

- Keep only the fields needed to continue the visible workflow.
- Use synthetic identifiers in public examples, such as example-session-001 or example-run-001.
- Clear or replace state when the user resets the workflow or starts a clearly separate task.

## Run-State Snapshot Strategy

State starts when a learner opens the builder, updates as fields change, checkpoints after preview generation, and clears on reset or browser refresh.

## Workspace And Sandbox Snapshot Posture

- Treat filesystem, tool, browser, and sandbox details as runtime context, not durable memory.
- Commit only sanitized schemas or strategy notes to the public repository.
- Do not commit live state snapshots, raw command logs, private paths, or unsanitized runtime outputs.

## Resume And Retry Behavior

If state is missing, return to artifact selection with empty fields. If safety review is blocked, keep the blocked status visible and ask for sanitized replacement values.

## Expiry Rules

Session-only for this public example.

## Approval And Interruption Handling

- Record whether a user-visible task is waiting, blocked, approved, declined, or complete.
- Do not treat an interrupted action as approved after resume.
- Retry only from a documented safe checkpoint and preserve visible status for review.

## Public Repo Posture

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.
- Use synthetic state examples only; never include production state snapshots.
- Public examples may show schemas, field names, and synthetic values only.
- Live state snapshots and raw runtime data should not be committed publicly unless fully sanitized.

## Related Artifacts

- memory-policy
- plan-record
- runtime-config
