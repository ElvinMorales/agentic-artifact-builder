const EMPTY_VALUE = "_Not specified yet._";

export function renderMarkdownArtifact(artifact, bucket, values = {}) {
  const lines = [];

  lines.push(`# ${artifact.name}`);
  lines.push("");
  lines.push("## Taxonomy placement");
  lines.push("");
  lines.push(`- Canonical bucket: ${bucket?.name || artifact.bucket}`);
  lines.push(`- Lifecycle stage: ${artifact.lifecycleStage}`);
  lines.push(`- Artifact type: ${artifact.name}`);
  lines.push("");
  lines.push("## Purpose");
  lines.push("");
  lines.push(artifact.description);
  lines.push("");
  lines.push("## Example filenames");
  lines.push("");
  appendList(lines, artifact.exampleFilenames);
  lines.push("");
  lines.push("## Fields");
  lines.push("");

  artifact.fields.forEach((field) => {
    const rawValue = values[field.id] || "";
    lines.push(`### ${field.label}`);
    lines.push("");
    appendFieldValue(lines, rawValue, field.type);
    lines.push("");
  });

  lines.push("## Public-safety notes");
  lines.push("");
  appendList(lines, artifact.publicSafetyNotes);
  lines.push("");
  lines.push("## Related artifacts");
  lines.push("");
  appendList(lines, artifact.relatedArtifacts);

  if (artifact.id === "skill-module") {
    lines.push("");
    lines.push("## Skill module note");
    lines.push("");
    lines.push(
      "This starter can be adapted toward a SKILL.md-style file, while the artifact remains mapped to the Capability modules bucket."
    );
  }

  return `${lines.join("\n").trim()}\n`;
}

export function getDownloadFilename(artifact) {
  return `${artifact.id}.md`;
}

function appendFieldValue(lines, rawValue, type) {
  const value = rawValue.trim();

  if (!value) {
    lines.push(EMPTY_VALUE);
    return;
  }

  if (type === "list") {
    appendList(lines, splitLines(value));
    return;
  }

  if (type === "key-value-list") {
    appendKeyValueList(lines, splitLines(value));
    return;
  }

  lines.push(value);
}

function appendList(lines, items = []) {
  if (!items.length) {
    lines.push(`- ${EMPTY_VALUE}`);
    return;
  }

  items.forEach((item) => {
    lines.push(`- ${item}`);
  });
}

function appendKeyValueList(lines, items) {
  if (!items.length) {
    lines.push(`- ${EMPTY_VALUE}`);
    return;
  }

  items.forEach((item) => {
    const cleaned = item.replace(/^-+\s*/, "");
    lines.push(`- ${cleaned}`);
  });
}

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
