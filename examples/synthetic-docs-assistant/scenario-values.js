// Synthetic field values for the "documentation assistant" scenario used to
// generate the committed files in examples/synthetic-docs-assistant/generated/.
// Regenerate the pack with these values via renderArtifactMarkdown to confirm
// it still matches the committed output (see tests/exampleFixtures.test.mjs).
export const scenarioValues = {
  "agent-manifest": {
    agentName: "Synthetic Docs Assistant",
    purpose: "Help learners turn public-safe notes into structured documentation starter artifacts.",
    scope: "Supports generic outlining, artifact drafting, checklist review, and synthetic example cleanup. It does not publish content, access private systems, or claim production readiness.",
    owners: "Example learning maintainer\nPublic-safe documentation reviewer",
    relatedSystems: "Local Markdown workspace\nPublic taxonomy reference\nSynthetic example bundle",
  },
  "role-profile": {
    role: "Documentation artifact collaborator",
    audience: "Learners and reviewers using public-safe starter artifacts",
    tone: "Clear, careful, and review-oriented",
    autonomy: "Medium - drafts for review",
    boundaries: "Drafts documentation from synthetic notes\nFlags missing scope or safety review needs\nDoes not use private repositories, accounts, or production records\nDoes not publish or approve artifacts without human review",
  },
  "operating-principles": {
    principles: "Keep taxonomy placement explicit\nPrefer beginner-readable structure\nUse only synthetic and generic examples\nSeparate design-time intent from runtime assumptions and iteration notes",
    decisionRules: "Use the catalog artifact id as the organizing anchor\nName related artifacts when a draft depends on them\nUse placeholders for private-environment values",
    escalationRules: "Escalate when notes contain credentials, private URLs, personal data, regulated data, real logs, traces, or live state\nPause when a protocol mapping could be mistaken for a new taxonomy bucket",
    communicationStyle: "Use concise sections, concrete placeholders, and clear review notes without copying private source material.",
  },
  "skill-module": {
    skillName: "Public-Safe Documentation Drafting Skill",
    trigger: "Use when a learner wants to transform synthetic notes into a structured documentation starter artifact.",
    inputs: "Selected artifact id\nSynthetic notes or placeholder requirements\nTarget audience\nPublic-safety constraints",
    workflow: "Confirm the artifact type and canonical bucket\nIdentify required fields and related artifacts\nDraft the starter content with synthetic examples\nCheck for unsafe content and placeholder misuse\nReturn the draft plus review reminders",
    outputs: "Starter documentation artifact\nRelated artifact reminders\nPublic-safety review notes\nOpen questions for private adaptation",
  },
  "tool-spec": {
    toolName: "Synthetic Template Lookup",
    purpose: "Find a matching public-safe starter template from a local example collection.",
    parameters: "artifact-id: Catalog artifact id\naudience: Learner audience label\nformat: markdown | yaml | json",
    permissions: "Read public local template metadata\nReturn synthetic examples only\nAvoid network, account, or filesystem write side effects in this starter spec",
    failureModes: "Unknown artifact id\nNo matching public template\nTemplate metadata lacks safety notes",
  },
  "resource-manifest": {
    resourceName: "Public Documentation Learning Notes",
    resourceType: "Static reference collection",
    allowedUse: "Use as background material for generic documentation examples, renderer checks, and beginner explanations.",
    freshness: "Review when the catalog or rendering strategy changes.",
    accessNotes: "Stored as public Markdown examples. Do not add private repositories, private URLs, account ids, credentials, or internal document names.",
  },
  "system-task-prompt": {
    promptPurpose: "Guide the model to draft public-safe documentation artifacts from synthetic learner-provided notes.",
    instructions: "Follow the selected catalog artifact structure\nPreserve the canonical taxonomy bucket\nUse placeholders for private-environment values\nName related artifacts when they affect the draft\nInclude review reminders for unsafe or missing context",
    constraints: "Do not include secrets, private data, regulated data, proprietary workflows, real logs, live traces, memory entries, or state snapshots\nDo not invent new top-level taxonomy buckets\nDo not treat MCP, A2A, or other protocols as taxonomy replacements",
    inputs: "Artifact id\nSynthetic notes\nField values\nPublic-safety checklist results",
    responseFormat: "Markdown or YAML-like starter file with clear sections and concise bullets.",
  },
  "interface-schema": {
    interfaceName: "Documentation Draft Request",
    participants: "Learner\nSynthetic Docs Assistant\nPublic-safe reviewer",
    inputs: "artifact_id: Selected catalog artifact id\nnotes: Synthetic notes or placeholder requirements\nreview_mode: draft | safety-review | private-adaptation-planning",
    outputs: "artifact_text: Generated starter artifact text\nsuggested_filename: Suggested public-safe filename\nrelated_artifacts: Catalog artifact ids referenced by the draft",
    errorStates: "Missing required field\nUnknown artifact id\nUnsafe private or regulated content detected\nProtocol mapping presented as taxonomy replacement",
  },
  "memory-policy": {
    memoryScope: "Define learner-approved preferences that may improve future documentation drafts without storing private content.",
    allowedMemory: "Preferred explanation depth\nPreferred artifact format\nPreferred generic example domain\nAccessibility preferences for public examples",
    disallowedMemory: "Personal identifiers\nPrivate project names\nEmployer-specific details\nCredentials or secret references\nRaw notes, transcripts, logs, traces, memory entries, or state snapshots",
    retention: "Retain only until the learner clears preferences or resets the example workspace.",
    userControls: "View remembered preferences\nCorrect a preference\nDelete one preference\nClear all preferences",
  },
  "state-strategy": {
    stateScope: "Track one visible drafting session for the selected artifact, current form values, safety review status, and generated preview text.",
    stateFields: "selected_artifact_id: Current catalog artifact id\nform_values: Synthetic draft values keyed by field id\nreview_status: not_started | needs_review | safe_to_publish | blocked\nlast_safe_checkpoint: Synthetic checkpoint label for retry or reset",
    lifecycle: "State starts when a learner opens the builder, updates as fields change, checkpoints after preview generation, and clears on reset or browser refresh.",
    expiry: "Session-only for this public example.",
    recovery: "If state is missing, return to artifact selection with empty fields. If safety review is blocked, keep the blocked status visible and ask for sanitized replacement values.",
  },
  "plan-record": {
    goal: "Generate and review a public-safe documentation starter artifact for a synthetic learning scenario.",
    steps: "Choose the artifact type\nFill required fields with synthetic values\nRender the starter file\nReview against the public-safety checklist\nName related artifacts and adaptation notes",
    dependencies: "Artifact catalog entry\nSpecialized renderer or fallback renderer\nPublic-safety checklist\nReviewer acceptance criteria",
    assumptions: "The learner is using synthetic notes\nThe artifact is educational and not production-ready\nPrivate adaptation happens outside the public repository",
    status: "In progress",
  },
  "handoff-contract": {
    handoffName: "Documentation Draft Safety Review Handoff",
    sender: "Synthetic Docs Assistant",
    receiver: "Public-safe documentation reviewer",
    contextPackage: "Generated starter artifact\nSelected artifact id and canonical bucket\nPublic-safety checklist result\nRelated artifact ids\nOpen adaptation questions",
    acceptanceCriteria: "No secrets, credentials, account ids, private URLs, personal data, regulated data, logs, traces, memory entries, or state snapshots\nCanonical bucket is correct\nRelated artifacts are named\nPrivate adaptation guidance is clearly separated from public examples",
  },
  "guardrails-governance-policy": {
    policyScope: "Applies to a documentation assistant that drafts public-safe starter artifacts from synthetic learner notes.",
    allowedActions: "Draft Markdown, YAML-like, and JSON examples with synthetic values\nReference catalog artifact ids and suggested filenames\nUse placeholders for private-environment values\nRecommend review before private adaptation",
    prohibitedActions: "Include secrets, credentials, tokens, account ids, private URLs, customer data, employee data, regulated data, proprietary workflows, real logs, traces, transcripts, live memory entries, or state snapshots\nPublish or approve artifacts without human review\nTreat protocol adapters as taxonomy replacements\nCreate a new top-level taxonomy bucket",
    approvalRules: "Require review before publishing a new example pack\nRequire review before adding tools with network, account, filesystem write, or irreversible side effects\nRequire review before changing data handling, memory, state, or runtime posture",
    escalation: "Escalate when source notes look private, regulated, employer-specific, credential-like, or copied from a real runtime environment.",
  },
  "output-schema": {
    schemaName: "Documentation Starter Output Contract",
    format: "JSON",
    requiredFields: "title: Short public-safe artifact title\nsummary: Concise synthetic summary\nkey_points: List of generic documentation points\nlimitations: Public-safe caveats and adaptation boundaries\nrelated_artifacts: Catalog artifact ids or suggested filenames referenced by the output",
    constraints: "Use stable field names\nKeep examples synthetic\nPreserve related artifact references\nReject requests that require private sources, secrets, real traces, memory entries, or state snapshots",
    exampleOutput: "{\"title\":\"Synthetic Starter Artifact\",\"summary\":\"Public-safe documentation starter for a learning scenario.\",\"key_points\":[\"Use synthetic inputs\",\"Name related artifacts\"],\"limitations\":\"Not a production guarantee.\",\"related_artifacts\":[\"guardrails-governance-policy\",\"eval-rubric\"]}",
  },
  "eval-rubric": {
    evalGoal: "Assess whether a documentation starter artifact is clear, public-safe, and aligned with the canonical taxonomy bucket.",
    criteria: "Canonical bucket is correct\nRequired catalog fields are represented\nMemory and state boundaries remain separate\nDesign-time, runtime, and iteration roles remain distinct\nExamples are synthetic and generic\nRelated artifacts are named",
    scoring: "Score each criterion from 1 to 3. A score of 1 means missing or unsafe, 2 means partially useful but needs revision, and 3 means clear enough for public learner review.",
    testCases: "Draft an agent manifest for the synthetic docs assistant\nDraft a memory policy without real memory entries\nDraft a state strategy without long-term memory claims\nDraft a runtime config using placeholder-only secret references\nDraft an output schema with array fields for key_points and related_artifacts",
    observabilityNotes: "Review on each renderer change and before public examples are published. Use synthetic notes only; do not paste real user sessions, traces, transcripts, incidents, or logs.",
  },
  "runtime-config": {
    runtimeName: "Local Synthetic Docs Assistant Runtime",
    environment: "Local browser served by a static file server with public catalog data",
    dependencies: "Modern browser\nLocal static server\nPublic catalog and renderer files\nPlaceholder model profile reference",
    limits: "No analytics\nNo remote scripts\nNo persistence beyond the current session\nRequest timeout placeholder: 30 seconds for future approved adapters\nRetry limit placeholder: 1 safe retry after a visible checkpoint",
    configuration: "host: localhost\nport: 8000\ncontent_root: src\nmodel_profile: model-profile-placeholder\nsecrets_source: environment-variable-placeholder",
  },
  "iteration-changelog-note": {
    changeSummary: "Added a synthetic documentation assistant example bundle with public-safety review guidance and validation coverage.",
    reason: "Learners need a concrete, reviewable example showing how the current catalog artifacts fit together without exposing private data.",
    evidence: "Generated artifacts use the current renderer entry point\nChecklist review removes secrets, private data, regulated data, logs, traces, memory entries, and live state\nCatalog and renderer tests cover current artifact ids and fallback behavior\nCI runs Node syntax and validation scripts",
    followUps: "Add more example packs only after the first pack is reviewed\nConsider export bundle support after validation stabilizes\nKeep protocol mappings clearly framed as adapters\nReview examples whenever catalog fields change",
    affectedArtifacts: "agent-manifest\nrole-profile\noperating-principles\nskill-module\ntool-spec\nresource-manifest\nsystem-task-prompt\ninterface-schema\nmemory-policy\nstate-strategy\nplan-record\nhandoff-contract\nguardrails-governance-policy\noutput-schema\neval-rubric\nruntime-config\niteration-changelog-note",
  },
  // NOTE: this artifact's values are identical to src/examples/exampleValues.js.
  // That file mixes a workshop-planning scenario (the other 17 artifacts) with a
  // documentation-assistant scenario for this one id - a known inconsistency
  // tracked separately and intentionally left untouched by this file. It is
  // repeated here, scoped to this pack, so the pack has a complete, self-contained
  // set of scenario inputs that does not depend on src/examples/exampleValues.js.
  "public-scaffold-release-package": {
    releaseName: "Synthetic Documentation Assistant Scaffold v0.2",
    releasePosture: "A public learning scaffold ready for review and reuse with synthetic inputs. It is not a production deployment, security approval, or certification.",
    changes: "Added guided artifact templates for release preparation\nConnected release notes to public-safety and evaluation artifacts\nDocumented concise validation and follow-up communication fields",
    intentionallyNotIncluded: "Production runtime configuration\nPrivate deployment notes or endpoints\nLive memory, state, logs, traces, or user data\nClaims of production readiness or platform endorsement",
    publicSafetyReview: "Examples use synthetic, generic project language\nRelease copy contains no credentials, private URLs, or real identifiers\nMemory and state are referenced only as private data that must stay out of public notes\nPublic communication is separated from any private adaptation work",
    validationChecks: "Catalog integrity checks pass\nRenderer smoke checks pass\nGenerated filename is repository-safe\nMarkdown output reviewed against the public-safety checklist",
    releaseDraft: "This release adds a public-safe scaffold release package to the synthetic documentation assistant example. It helps maintainers collect release posture, changes, exclusions, safety checks, validation results, and follow-up notes before sharing an educational scaffold.",
    socialDraft: "A new public scaffold release package template is available for preparing concise, public-safe educational releases. It separates release readiness from production readiness and keeps private operational context out of public notes.",
    followUps: "Review learner feedback after publication\nLink any future corrections to the iteration changelog\nRe-run validation before updating public communication",
  },
};

export default scenarioValues;
