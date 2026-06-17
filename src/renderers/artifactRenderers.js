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
