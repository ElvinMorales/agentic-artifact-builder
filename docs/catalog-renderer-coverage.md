# Catalog Renderer Coverage

This table tracks renderer coverage for the current catalog. The generic fallback remains available for future or unexpected artifact ids.

| Artifact ID | Taxonomy bucket | Lifecycle stage | Renderer type | Suggested output filename | Issue |
| --- | --- | --- | --- | --- | --- |
| `agent-manifest` | Identity | `design-time` | Specialized | `agent.yaml` | Existing |
| `role-profile` | Identity | `design-time` | Specialized | `persona.md` | Existing |
| `operating-principles` | Operating style | `design-time` | Specialized | `principles.md` | Existing |
| `skill-module` | Capability modules | `design-time` | Specialized | `SKILL.md` | Existing |
| `tool-spec` | Tools | `design-time` | Specialized | `tools.yaml` | Existing |
| `resource-manifest` | Knowledge and resources | `design-time` | Specialized | `resources.yaml` | Existing |
| `system-task-prompt` | Prompts and interfaces | `design-time` | Specialized | `PROMPT.md` | Existing |
| `interface-schema` | Prompts and interfaces | `design-time` | Specialized | `INTERFACE.md` | Existing |
| `memory-policy` | Memory | `design-time` | Specialized | `MEMORY.md` | Existing |
| `state-strategy` | State | `runtime` | Specialized | `state-strategy.md` | Existing |
| `plan-record` | Planning and orchestration | `runtime` | Specialized | `PLAN.md` | Existing |
| `handoff-contract` | Planning and orchestration | `runtime` | Specialized | `HANDOFFS.md` | Existing |
| `guardrails-governance-policy` | Guardrails and governance | `design-time` | Specialized | `GUARDRAILS.md` | #13 |
| `output-schema` | Outputs and schemas | `design-time` | Specialized | `OUTPUT.md` | #13 |
| `eval-rubric` | Evaluation and observability | `iteration` | Specialized | `eval-rubric.md` | #14 |
| `runtime-config` | Runtime and deployment | `runtime` | Specialized | `RUNTIME.md` | #14 |
| `iteration-changelog-note` | Learning and iteration | `iteration` | Specialized | `CHANGELOG.md` | #14 |
