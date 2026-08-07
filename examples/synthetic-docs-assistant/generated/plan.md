# Plan record

## Goal

Generate and review a public-safe documentation starter artifact for a synthetic learning scenario.

## Scope

- Capture the user-visible plan, operational steps, dependencies, and status for the current task or workflow.
- Keep this as a planning and orchestration artifact under the canonical taxonomy bucket.
- Do not ask for or include private hidden reasoning; record visible decisions and next actions only.

## Assumptions

- The learner is using synthetic notes
- The artifact is educational and not production-ready
- Private adaptation happens outside the public repository

## Steps

1. Choose the artifact type
2. Fill required fields with synthetic values
3. Render the starter file
4. Review against the public-safety checklist
5. Name related artifacts and adaptation notes

## Dependencies

- Artifact catalog entry
- Specialized renderer or fallback renderer
- Public-safety checklist
- Reviewer acceptance criteria

## Decision Points

- Clarify scope when required fields, inputs, or acceptance criteria are missing.
- Ask for approval before actions with external side effects, private data exposure, or irreversible changes.
- Reconfirm taxonomy placement when a plan appears to cross artifact boundaries.

## Status Model

- Current status: In progress
- Suggested states: not started, in progress, blocked, waiting for approval, ready for review, done.
- Status should describe observable progress, not private reasoning.

## Replanning Triggers

- Goal, scope, or acceptance criteria changes.
- A dependency is unavailable or unsafe to use.
- A step reveals missing approval, missing context, or a public-safety concern.

## Completion Criteria

- All visible steps are complete or intentionally deferred.
- Required artifacts are updated and internally consistent.
- Safety constraints are satisfied and related artifacts are named.

## Risks

- Treating the plan as hidden chain-of-thought instead of a user-visible coordination artifact.
- Confusing temporary run state with durable memory.
- Skipping approval or review when the plan changes authority, tools, or data handling.

## Related Artifacts

- handoff-contract
- state-strategy
- iteration-changelog-note
