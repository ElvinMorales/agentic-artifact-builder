# Public-Safety Checklist

Use this checklist before committing, publishing, or sharing generated artifacts from this repository. The goal is to keep public examples synthetic, generic, and safe while still making them useful for learners.

This checklist is for public repository review. A private deployment needs its own legal, security, privacy, compliance, and operational review.

For the three lifecycle stages used by the builder, see [artifact-lifecycle.md](artifact-lifecycle.md).

## Safe To Publish?

- [ ] The artifact uses synthetic, generic examples only.
- [ ] No secrets, credentials, tokens, account ids, private URLs, or private endpoints are present.
- [ ] No personal data, customer data, employee data, regulated data, or proprietary content is present.
- [ ] No private logs, traces, transcripts, incident records, live memory entries, or state snapshots are present.
- [ ] Tool permissions and side effects are placeholders or explicitly safe for public learning examples.
- [ ] Protocol mappings are framed as adapters or examples, not as taxonomy replacements.
- [ ] Memory and state remain separate.
- [ ] Design-time, runtime, and iteration artifacts remain separate.
- [ ] Related artifacts are named when a file depends on another policy, prompt, schema, runtime, memory, state, plan, or handoff artifact.
- [ ] A reviewer can adapt the example privately without committing private values back to this repository.

## Secrets And Credentials

Remove real or realistic credential material, including:

- API keys, access tokens, refresh tokens, session cookies, SSH keys, certificates, passwords, and one-time codes.
- Secret manager paths, vault names, credential aliases, or environment variable values that reveal private infrastructure.
- Account ids, tenant ids, billing ids, private service names, or private endpoint hostnames.

Use placeholders such as `EXAMPLE_API_KEY`, `provider-placeholder`, `account-id-placeholder`, and `https://example.invalid/service`.

## Private Data

Remove information that identifies a real person, organization, customer, employee, project, system, device, or account. This includes names, emails, phone numbers, addresses, identifiers, ticket numbers, screenshots, calendar entries, chat excerpts, and private filenames.

Use generic labels such as `Example learner`, `Public-safe reviewer`, `Synthetic project`, `example-request-001`, and `example-session-001`.

## Proprietary Or Employer-Specific Content

Do not commit employer-specific workflows, internal process names, confidential strategy, unreleased product plans, private architecture, internal tools, or proprietary prompts and policies.

Rewrite examples as generic learning scenarios. If a private workflow inspired the artifact, describe the public-safe pattern without copying names, steps, constraints, or operational details.

## Regulated Data

Do not include regulated or sensitive data such as health records, financial records, education records, government identifiers, biometric data, precise location data, child-related data, or legal case material.

Use neutral examples that do not resemble real regulated records.

## Private Logs, Traces, Transcripts, And Runtime State

Do not paste raw logs, stack traces from private systems, model transcripts, incident timelines, telemetry, request payloads, browser captures, observability exports, or production runtime traces.

Summarize synthetic review findings instead. If a test needs sample evidence, create a small public-safe fixture that cannot be mistaken for real operational data.

Runtime templates, placeholder configs, state schemas, plans, and handoff contracts can be public-safe. Unsanitized live sessions, traces, logs, transcripts, private state snapshots, workspace snapshots, secrets, private memory stores, and production runtime data are not public-safe.

## Memory Entries And State Snapshots

Memory policies may define what could be remembered, retention expectations, retrieval behavior, and user controls. They must not include real memory entries or live memory store exports.

State strategies may define state shape, lifecycle, checkpoints, expiry, and recovery behavior. They must not include real session state, live workflow snapshots, raw command output, private paths, or production runtime state.

## Tool Permissions And External Side Effects

Tool specs should describe permissions and failure modes without exposing private endpoints or enabling risky behavior.

Public examples should avoid external writes, account changes, network calls, filesystem mutation, irreversible operations, and actions that affect real users or systems. If a future private adaptation needs those capabilities, document that separate approval is required.

## Protocol Mappings

Protocol-specific surfaces such as MCP resources, MCP prompts, MCP tools, A2A Agent Cards, workflow graphs, or vendor-specific agent definitions are mappings or adapters.

Do not present a protocol object as a replacement taxonomy bucket. Use the pattern: generic artifact class -> possible filenames -> framework or protocol mapping -> implementation example.

## Public Examples

Public examples should be clear enough for beginners and generic enough for safe reuse.

Prefer examples about learning workflows, public notes, synthetic documentation, placeholder templates, local static files, and toy scenarios. Avoid examples that look like customer support tickets, production incidents, internal runbooks, proprietary sales workflows, or regulated records.

## Review Before Publishing

Before publishing an artifact:

- Search for credential-like strings, private URLs, account ids, and realistic identifiers.
- Check that every example value is synthetic and generic.
- Confirm taxonomy bucket placement against the catalog.
- Confirm related artifacts are referenced when needed.
- Confirm public-safety notes are present.
- Confirm private adaptation guidance tells users not to commit private values.

## Safe Placeholder Patterns

Use placeholders that are obviously non-operational:

- `EXAMPLE_API_KEY`
- `EXAMPLE_SERVICE_URL`
- `account-id-placeholder`
- `model-profile-placeholder`
- `provider-placeholder`
- `public-or-local-placeholder://resource`
- `example-request-001`
- `example-session-001`
- `https://example.invalid/service`
- `Public-safe reviewer`

## Unsafe Examples To Remove

Remove or rewrite examples that include:

- Real credentials, tokens, private URLs, account ids, tenant ids, or secret references.
- Real customer, employee, patient, student, financial, legal, or government data.
- Employer-specific workflows, internal system names, private repository names, or proprietary process details.
- Raw logs, traces, transcripts, screenshots, telemetry, incident records, or production state.
- Real memory entries, live memory store exports, current session state, or workflow snapshots.
- Tool calls that write to real systems, change accounts, contact users, spend money, or perform irreversible actions.
- Protocol mappings described as taxonomy replacements.
