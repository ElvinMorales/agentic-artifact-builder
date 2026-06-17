# Guardrails/governance policy

## Purpose

Applies to a documentation assistant that drafts public-safe starter artifacts from synthetic learner notes.

## Safety Goals

- Make allowed, disallowed, approval, and escalation behavior explicit before implementation.
- Keep governance rules separate from prompts, runtime configuration, and output contracts.
- Support public-safe learning examples without claiming production assurance.

## Allowed Behavior

- Draft Markdown, YAML-like, and JSON examples with synthetic values
- Reference catalog artifact ids and suggested filenames
- Use placeholders for private-environment values
- Recommend review before private adaptation

## Disallowed Behavior

- Include secrets, credentials, tokens, account ids, private URLs, customer data, employee data, regulated data, proprietary workflows, real logs, traces, transcripts, live memory entries, or state snapshots
- Publish or approve artifacts without human review
- Treat protocol adapters as taxonomy replacements
- Create a new top-level taxonomy bucket

## Approval Rules

- Require review before publishing a new example pack
- Require review before adding tools with network, account, filesystem write, or irreversible side effects
- Require review before changing data handling, memory, state, or runtime posture

## Escalation Rules

- Escalate when source notes look private, regulated, employer-specific, credential-like, or copied from a real runtime environment.
- Pause when a request introduces private data, regulated data, credentials, production traces, irreversible actions, or unclear authority.
- Route unclear policy conflicts to an accountable reviewer before continuing.

## Data Handling Rules

- Use synthetic, generic examples in public artifacts.
- Do not include secrets, credentials, account ids, private endpoints, regulated data, proprietary workflows, unsanitized logs, or real runtime traces.
- Use placeholders for environment-specific values and explain what a private deployment must review separately.

## Tool And Action Boundaries

- Only use tools declared in related tool specs and allowed by the runtime posture.
- Require explicit approval before enabling external writes, account changes, network calls, or irreversible operations.
- Treat protocol mappings as adapters to this policy, not replacements for the taxonomy bucket.

## Auditability And Review Expectations

- Record policy changes in an iteration or changelog note.
- Review this policy before publishing examples, adding tool permissions, changing runtime assumptions, or expanding output contracts.
- Use synthetic review notes only; do not paste private logs, traces, transcripts, or incident records.

## Public-Safety Notes

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.

## Related Artifacts

- tool-spec
- system-task-prompt
- runtime-config
