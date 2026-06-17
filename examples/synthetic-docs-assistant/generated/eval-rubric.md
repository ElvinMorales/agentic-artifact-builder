# Eval rubric

## Evaluation Purpose

Assess whether a documentation starter artifact is clear, public-safe, and aligned with the canonical taxonomy bucket.

## Scope

- Evaluate the selected agent artifact, generated output, or workflow behavior against documented criteria.
- Use synthetic scenarios and public-safe reviewer notes only.
- Keep evaluation criteria distinct from runtime configuration and iteration notes, while linking findings to both when useful.

## Test Cases Or Scenarios

- Draft an agent manifest for the synthetic docs assistant
- Draft a memory policy without real memory entries
- Draft a state strategy without long-term memory claims
- Draft a runtime config using placeholder-only secret references
- Draft an output schema with array fields for key_points and related_artifacts

## Scoring Criteria

- Canonical bucket is correct
- Required catalog fields are represented
- Memory and state boundaries remain separate
- Design-time, runtime, and iteration roles remain distinct
- Examples are synthetic and generic
- Related artifacts are named

## Scoring Guidance

Score each criterion from 1 to 3. A score of 1 means missing or unsafe, 2 means partially useful but needs revision, and 3 means clear enough for public learner review.

## Must-Pass Checks

- The output maps to the correct canonical taxonomy bucket.
- Required fields or contract sections are present.
- Related artifacts are named when the output depends on policy, prompt, schema, runtime, memory, state, plan, or handoff artifacts.
- The example remains synthetic, generic, and free of private or regulated data.

## Regression Checks

- Previously covered artifact types still render with their specialized structure.
- The generic fallback still renders unexpected future artifact ids.
- Copy, download, reset, load-example, form editing, and live preview behavior continue to work.

## Public-Safety Checks

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.

## Failure Examples

- The output invents a new top-level taxonomy bucket.
- A state artifact is described as long-term memory.
- A schema is treated as a loose formatting preference rather than a validation contract.
- A runtime example includes a real credential, private URL, account id, log, or trace.

## Review Cadence

- Review on each renderer change and before public examples are published. Use synthetic notes only; do not paste real user sessions, traces, transcripts, incidents, or logs.
- Review the rubric before major renderer changes, new catalog entries, or public release notes.
- Record material evaluation findings in an iteration or changelog note.

## Related Artifacts

- output-schema
- guardrails-governance-policy
- iteration-changelog-note
