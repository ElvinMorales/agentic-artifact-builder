export const artifactCatalogVersion = "0.1.0";

export const sourceTaxonomy = {
  repo: "https://github.com/ElvinMorales/agentic-ai-artifact-taxonomy",
  version: "v0.2.0-aligned",
  notes:
    "The taxonomy repo is the source of truth. This catalog is an educational builder mapping, not a replacement taxonomy.",
};

export const taxonomyBuckets = [
  { id: "identity", name: "Identity" },
  { id: "operating-style", name: "Operating style" },
  { id: "capability-modules", name: "Capability modules" },
  { id: "tools", name: "Tools" },
  { id: "knowledge-and-resources", name: "Knowledge and resources" },
  { id: "prompts-and-interfaces", name: "Prompts and interfaces" },
  { id: "memory", name: "Memory" },
  { id: "state", name: "State" },
  { id: "planning-and-orchestration", name: "Planning and orchestration" },
  { id: "guardrails-and-governance", name: "Guardrails and governance" },
  { id: "outputs-and-schemas", name: "Outputs and schemas" },
  { id: "evaluation-and-observability", name: "Evaluation and observability" },
  { id: "runtime-and-deployment", name: "Runtime and deployment" },
  { id: "learning-and-iteration", name: "Learning and iteration" },
];

export const lifecycleStages = [
  "design-time",
  "runtime",
  "iteration",
];

const commonSafetyNotes = [
  "Use synthetic, generic examples only.",
  "Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.",
];

const runtimeSafetyNote =
  "Runtime templates and configuration examples are okay, but do not publish unsanitized live sessions, traces, logs, private state snapshots, secrets, or workspace snapshots.";

export const artifactCatalog = [
  {
    id: "agent-manifest",
    bucket: "identity",
    name: "Agent manifest",
    description:
      "Defines the agent's name, purpose, scope, ownership model, and high-level responsibilities.",
    lifecycleStage: "design-time",
    exampleFilenames: ["AGENT.md", "agent.yaml"],
    learningGoals: [
      "Explain what the agent is for.",
      "Separate identity from capabilities, tools, and runtime configuration.",
      "Make ownership and scope visible before implementation.",
    ],
    fields: [
      { id: "agentName", label: "Agent name", type: "text", required: true },
      { id: "purpose", label: "Purpose", type: "textarea", required: true },
      { id: "scope", label: "Scope", type: "textarea", required: true },
      { id: "owners", label: "Owners or maintainers", type: "list", required: false },
      { id: "relatedSystems", label: "Related systems", type: "list", required: false },
    ],
    publicSafetyNotes: commonSafetyNotes,
    relatedArtifacts: ["role-profile", "operating-principles", "runtime-config"],
  },
  {
    id: "role-profile",
    bucket: "identity",
    name: "Role profile",
    description:
      "Describes the agent's role, persona boundaries, collaboration stance, and expected level of autonomy.",
    lifecycleStage: "design-time",
    exampleFilenames: ["persona.md", "role-profile.md"],
    learningGoals: [
      "Describe the agent role without overloading the system prompt.",
      "Clarify audience, tone, and collaboration expectations.",
      "Keep role boundaries distinct from tool permissions.",
    ],
    fields: [
      { id: "role", label: "Role", type: "text", required: true },
      { id: "audience", label: "Audience", type: "text", required: true },
      { id: "tone", label: "Tone", type: "text", required: false },
      { id: "autonomy", label: "Autonomy level", type: "select", required: true },
      { id: "boundaries", label: "Role boundaries", type: "list", required: true },
    ],
    publicSafetyNotes: commonSafetyNotes,
    relatedArtifacts: ["agent-manifest", "system-task-prompt", "guardrails-governance-policy"],
  },
  {
    id: "operating-principles",
    bucket: "operating-style",
    name: "Operating principles",
    description:
      "Captures durable behavior principles for how the agent should reason, communicate, escalate, and handle uncertainty.",
    lifecycleStage: "design-time",
    exampleFilenames: ["principles.md", "operating-principles.md"],
    learningGoals: [
      "Turn vague style preferences into explicit operating guidance.",
      "Define escalation and uncertainty behavior.",
      "Keep principles stable across prompts and task flows.",
    ],
    fields: [
      { id: "principles", label: "Principles", type: "list", required: true },
      { id: "decisionRules", label: "Decision rules", type: "list", required: false },
      { id: "escalationRules", label: "Escalation rules", type: "list", required: false },
      { id: "communicationStyle", label: "Communication style", type: "textarea", required: false },
    ],
    publicSafetyNotes: commonSafetyNotes,
    relatedArtifacts: ["role-profile", "system-task-prompt", "guardrails-governance-policy"],
  },
  {
    id: "skill-module",
    bucket: "capability-modules",
    name: "Skill module",
    description:
      "Defines a reusable capability, when it should be used, required inputs, steps, and expected outputs.",
    lifecycleStage: "design-time",
    exampleFilenames: ["SKILL.md", "skills/research/SKILL.md"],
    learningGoals: [
      "Model a capability as a reusable module.",
      "Document activation criteria and required inputs.",
      "Connect capability behavior to tools, resources, and outputs.",
    ],
    fields: [
      { id: "skillName", label: "Skill name", type: "text", required: true },
      { id: "trigger", label: "When to use", type: "textarea", required: true },
      { id: "inputs", label: "Required inputs", type: "list", required: true },
      { id: "workflow", label: "Workflow steps", type: "list", required: true },
      { id: "outputs", label: "Expected outputs", type: "list", required: true },
    ],
    publicSafetyNotes: commonSafetyNotes,
    relatedArtifacts: ["tool-spec", "resource-manifest", "output-schema"],
  },
  {
    id: "tool-spec",
    bucket: "tools",
    name: "Tool spec",
    description:
      "Defines callable tool surfaces, parameters, permissions, failure modes, and safety constraints.",
    lifecycleStage: "design-time",
    exampleFilenames: ["tools.yaml", "tool-spec.md"],
    learningGoals: [
      "Describe tool capabilities without exposing private endpoints.",
      "Define inputs, outputs, permissions, and error behavior.",
      "Separate tool definitions from capability modules that use them.",
    ],
    fields: [
      { id: "toolName", label: "Tool name", type: "text", required: true },
      { id: "purpose", label: "Purpose", type: "textarea", required: true },
      { id: "parameters", label: "Parameters", type: "key-value-list", required: true },
      { id: "permissions", label: "Permissions", type: "list", required: true },
      { id: "failureModes", label: "Failure modes", type: "list", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Use placeholder endpoints and synthetic parameter examples.",
    ],
    relatedArtifacts: ["skill-module", "guardrails-governance-policy", "runtime-config"],
  },
  {
    id: "resource-manifest",
    bucket: "knowledge-and-resources",
    name: "Resource manifest",
    description:
      "Lists knowledge sources, reference materials, retrieval boundaries, and freshness expectations.",
    lifecycleStage: "design-time",
    exampleFilenames: ["resources.yaml", "resources.md"],
    learningGoals: [
      "Identify what knowledge the agent may use.",
      "Document source boundaries and freshness expectations.",
      "Keep resources distinct from memory stores.",
    ],
    fields: [
      { id: "resourceName", label: "Resource name", type: "text", required: true },
      { id: "resourceType", label: "Resource type", type: "select", required: true },
      { id: "allowedUse", label: "Allowed use", type: "textarea", required: true },
      { id: "freshness", label: "Freshness expectations", type: "text", required: false },
      { id: "accessNotes", label: "Access notes", type: "textarea", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Do not reference private repositories, internal documents, or private data sources.",
    ],
    relatedArtifacts: ["skill-module", "memory-policy", "guardrails-governance-policy"],
  },
  {
    id: "system-task-prompt",
    bucket: "prompts-and-interfaces",
    name: "System/task prompt",
    description:
      "Defines model-facing instructions for system behavior, task execution, constraints, and response expectations.",
    lifecycleStage: "design-time",
    exampleFilenames: ["PROMPT.md", "system-prompt.md", "task-prompt.md"],
    learningGoals: [
      "Separate prompt instructions from identity and policy artifacts.",
      "Write clear task constraints and output expectations.",
      "Map prompt behavior to related guardrails and schemas.",
    ],
    fields: [
      { id: "promptPurpose", label: "Prompt purpose", type: "textarea", required: true },
      { id: "instructions", label: "Instructions", type: "list", required: true },
      { id: "constraints", label: "Constraints", type: "list", required: true },
      { id: "inputs", label: "Inputs", type: "list", required: false },
      { id: "responseFormat", label: "Response format", type: "textarea", required: false },
    ],
    publicSafetyNotes: commonSafetyNotes,
    relatedArtifacts: ["role-profile", "operating-principles", "output-schema"],
  },
  {
    id: "interface-schema",
    bucket: "prompts-and-interfaces",
    name: "Interface schema",
    description:
      "Defines the interaction contract between a user, agent, tool, service, or another system.",
    lifecycleStage: "design-time",
    exampleFilenames: ["INTERFACE.md", "interface.schema.json"],
    learningGoals: [
      "Describe interaction boundaries separately from prompts.",
      "Define required inputs, outputs, and error states.",
      "Keep protocol mappings as adapters to the generic interface.",
    ],
    fields: [
      { id: "interfaceName", label: "Interface name", type: "text", required: true },
      { id: "participants", label: "Participants", type: "list", required: true },
      { id: "inputs", label: "Inputs", type: "key-value-list", required: true },
      { id: "outputs", label: "Outputs", type: "key-value-list", required: true },
      { id: "errorStates", label: "Error states", type: "list", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Use generic interaction examples and placeholder protocol mappings.",
    ],
    relatedArtifacts: ["system-task-prompt", "tool-spec", "output-schema"],
  },
  {
    id: "memory-policy",
    bucket: "memory",
    name: "Memory policy",
    description:
      "Defines what may be remembered, retention rules, privacy boundaries, retrieval expectations, and user controls.",
    lifecycleStage: "design-time",
    exampleFilenames: ["MEMORY.md", "memory-policy.yaml"],
    learningGoals: [
      "Keep memory separate from workflow state.",
      "Define retention and deletion expectations.",
      "Document privacy and user-control boundaries.",
    ],
    fields: [
      { id: "memoryScope", label: "Memory scope", type: "textarea", required: true },
      { id: "allowedMemory", label: "Allowed memory", type: "list", required: true },
      { id: "disallowedMemory", label: "Disallowed memory", type: "list", required: true },
      { id: "retention", label: "Retention", type: "text", required: true },
      { id: "userControls", label: "User controls", type: "list", required: true },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Do not include real user memory, personal data, or live memory store contents.",
    ],
    relatedArtifacts: ["resource-manifest", "state-strategy", "guardrails-governance-policy"],
  },
  {
    id: "state-strategy",
    bucket: "state",
    name: "State strategy",
    description:
      "Defines how task, session, workflow, or runtime state is represented, resumed, expired, and validated.",
    lifecycleStage: "runtime",
    exampleFilenames: ["state-strategy.md", "state.schema.json"],
    learningGoals: [
      "Keep resumable state separate from long-term memory.",
      "Identify state shape, lifecycle, and expiry.",
      "Plan safe recovery from interrupted work.",
    ],
    fields: [
      { id: "stateScope", label: "State scope", type: "textarea", required: true },
      { id: "stateFields", label: "State fields", type: "key-value-list", required: true },
      { id: "lifecycle", label: "Lifecycle", type: "textarea", required: true },
      { id: "expiry", label: "Expiry rules", type: "text", required: false },
      { id: "recovery", label: "Recovery behavior", type: "textarea", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Use synthetic state examples only; never include production state snapshots.",
      runtimeSafetyNote,
    ],
    relatedArtifacts: ["memory-policy", "plan-record", "runtime-config"],
  },
  {
    id: "plan-record",
    bucket: "planning-and-orchestration",
    name: "Plan record",
    description:
      "Captures intended work, steps, dependencies, assumptions, and progress for a task or workflow.",
    lifecycleStage: "runtime",
    exampleFilenames: ["PLAN.md", "plan-record.md"],
    learningGoals: [
      "Represent plans as explicit artifacts.",
      "Track assumptions and dependencies.",
      "Separate intended work from handoff contracts and iteration notes.",
    ],
    fields: [
      { id: "goal", label: "Goal", type: "textarea", required: true },
      { id: "steps", label: "Steps", type: "list", required: true },
      { id: "dependencies", label: "Dependencies", type: "list", required: false },
      { id: "assumptions", label: "Assumptions", type: "list", required: false },
      { id: "status", label: "Status", type: "select", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      runtimeSafetyNote,
    ],
    relatedArtifacts: ["handoff-contract", "state-strategy", "iteration-changelog-note"],
  },
  {
    id: "handoff-contract",
    bucket: "planning-and-orchestration",
    name: "Handoff contract",
    description:
      "Defines how context, ownership, next actions, constraints, and acceptance criteria transfer between agents or people.",
    lifecycleStage: "runtime",
    exampleFilenames: ["HANDOFFS.md", "handoff.schema.json"],
    learningGoals: [
      "Make transfer of work explicit.",
      "Define required context and acceptance criteria.",
      "Keep handoffs distinct from plans.",
    ],
    fields: [
      { id: "handoffName", label: "Handoff name", type: "text", required: true },
      { id: "sender", label: "Sender", type: "text", required: true },
      { id: "receiver", label: "Receiver", type: "text", required: true },
      { id: "contextPackage", label: "Context package", type: "list", required: true },
      { id: "acceptanceCriteria", label: "Acceptance criteria", type: "list", required: true },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Do not include real customer, employee, ticket, or incident details.",
      runtimeSafetyNote,
    ],
    relatedArtifacts: ["plan-record", "state-strategy", "interface-schema"],
  },
  {
    id: "guardrails-governance-policy",
    bucket: "guardrails-and-governance",
    name: "Guardrails/governance policy",
    description:
      "Defines safety boundaries, approvals, prohibited behavior, escalation paths, and governance expectations.",
    lifecycleStage: "design-time",
    exampleFilenames: ["GUARDRAILS.md", "approval-rules.yaml"],
    learningGoals: [
      "Translate safety requirements into explicit rules.",
      "Define approval and escalation paths.",
      "Connect policies to tools, prompts, and runtime behavior.",
    ],
    fields: [
      { id: "policyScope", label: "Policy scope", type: "textarea", required: true },
      { id: "allowedActions", label: "Allowed actions", type: "list", required: true },
      { id: "prohibitedActions", label: "Prohibited actions", type: "list", required: true },
      { id: "approvalRules", label: "Approval rules", type: "list", required: false },
      { id: "escalation", label: "Escalation", type: "textarea", required: false },
    ],
    publicSafetyNotes: commonSafetyNotes,
    relatedArtifacts: ["tool-spec", "system-task-prompt", "runtime-config"],
  },
  {
    id: "output-schema",
    bucket: "outputs-and-schemas",
    name: "Output schema",
    description:
      "Defines the structure, required fields, constraints, and examples for generated outputs.",
    lifecycleStage: "design-time",
    exampleFilenames: ["output.schema.json", "OUTPUT.md"],
    learningGoals: [
      "Make generated outputs predictable.",
      "Separate output shape from prompt wording.",
      "Connect schemas to eval rubrics and interface contracts.",
    ],
    fields: [
      { id: "schemaName", label: "Schema name", type: "text", required: true },
      { id: "format", label: "Format", type: "select", required: true },
      { id: "requiredFields", label: "Required fields", type: "key-value-list", required: true },
      { id: "constraints", label: "Constraints", type: "list", required: false },
      { id: "exampleOutput", label: "Synthetic example output", type: "textarea", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Examples must be synthetic and must not resemble real records.",
    ],
    relatedArtifacts: ["interface-schema", "system-task-prompt", "eval-rubric"],
  },
  {
    id: "eval-rubric",
    bucket: "evaluation-and-observability",
    name: "Eval rubric",
    description:
      "Defines criteria, scoring guidance, test cases, and observation points for assessing agent behavior or outputs.",
    lifecycleStage: "iteration",
    exampleFilenames: ["eval-rubric.md", "eval-cases.yaml", "trace.schema.json"],
    learningGoals: [
      "Define quality before optimizing behavior.",
      "Connect expected outputs to measurable criteria.",
      "Keep observability examples synthetic and public-safe.",
    ],
    fields: [
      { id: "evalGoal", label: "Evaluation goal", type: "textarea", required: true },
      { id: "criteria", label: "Criteria", type: "list", required: true },
      { id: "scoring", label: "Scoring guidance", type: "textarea", required: true },
      { id: "testCases", label: "Synthetic test cases", type: "list", required: false },
      { id: "observabilityNotes", label: "Observability notes", type: "textarea", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Do not include real traces, logs, transcripts, or incident records.",
    ],
    relatedArtifacts: ["output-schema", "guardrails-governance-policy", "iteration-changelog-note"],
  },
  {
    id: "runtime-config",
    bucket: "runtime-and-deployment",
    name: "Runtime config",
    description:
      "Defines deployment assumptions, environment settings, operational limits, and runtime dependencies.",
    lifecycleStage: "runtime",
    exampleFilenames: ["RUNTIME.md", "runtime-config.yaml"],
    learningGoals: [
      "Separate runtime settings from design-time intent.",
      "Document operational limits and dependencies.",
      "Use placeholders for environment-specific values.",
    ],
    fields: [
      { id: "runtimeName", label: "Runtime name", type: "text", required: true },
      { id: "environment", label: "Environment", type: "text", required: true },
      { id: "dependencies", label: "Dependencies", type: "list", required: false },
      { id: "limits", label: "Operational limits", type: "list", required: false },
      { id: "configuration", label: "Configuration placeholders", type: "key-value-list", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Use placeholders for endpoints, credentials, regions, and account identifiers.",
      runtimeSafetyNote,
    ],
    relatedArtifacts: ["agent-manifest", "tool-spec", "state-strategy"],
  },
  {
    id: "iteration-changelog-note",
    bucket: "learning-and-iteration",
    name: "Iteration/changelog note",
    description:
      "Records what changed, why it changed, what was learned, and what should be revisited next.",
    lifecycleStage: "iteration",
    exampleFilenames: ["ITERATION.md", "CHANGELOG.md", "iteration-note.md"],
    learningGoals: [
      "Turn learning into explicit follow-up artifacts.",
      "Separate iteration notes from runtime state.",
      "Connect eval findings to catalog or generated artifact changes.",
    ],
    fields: [
      { id: "changeSummary", label: "Change summary", type: "textarea", required: true },
      { id: "reason", label: "Reason", type: "textarea", required: true },
      { id: "evidence", label: "Evidence", type: "list", required: false },
      { id: "followUps", label: "Follow-ups", type: "list", required: false },
      { id: "affectedArtifacts", label: "Affected artifacts", type: "list", required: false },
    ],
    publicSafetyNotes: [
      ...commonSafetyNotes,
      "Summarize lessons without copying private logs, traces, or user content.",
    ],
    relatedArtifacts: ["eval-rubric", "plan-record", "guardrails-governance-policy"],
  },
];

export default {
  artifactCatalogVersion,
  sourceTaxonomy,
  taxonomyBuckets,
  lifecycleStages,
  artifactCatalog,
};
