import {
  artifactDownloadFilenames,
  artifactRenderers,
} from "./artifactRenderers.js";
import {
  appendKeyValueList,
  appendList,
  EMPTY_VALUE,
  splitLines,
} from "./rendererUtils.js";

export function renderMarkdownArtifact(artifact, bucket, values = {}) {
  return renderArtifactMarkdown(artifact, values, bucket);
}

export function renderArtifactMarkdown(artifact, values = {}, bucket = undefined) {
  const renderer = artifactRenderers[artifact.id] ?? renderGenericArtifactMarkdown;
  return renderer(artifact, values, bucket);
}

export function renderGenericArtifactMarkdown(artifact, values = {}, bucket = undefined) {
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

  return `${lines.join("\n").trim()}\n`;
}

export function getDownloadFilename(artifact) {
  return artifactDownloadFilenames[artifact.id] || `${artifact.id}.md`;
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
    appendKeyValueList(lines, value);
    return;
  }

  lines.push(value);
}
