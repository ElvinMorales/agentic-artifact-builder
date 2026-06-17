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

function finish(lines) {
  return `${lines.join("\n").trim()}\n`;
}
