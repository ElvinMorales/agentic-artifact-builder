import {
  appendList,
  appendMarkdownSection,
  appendYamlBlock,
  appendYamlKeyValueList,
  appendYamlList,
  appendYamlScalar,
  cleanText,
  parseKeyValueLines,
  slugify,
  splitLines,
} from "./rendererUtils.js";

export const artifactRenderers = {
  "agent-manifest": renderAgentManifest,
  "role-profile": renderRoleProfile,
  "operating-principles": renderOperatingPrinciples,
  "skill-module": renderSkillModule,
  "tool-spec": renderToolSpec,
  "resource-manifest": renderResourceManifest,
  "system-task-prompt": renderSystemTaskPrompt,
  "interface-schema": renderInterfaceSchema,
  "memory-policy": renderMemoryPolicy,
  "state-strategy": renderStateStrategy,
  "plan-record": renderPlanRecord,
  "handoff-contract": renderHandoffContract,
  "guardrails-governance-policy": renderGuardrailsGovernancePolicy,
  "output-schema": renderOutputSchema,
  "eval-rubric": renderEvalRubric,
  "runtime-config": renderRuntimeConfig,
  "iteration-changelog-note": renderIterationChangelogNote,
};

export const artifactDownloadFilenames = {
  "agent-manifest": "agent.yaml",
  "role-profile": "persona.md",
  "operating-principles": "principles.md",
  "skill-module": "SKILL.md",
  "tool-spec": "tools.yaml",
  "resource-manifest": "resources.yaml",
  "system-task-prompt": "PROMPT.md",
  "interface-schema": "INTERFACE.md",
  "memory-policy": "MEMORY.md",
  "state-strategy": "state-strategy.md",
  "plan-record": "PLAN.md",
  "handoff-contract": "HANDOFFS.md",
  "guardrails-governance-policy": "GUARDRAILS.md",
  "output-schema": "OUTPUT.md",
  "eval-rubric": "eval-rubric.md",
  "runtime-config": "RUNTIME.md",
  "iteration-changelog-note": "CHANGELOG.md",
};

function renderAgentManifest(artifact, values) {
  const agentName = cleanText(values.agentName, "Starter agent");
  const lines = [];

  appendYamlScalar(lines, "id", slugify(agentName, "starter-agent"));
  appendYamlScalar(lines, "name", agentName);
  appendYamlBlock(lines, "description", values.purpose);
  appendYamlBlock(lines, "scope", values.scope);
  appendYamlList(lines, "owners", values.owners);
  appendYamlList(lines, "related_systems", values.relatedSystems);
  lines.push("model:");
  appendYamlScalar(lines, "reference", "model-profile-placeholder", 2);
  appendYamlList(lines, "capability_references", ["skill-module"], 0);
  appendYamlList(lines, "tool_references", ["tools.yaml"], 0);
  appendYamlList(lines, "resource_references", ["resources.yaml"], 0);
  appendYamlList(lines, "policy_references", ["guardrails-governance-policy"], 0);
  appendYamlList(lines, "output_schema_references", ["output-schema"], 0);
  lines.push("review:");
  appendYamlScalar(lines, "cadence", "Review before each public release or major scope change.", 2);
  appendYamlScalar(lines, "version", "0.1.0", 2);
  appendYamlScalar(lines, "lifecycle_stage", artifact.lifecycleStage);
  appendYamlScalar(lines, "canonical_bucket", artifact.bucket);

  return finish(lines);
}

function renderRoleProfile(artifact, values) {
  const lines = [`# ${cleanText(values.role, artifact.name)}`, ""];

  appendMarkdownSection(lines, "Mission", `${cleanText(values.role, "Starter role")} for ${cleanText(values.audience, "intended users")}.`);
  appendMarkdownSection(lines, "Intended Users", values.audience);
  appendMarkdownSection(lines, "In Scope", splitLines(values.boundaries).map((item) => `Operate within this boundary: ${item}`));
  appendMarkdownSection(lines, "Out Of Scope", [
    "Making commitments or decisions outside the documented role.",
    "Using private, regulated, proprietary, or production data in public examples.",
    "Changing tool permissions or runtime behavior without a related artifact update.",
  ]);
  appendMarkdownSection(lines, "Success Criteria", [
    "The role is clear to the intended users.",
    "Autonomy expectations are explicit.",
    "The profile can be referenced by prompts, guardrails, and reviews.",
  ]);
  appendMarkdownSection(lines, "Handoff Boundary", [
    `Autonomy level: ${cleanText(values.autonomy)}`,
    "Escalate when the request exceeds the role, requires private context, or needs accountable human review.",
  ]);
  appendMarkdownSection(lines, "Tone And Style Notes", values.tone);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderOperatingPrinciples(artifact, values) {
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Core Principles", splitLines(values.principles));
  appendMarkdownSection(lines, "Decision Rules", splitLines(values.decisionRules));
  appendMarkdownSection(lines, "Uncertainty Policy", [
    "State assumptions when information is incomplete.",
    "Ask for clarification when missing context changes the expected artifact.",
    "Avoid inventing private facts, production details, or unsupported taxonomy changes.",
  ]);
  appendMarkdownSection(lines, "Citation And Source Posture", [
    "Use the taxonomy as the conceptual source of truth.",
    "Treat protocol mappings as implementation examples, not replacement categories.",
    "Prefer public, generic references unless a later private adaptation is explicitly approved outside this public repo.",
  ]);
  appendMarkdownSection(lines, "Escalation Rules", splitLines(values.escalationRules));
  appendMarkdownSection(lines, "Tone And Style Notes", values.communicationStyle);
  appendMarkdownSection(lines, "Public-Safety Notes", artifact.publicSafetyNotes);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderSkillModule(artifact, values) {
  const skillName = cleanText(values.skillName, "starter-skill");
  const lines = [
    "---",
    `name: ${JSON.stringify(slugify(skillName, "starter-skill"))}`,
    `description: ${JSON.stringify(cleanText(values.trigger, "Reusable public-safe capability module."))}`,
    "---",
    "",
    `# ${skillName}`,
    "",
  ];

  appendMarkdownSection(lines, "When To Use", values.trigger);
  appendMarkdownSection(lines, "Required Inputs", splitLines(values.inputs));
  appendMarkdownSection(
    lines,
    "Workflow",
    splitLines(values.workflow)
      .map((step, index) => `${index + 1}. ${step}`)
      .join("\n")
  );
  appendMarkdownSection(lines, "Tools Used", ["Reference only tools declared in tool-spec artifacts such as tools.yaml."]);
  appendMarkdownSection(lines, "Resources Used", ["Reference only public-safe resources declared in resource-manifest artifacts."]);
  appendMarkdownSection(lines, "Guardrails", artifact.publicSafetyNotes);
  appendMarkdownSection(lines, "Output Contract", splitLines(values.outputs));
  appendMarkdownSection(lines, "Failure Modes", [
    "Required inputs are missing or unclear.",
    "The task requires private, regulated, or proprietary context.",
    "A needed tool or resource is not declared in a related artifact.",
  ]);
  appendMarkdownSection(lines, "Examples", [
    "Input: a generic topic, audience level, and desired artifact type.",
    "Output: a concise starter artifact draft plus related artifact reminders.",
  ]);

  return finish(lines);
}

function renderToolSpec(artifact, values) {
  const lines = ["tools:"];

  lines.push("  -");
  appendYamlScalar(lines, "name", slugify(values.toolName, "starter-tool"), 4);
  appendYamlBlock(lines, "description", values.purpose, 4);
  appendYamlKeyValueList(lines, "input_schema", values.parameters, 4);
  lines.push("    output_schema:");
  appendYamlScalar(lines, "status", "success | error", 6);
  appendYamlScalar(lines, "result", "Synthetic tool result or public-safe metadata.", 6);
  appendYamlList(lines, "side_effects", ["No external writes in this starter spec."], 4);
  appendYamlList(lines, "permissions", values.permissions, 4);
  appendYamlScalar(lines, "approval_required", "Required before adding network, filesystem, account, or irreversible side effects.", 4);
  appendYamlList(lines, "failure_modes", values.failureModes, 4);
  appendYamlList(lines, "safety_notes", artifact.publicSafetyNotes, 4);

  return finish(lines);
}

function renderResourceManifest(artifact, values) {
  const resourceName = cleanText(values.resourceName, "Starter resource");
  const lines = ["resources:", "  -"];

  appendYamlScalar(lines, "id", slugify(resourceName, "starter-resource"), 4);
  appendYamlScalar(lines, "title", resourceName, 4);
  appendYamlScalar(lines, "type", values.resourceType, 4);
  appendYamlScalar(lines, "uri", "public-or-local-placeholder://resource", 4);
  appendYamlScalar(lines, "owner", "Public example maintainer", 4);
  appendYamlScalar(lines, "priority", "supporting", 4);
  appendYamlBlock(lines, "allowed_use", values.allowedUse, 4);
  appendYamlScalar(lines, "freshness_policy", cleanText(values.freshness, "Review on a regular public release cadence."), 4);
  appendYamlBlock(lines, "access_notes", values.accessNotes, 4);
  appendYamlScalar(lines, "license_or_usage_notes", "Use only public-safe material with clear reuse permission.", 4);
  appendYamlList(lines, "public_safety_notes", artifact.publicSafetyNotes, 4);

  return finish(lines);
}

function renderSystemTaskPrompt(artifact, values) {
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Purpose", values.promptPurpose);
  appendMarkdownSection(lines, "Role", "Follow the related role profile and operating principles for the selected agent design.");
  appendMarkdownSection(lines, "Inputs", splitLines(values.inputs));
  appendMarkdownSection(lines, "Instructions", splitLines(values.instructions));
  appendMarkdownSection(lines, "Constraints", splitLines(values.constraints));
  appendMarkdownSection(lines, "Output Expectations", values.responseFormat);
  appendMarkdownSection(lines, "Clarification Behavior", [
    "Ask a focused clarification when required fields are missing.",
    "Proceed with labeled assumptions only when the output can remain useful and public-safe.",
  ]);
  appendMarkdownSection(lines, "Failure Handling", [
    "Refuse to include secrets, private data, proprietary workflows, regulated data, or production traces.",
    "Explain which field or constraint prevents a safe starter artifact.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderInterfaceSchema(artifact, values) {
  const inputs = parseKeyValueLines(values.inputs);
  const outputs = parseKeyValueLines(values.outputs);
  const lines = [`# ${cleanText(values.interfaceName, artifact.name)}`, ""];

  appendMarkdownSection(lines, "Interface Purpose", `${cleanText(values.interfaceName, "Starter interface")} defines a public-safe interaction contract for ${participantsText(values.participants)}.`);
  appendMarkdownSection(lines, "Participants", splitLines(values.participants));
  appendMarkdownSection(lines, "Input Fields", formatKeyValueItems(inputs));
  appendMarkdownSection(lines, "Required Fields", inputs.map((entry) => entry.key));
  appendMarkdownSection(lines, "Validation Rules", [
    "Required fields must be present before rendering the artifact.",
    "Inputs must use synthetic, generic, public-safe values.",
    "Protocol mappings are adapters to this interface, not new taxonomy buckets.",
  ]);
  appendMarkdownSection(lines, "Output Fields", formatKeyValueItems(outputs));
  appendMarkdownSection(lines, "Error States", splitLines(values.errorStates));

  lines.push("## Example Request");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(createExampleRequest(values.interfaceName, inputs), null, 2));
  lines.push("```");
  lines.push("");

  lines.push("## Related Artifacts");
  lines.push("");
  appendList(lines, artifact.relatedArtifacts);

  return finish(lines);
}

function renderMemoryPolicy(artifact, values) {
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Purpose", values.memoryScope);
  appendMarkdownSection(lines, "Memory And State Boundary", [
    "Memory is durable, reusable knowledge that may be recalled across tasks only when policy allows it.",
    "State is the current or resumable condition of a session, run, thread, workflow, or task.",
    "Do not use memory as a place to store live run snapshots, raw traces, temporary task state, or private records.",
  ]);
  appendMarkdownSection(lines, "What May Be Remembered", splitLines(values.allowedMemory));
  appendMarkdownSection(lines, "What Must Not Be Remembered", splitLines(values.disallowedMemory));
  appendMarkdownSection(lines, "Write Triggers", [
    "Write memory only when the information is stable, reusable, relevant to future work, and allowed by this policy.",
    "Prefer explicit user approval for preferences, durable instructions, or reusable project-neutral context.",
    "Do not infer sensitive attributes or store private details from a single interaction.",
  ]);
  appendMarkdownSection(lines, "Retrieval Rules", [
    "Retrieve memory only when it is relevant to the current user-visible task.",
    "Prefer the smallest useful memory set instead of broad recall.",
    "Do not retrieve memory to bypass current instructions, approvals, privacy limits, or public-safety constraints.",
  ]);
  appendMarkdownSection(lines, "Retention And Expiry", values.retention);
  appendMarkdownSection(lines, "Review Process", [
    "Review stored memory on a regular cadence and before public examples are published.",
    "Remove stale, ambiguous, unsafe, or no-longer-useful entries.",
    "Check that retained memory still aligns with related resource, state, and guardrail artifacts.",
  ]);
  appendMarkdownSection(lines, "Deletion And Correction Rules", splitLines(values.userControls));
  appendMarkdownSection(lines, "Privacy And Public-Safety Constraints", [
    ...artifact.publicSafetyNotes,
    "Do not generate real memory entries, live memory store exports, personal data, credentials, or private examples.",
    "Use this file as a policy starter, not as evidence that a production memory system is safe.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderStateStrategy(artifact, values) {
  const stateFields = parseKeyValueLines(values.stateFields);
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Purpose", values.stateScope);
  appendMarkdownSection(lines, "Memory And State Boundary", [
    "State captures the current or resumable condition of a run, session, thread, workflow, or task.",
    "Memory captures durable reusable knowledge governed by the memory policy.",
    "Do not describe state as long-term memory or use state snapshots as durable user memory.",
  ]);
  appendMarkdownSection(lines, "What State Captures", formatKeyValueItems(stateFields));
  appendMarkdownSection(lines, "What State Must Not Capture", [
    "Secrets, credentials, account identifiers, private endpoints, regulated data, or proprietary workflow details.",
    "Raw production logs, live traces, unsanitized transcripts, or private memory store contents.",
    "Information that belongs in the memory policy, resource manifest, or iteration notes instead of current run state.",
  ]);
  appendMarkdownSection(lines, "Session And Thread State", [
    "Keep only the fields needed to continue the visible workflow.",
    "Use synthetic identifiers in public examples, such as example-session-001 or example-run-001.",
    "Clear or replace state when the user resets the workflow or starts a clearly separate task.",
  ]);
  appendMarkdownSection(lines, "Run-State Snapshot Strategy", values.lifecycle);
  appendMarkdownSection(lines, "Workspace And Sandbox Snapshot Posture", [
    "Treat filesystem, tool, browser, and sandbox details as runtime context, not durable memory.",
    "Commit only sanitized schemas or strategy notes to the public repository.",
    "Do not commit live state snapshots, raw command logs, private paths, or unsanitized runtime outputs.",
  ]);
  appendMarkdownSection(lines, "Resume And Retry Behavior", values.recovery);
  appendMarkdownSection(lines, "Expiry Rules", values.expiry);
  appendMarkdownSection(lines, "Approval And Interruption Handling", [
    "Record whether a user-visible task is waiting, blocked, approved, declined, or complete.",
    "Do not treat an interrupted action as approved after resume.",
    "Retry only from a documented safe checkpoint and preserve visible status for review.",
  ]);
  appendMarkdownSection(lines, "Public Repo Posture", [
    ...artifact.publicSafetyNotes,
    "Public examples may show schemas, field names, and synthetic values only.",
    "Live state snapshots and raw runtime data should not be committed publicly unless fully sanitized.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderPlanRecord(artifact, values) {
  const steps = splitLines(values.steps)
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\n");
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Goal", values.goal);
  appendMarkdownSection(lines, "Scope", [
    "Capture the user-visible plan, operational steps, dependencies, and status for the current task or workflow.",
    "Keep this as a planning and orchestration artifact under the canonical taxonomy bucket.",
    "Do not ask for or include private hidden reasoning; record visible decisions and next actions only.",
  ]);
  appendMarkdownSection(lines, "Assumptions", splitLines(values.assumptions));
  appendMarkdownSection(lines, "Steps", steps);
  appendMarkdownSection(lines, "Dependencies", splitLines(values.dependencies));
  appendMarkdownSection(lines, "Decision Points", [
    "Clarify scope when required fields, inputs, or acceptance criteria are missing.",
    "Ask for approval before actions with external side effects, private data exposure, or irreversible changes.",
    "Reconfirm taxonomy placement when a plan appears to cross artifact boundaries.",
  ]);
  appendMarkdownSection(lines, "Status Model", [
    `Current status: ${cleanText(values.status)}`,
    "Suggested states: not started, in progress, blocked, waiting for approval, ready for review, done.",
    "Status should describe observable progress, not private reasoning.",
  ]);
  appendMarkdownSection(lines, "Replanning Triggers", [
    "Goal, scope, or acceptance criteria changes.",
    "A dependency is unavailable or unsafe to use.",
    "A step reveals missing approval, missing context, or a public-safety concern.",
  ]);
  appendMarkdownSection(lines, "Completion Criteria", [
    "All visible steps are complete or intentionally deferred.",
    "Required artifacts are updated and internally consistent.",
    "Safety constraints are satisfied and related artifacts are named.",
  ]);
  appendMarkdownSection(lines, "Risks", [
    "Treating the plan as hidden chain-of-thought instead of a user-visible coordination artifact.",
    "Confusing temporary run state with durable memory.",
    "Skipping approval or review when the plan changes authority, tools, or data handling.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderHandoffContract(artifact, values) {
  const handoffName = cleanText(values.handoffName, artifact.name);
  const lines = [`# ${handoffName}`, ""];

  appendMarkdownSection(lines, "Purpose", `${handoffName} defines a framework-neutral transfer of context, responsibility, and next actions between roles.`);
  appendMarkdownSection(lines, "Canonical Bucket", [
    "This is a builder flow under Planning and orchestration.",
    "Protocol surfaces such as MCP tools, A2A Agent Cards, workflow graphs, or vendor-specific agents are mappings or adapters, not replacement taxonomy buckets.",
  ]);
  appendMarkdownSection(lines, "Source Agent Or Role", values.sender);
  appendMarkdownSection(lines, "Target Agent Or Role", values.receiver);
  appendMarkdownSection(lines, "When To Hand Off", [
    "The source role has completed its scoped work or reached an explicit transfer point.",
    "The next action requires a different role, authority boundary, tool permission, or review posture.",
    "The source role is blocked and the target role is responsible for resolution or triage.",
  ]);
  appendMarkdownSection(lines, "Required Handoff Payload", splitLines(values.contextPackage));
  appendMarkdownSection(lines, "Authority Boundary", [
    "The source role transfers only the authority explicitly described in this contract.",
    "The target role must follow its own role profile, tool permissions, guardrails, and approval requirements.",
    "A handoff does not grant access to private data, new tools, or external side effects by default.",
  ]);
  appendMarkdownSection(lines, "Tool And Resource Access Changes", [
    "List any changed tool, resource, or workspace access in a related tool spec, resource manifest, or runtime config.",
    "Use placeholder references in public examples.",
    "Do not include private endpoints, account ids, credentials, or internal system names.",
  ]);
  appendMarkdownSection(lines, "Approval Requirements", [
    "Require explicit approval before changing authority, adding side effects, accessing private context, or publishing outputs.",
    "Preserve declined or missing approvals as visible status rather than assuming consent.",
    "Escalate when acceptance criteria conflict with guardrails or public-safety constraints.",
  ]);
  appendMarkdownSection(lines, "Failure And Fallback Behavior", [
    "If the payload is incomplete, request the missing fields or return to the source role.",
    "If the target role lacks required authority, pause and request approval or reassignment.",
    "If safety constraints are unclear, use a synthetic placeholder and document the open question.",
  ]);
  appendMarkdownSection(lines, "Acceptance Criteria", splitLines(values.acceptanceCriteria));
  appendMarkdownSection(lines, "Audit And Trace Notes", [
    "Record handoff status, payload completeness, approvals, and follow-up actions with synthetic public-safe examples.",
    "Do not commit raw runtime traces, private logs, customer details, employee data, or unsanitized transcripts.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderGuardrailsGovernancePolicy(artifact, values) {
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Purpose", values.policyScope);
  appendMarkdownSection(lines, "Safety Goals", [
    "Make allowed, disallowed, approval, and escalation behavior explicit before implementation.",
    "Keep governance rules separate from prompts, runtime configuration, and output contracts.",
    "Support public-safe learning examples without claiming production assurance.",
  ]);
  appendMarkdownSection(lines, "Allowed Behavior", splitLines(values.allowedActions));
  appendMarkdownSection(lines, "Disallowed Behavior", splitLines(values.prohibitedActions));
  appendMarkdownSection(lines, "Approval Rules", splitLines(values.approvalRules));
  appendMarkdownSection(lines, "Escalation Rules", [
    cleanText(values.escalation),
    "Pause when a request introduces private data, regulated data, credentials, production traces, irreversible actions, or unclear authority.",
    "Route unclear policy conflicts to an accountable reviewer before continuing.",
  ]);
  appendMarkdownSection(lines, "Data Handling Rules", [
    "Use synthetic, generic examples in public artifacts.",
    "Do not include secrets, credentials, account ids, private endpoints, regulated data, proprietary workflows, unsanitized logs, or real runtime traces.",
    "Use placeholders for environment-specific values and explain what a private deployment must review separately.",
  ]);
  appendMarkdownSection(lines, "Tool And Action Boundaries", [
    "Only use tools declared in related tool specs and allowed by the runtime posture.",
    "Require explicit approval before enabling external writes, account changes, network calls, or irreversible operations.",
    "Treat protocol mappings as adapters to this policy, not replacements for the taxonomy bucket.",
  ]);
  appendMarkdownSection(lines, "Auditability And Review Expectations", [
    "Record policy changes in an iteration or changelog note.",
    "Review this policy before publishing examples, adding tool permissions, changing runtime assumptions, or expanding output contracts.",
    "Use synthetic review notes only; do not paste private logs, traces, transcripts, or incident records.",
  ]);
  appendMarkdownSection(lines, "Public-Safety Notes", artifact.publicSafetyNotes);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderOutputSchema(artifact, values) {
  const requiredFields = parseKeyValueLines(values.requiredFields);
  const schemaName = cleanText(values.schemaName, artifact.name);
  const lines = [`# ${schemaName}`, ""];

  appendMarkdownSection(lines, "Purpose", `${schemaName} defines the generated output contract. It describes required data shape, validation expectations, and failure handling rather than only prose formatting preferences.`);
  appendMarkdownSection(lines, "Output Contract", [
    `Preferred format: ${cleanText(values.format, "Markdown")}`,
    "The renderer, prompt, interface, and evaluation rubric should agree on this contract.",
    "Adapters may map this contract to JSON, Markdown, YAML, or plain text without changing the taxonomy bucket.",
  ]);
  appendMarkdownSection(lines, "Required Fields", formatKeyValueItems(requiredFields));
  appendMarkdownSection(lines, "Optional Fields", [
    "related_artifacts: Artifact ids or filenames that the generated output depends on.",
    "assumptions: Labeled assumptions used to keep the starter output useful and public-safe.",
    "review_notes: Synthetic reviewer notes for learning and iteration.",
  ]);
  appendMarkdownSection(lines, "Validation Expectations", [
    "Required fields must be present and non-empty.",
    "Generated examples must remain synthetic, generic, and public-safe.",
    "The output must not include secrets, private data, regulated data, production state, raw logs, or real traces.",
    ...splitLines(values.constraints),
  ]);

  lines.push("## JSON Schema Example");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(createOutputJsonSchema(schemaName, requiredFields), null, 2));
  lines.push("```");
  lines.push("");

  lines.push("## Example JSON Output");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(createOutputExample(values, requiredFields), null, 2));
  lines.push("```");
  lines.push("");

  appendMarkdownSection(lines, "Failure Handling", [
    "Return a validation error when required fields are missing or unsafe values are requested.",
    "Ask for clarification when the requested output contract conflicts with related guardrails or interface expectations.",
    "Use placeholders instead of real private values when demonstrating the schema publicly.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderEvalRubric(artifact, values) {
  const lines = [`# ${artifact.name}`, ""];

  appendMarkdownSection(lines, "Evaluation Purpose", values.evalGoal);
  appendMarkdownSection(lines, "Scope", [
    "Evaluate the selected agent artifact, generated output, or workflow behavior against documented criteria.",
    "Use synthetic scenarios and public-safe reviewer notes only.",
    "Keep evaluation criteria distinct from runtime configuration and iteration notes, while linking findings to both when useful.",
  ]);
  appendMarkdownSection(lines, "Test Cases Or Scenarios", splitLines(values.testCases));
  appendMarkdownSection(lines, "Scoring Criteria", splitLines(values.criteria));
  appendMarkdownSection(lines, "Scoring Guidance", values.scoring);
  appendMarkdownSection(lines, "Must-Pass Checks", [
    "The output maps to the correct canonical taxonomy bucket.",
    "Required fields or contract sections are present.",
    "Related artifacts are named when the output depends on policy, prompt, schema, runtime, memory, state, plan, or handoff artifacts.",
    "The example remains synthetic, generic, and free of private or regulated data.",
  ]);
  appendMarkdownSection(lines, "Regression Checks", [
    "Previously covered artifact types still render with their specialized structure.",
    "The generic fallback still renders unexpected future artifact ids.",
    "Copy, download, reset, load-example, form editing, and live preview behavior continue to work.",
  ]);
  appendMarkdownSection(lines, "Public-Safety Checks", [
    ...artifact.publicSafetyNotes,
    "Do not include real traces, logs, transcripts, incident records, user memory, production state, credentials, or private endpoints.",
  ]);
  appendMarkdownSection(lines, "Failure Examples", [
    "The output invents a new top-level taxonomy bucket.",
    "A state artifact is described as long-term memory.",
    "A schema is treated as a loose formatting preference rather than a validation contract.",
    "A runtime example includes a real credential, private URL, account id, log, or trace.",
  ]);
  appendMarkdownSection(lines, "Review Cadence", [
    cleanText(values.observabilityNotes),
    "Review the rubric before major renderer changes, new catalog entries, or public release notes.",
    "Record material evaluation findings in an iteration or changelog note.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderRuntimeConfig(artifact, values) {
  const configuration = parseKeyValueLines(values.configuration);
  const lines = [`# ${cleanText(values.runtimeName, artifact.name)}`, ""];

  appendMarkdownSection(lines, "Purpose", `${cleanText(values.runtimeName, "Starter runtime")} documents non-secret runtime assumptions, deployment posture, operational limits, and placeholder configuration for ${cleanText(values.environment, "a public-safe example environment")}.`);
  appendMarkdownSection(lines, "Model And Provider Assumptions", [
    "Model provider, model name, region, and account details are placeholders in this public starter artifact.",
    "Prompts, tools, policies, schemas, memory, and state behavior should be declared in their related artifacts.",
    "Changing providers or model profiles should trigger review of output schemas, eval rubrics, and governance rules.",
  ]);
  appendMarkdownSection(lines, "Non-Secret Settings", formatKeyValueItems(configuration));

  lines.push("## Example Runtime Configuration");
  lines.push("");
  lines.push("```yaml");
  lines.push("runtime:");
  lines.push(`  name: ${JSON.stringify(cleanText(values.runtimeName, "starter-runtime"))}`);
  lines.push(`  environment: ${JSON.stringify(cleanText(values.environment, "local-example"))}`);
  lines.push('  model_provider: "provider-placeholder"');
  lines.push('  model_reference: "model-profile-placeholder"');
  lines.push("settings:");
  appendYamlExampleSettings(lines, configuration);
  lines.push("secret_references:");
  lines.push('  - name: "EXAMPLE_API_KEY"');
  lines.push('    source: "environment-variable-placeholder"');
  lines.push('    required: "only when an approved adapter needs it"');
  lines.push("```");
  lines.push("");

  appendMarkdownSection(lines, "Environment Variables And Secret References", [
    "Use placeholders such as EXAMPLE_API_KEY, EXAMPLE_SERVICE_URL, or EXAMPLE_ACCOUNT_ID.",
    "Do not commit real credentials, private endpoints, tokens, account ids, or secret manager paths.",
    "Document which component would read a secret, but keep the actual value outside this public artifact.",
  ]);
  appendMarkdownSection(lines, "Tool Availability", [
    "Only enable tools documented in related tool-spec artifacts.",
    "Disable external writes and irreversible actions until explicitly approved in governance policy and runtime review.",
    "Use placeholder adapters for protocol-specific surfaces.",
  ]);
  appendMarkdownSection(lines, "Resource Paths", [
    "Prefer public or local placeholder paths for examples.",
    "Do not include private repository paths, private buckets, internal URLs, or production storage locations.",
  ]);
  appendMarkdownSection(lines, "Timeout And Retry Assumptions", splitLines(values.limits));
  appendMarkdownSection(lines, "Deployment Posture", [
    "This starter config describes assumptions, not a production deployment guarantee.",
    "Review policy, schema, state, memory, and eval artifacts before moving from local learning examples to any private environment.",
  ]);
  appendMarkdownSection(lines, "Local Development Notes", splitLines(values.dependencies));
  appendMarkdownSection(lines, "Public-Safety Notes", artifact.publicSafetyNotes);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);

  return finish(lines);
}

function renderIterationChangelogNote(artifact, values) {
  const lines = ["# Changelog", ""];

  appendMarkdownSection(lines, "Version And Date", [
    "Version: 0.1.0",
    "Date: YYYY-MM-DD",
    "Status: starter iteration note for review",
  ]);
  appendMarkdownSection(lines, "Summary", values.changeSummary);
  appendMarkdownSection(lines, "Changed Artifacts", splitLines(values.affectedArtifacts));
  appendMarkdownSection(lines, "Why It Changed", values.reason);
  appendMarkdownSection(lines, "Validation Performed", splitLines(values.evidence));
  appendMarkdownSection(lines, "Migration Notes", [
    "Review related prompts, schemas, policies, eval rubrics, and runtime assumptions before adapting this change privately.",
    "No migration of private memory, live state, logs, traces, or production data is represented in this public example.",
  ]);
  appendMarkdownSection(lines, "Known Limitations", [
    "This note records learning and follow-up decisions; it is not runtime state or durable memory.",
    "Evidence should summarize synthetic checks rather than copy private sessions, traces, logs, or user content.",
  ]);
  appendMarkdownSection(lines, "Follow-Up Tasks", splitLines(values.followUps));
  appendMarkdownSection(lines, "Feedback Signals", [
    "Evaluation rubric findings.",
    "Synthetic reviewer notes.",
    "Public-safe learner feedback.",
    "Observed gaps in generated starter artifacts.",
  ]);
  appendMarkdownSection(lines, "Related Artifacts", artifact.relatedArtifacts);
  appendMarkdownSection(lines, "Public-Safety Notes", artifact.publicSafetyNotes);

  return finish(lines);
}

function formatKeyValueItems(entries) {
  if (!entries.length) {
    return [];
  }

  return entries.map((entry) => `${entry.key}: ${entry.description}`);
}

function participantsText(value) {
  const participants = splitLines(value);
  return participants.length ? participants.join(", ") : "the declared participants";
}

function createExampleRequest(interfaceName, inputs) {
  return {
    interface: slugify(interfaceName, "starter-interface"),
    request_id: "example-request-001",
    inputs: Object.fromEntries(
      inputs.map((entry) => [entry.key, `Synthetic ${entry.description.toLowerCase()}`])
    ),
  };
}

function createOutputJsonSchema(schemaName, requiredFields) {
  const properties = requiredFields.length
    ? Object.fromEntries(
        requiredFields.map((entry, index) => [
          schemaFieldName(entry, index),
          createJsonSchemaProperty(entry),
        ])
      )
    : {
        summary: {
          type: "string",
          description: "Synthetic starter output summary.",
        },
      };

  return {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    title: schemaName,
    type: "object",
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
  };
}

function createOutputExample(values, requiredFields) {
  const explicitExample = parseLooseJson(values.exampleOutput);

  if (explicitExample) {
    return explicitExample;
  }

  const fields = requiredFields.length
    ? requiredFields
    : [{ key: "summary", description: "Synthetic starter output summary." }];

  return Object.fromEntries(
    fields.map((entry, index) => [
      schemaFieldName(entry, index),
      createSyntheticFieldValue(entry),
    ])
  );
}

function createJsonSchemaProperty(entry) {
  const description = entry.description;
  const lowered = description.toLowerCase();

  if (lowered.includes("list") || lowered.includes("artifacts")) {
    return {
      type: "array",
      description,
      items: {
        type: "string",
      },
    };
  }

  if (lowered.includes("count") || lowered.includes("number")) {
    return {
      type: "number",
      description,
    };
  }

  if (lowered.includes("flag") || lowered.includes("boolean")) {
    return {
      type: "boolean",
      description,
    };
  }

  return {
    type: "string",
    description,
  };
}

function createSyntheticFieldValue(entry) {
  const lowered = entry.description.toLowerCase();

  if (lowered.includes("list") || lowered.includes("artifacts")) {
    return ["Synthetic example item"];
  }

  if (lowered.includes("count") || lowered.includes("number")) {
    return 1;
  }

  if (lowered.includes("flag") || lowered.includes("boolean")) {
    return true;
  }

  return `Synthetic ${lowered}`;
}

function schemaFieldName(entry, index) {
  return slugify(entry.key, `field-${index + 1}`).replace(/-/g, "_");
}

function parseLooseJson(value) {
  const cleaned = String(value || "").trim();

  if (!cleaned || !cleaned.startsWith("{")) {
    return null;
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    return null;
  }
}

function appendYamlExampleSettings(lines, configuration) {
  if (!configuration.length) {
    lines.push('  example_setting: "placeholder-value"');
    return;
  }

  configuration.forEach((entry, index) => {
    lines.push(`  ${schemaFieldName(entry, index)}: ${JSON.stringify(entry.description)}`);
  });
}

function finish(lines) {
  return `${lines.join("\n").trim()}\n`;
}
