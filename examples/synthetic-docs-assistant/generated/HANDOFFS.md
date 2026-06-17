# Documentation Draft Safety Review Handoff

## Purpose

Documentation Draft Safety Review Handoff defines a framework-neutral transfer of context, responsibility, and next actions between roles.

## Canonical Bucket

- This is a builder flow under Planning and orchestration.
- Protocol surfaces such as MCP tools, A2A Agent Cards, workflow graphs, or vendor-specific agents are mappings or adapters, not replacement taxonomy buckets.

## Source Agent Or Role

Synthetic Docs Assistant

## Target Agent Or Role

Public-safe documentation reviewer

## When To Hand Off

- The source role has completed its scoped work or reached an explicit transfer point.
- The next action requires a different role, authority boundary, tool permission, or review posture.
- The source role is blocked and the target role is responsible for resolution or triage.

## Required Handoff Payload

- Generated starter artifact
- Selected artifact id and canonical bucket
- Public-safety checklist result
- Related artifact ids
- Open adaptation questions

## Authority Boundary

- The source role transfers only the authority explicitly described in this contract.
- The target role must follow its own role profile, tool permissions, guardrails, and approval requirements.
- A handoff does not grant access to private data, new tools, or external side effects by default.

## Tool And Resource Access Changes

- List any changed tool, resource, or workspace access in a related tool spec, resource manifest, or runtime config.
- Use placeholder references in public examples.
- Do not include private endpoints, account ids, credentials, or internal system names.

## Approval Requirements

- Require explicit approval before changing authority, adding side effects, accessing private context, or publishing outputs.
- Preserve declined or missing approvals as visible status rather than assuming consent.
- Escalate when acceptance criteria conflict with guardrails or public-safety constraints.

## Failure And Fallback Behavior

- If the payload is incomplete, request the missing fields or return to the source role.
- If the target role lacks required authority, pause and request approval or reassignment.
- If safety constraints are unclear, use a synthetic placeholder and document the open question.

## Acceptance Criteria

- No secrets, credentials, account ids, private URLs, personal data, regulated data, logs, traces, memory entries, or state snapshots
- Canonical bucket is correct
- Related artifacts are named
- Private adaptation guidance is clearly separated from public examples

## Audit And Trace Notes

- Record handoff status, payload completeness, approvals, and follow-up actions with synthetic public-safe examples.
- Do not commit raw runtime traces, private logs, customer details, employee data, or unsanitized transcripts.

## Related Artifacts

- plan-record
- state-strategy
- interface-schema
