import assert from "node:assert/strict";

import { artifactCatalog, taxonomyBuckets } from "../src/data/artifactCatalog.js";
import { exampleValues } from "../src/examples/exampleValues.js";
import {
  artifactDownloadFilenames,
  artifactRenderers,
} from "../src/renderers/artifactRenderers.js";
import {
  getDownloadFilename,
  renderArtifactMarkdown,
} from "../src/renderers/markdownRenderer.js";

const bucketsById = new Map(taxonomyBuckets.map((bucket) => [bucket.id, bucket]));
const currentArtifactIds = new Set(artifactCatalog.map((artifact) => artifact.id));

for (const artifact of artifactCatalog) {
  const bucket = bucketsById.get(artifact.bucket);

  assert.ok(
    Object.hasOwn(exampleValues, artifact.id),
    `${artifact.id} has no entry in src/examples/exampleValues.js`
  );

  const values = exampleValues[artifact.id];

  for (const field of artifact.fields) {
    if (!field.required) {
      continue;
    }

    assert.ok(
      String(values[field.id] || "").trim().length > 0,
      `${artifact.id}.${field.id} ("${field.label}") is required but has no example value in exampleValues.js`
    );
  }

  const output = renderArtifactMarkdown(artifact, values, bucket);

  assert.doesNotThrow(
    () => renderArtifactMarkdown(artifact, values, bucket),
    `${artifact.id} should render without throwing`
  );
  assert.ok(output.trim().length > 0, `${artifact.id} output must not be empty`);
  assertNoEmptyHeadingSections(output, artifact.id);
  assertSingleTrailingNewline(output, artifact.id);
  assertRelatedArtifactsSurfaced(output, artifact);

  const filename = getDownloadFilename(artifact);
  assert.ok(filename, `${artifact.id} must have a download filename`);
  assert.equal(
    artifactDownloadFilenames[artifact.id],
    filename,
    `${artifact.id} should use the current specialized filename map`
  );
  assert.match(
    filename,
    /^[A-Za-z0-9._/-]+$/,
    `${artifact.id} filename should be simple and repository-safe`
  );
}

assert.deepEqual(
  new Set(Object.keys(artifactDownloadFilenames)),
  currentArtifactIds,
  "expected filenames must exist for all current artifact IDs"
);

const unknownArtifact = {
  id: "future-output-contract",
  bucket: "outputs-and-schemas",
  name: "Future output contract",
  description: "Future artifact used to confirm fallback behavior.",
  lifecycleStage: "design-time",
  exampleFilenames: ["future-output-contract.md"],
  fields: [{ id: "purpose", label: "Purpose", type: "textarea", required: true }],
  publicSafetyNotes: ["Use synthetic examples only."],
  relatedArtifacts: [],
};

const unknownOutput = renderArtifactMarkdown(unknownArtifact, {
  purpose: "Fallback smoke test.",
});

assert.match(unknownOutput, /# Future output contract/, "unknown future artifact IDs must render");
assert.match(unknownOutput, /## Taxonomy placement/, "fallback output must include taxonomy placement");

const outputSchemaArtifact = artifactCatalog.find((artifact) => artifact.id === "output-schema");
const outputSchemaText = renderArtifactMarkdown(outputSchemaArtifact, exampleValues["output-schema"]);
const schemaMatch = outputSchemaText.match(/```json\n([\s\S]*?)\n```/);
assert.ok(schemaMatch, "output schema renderer should emit a JSON schema block");

const renderedSchema = JSON.parse(schemaMatch[1]);
assert.equal(
  renderedSchema.properties.key_points.type,
  "array",
  "key_points should render as an array schema"
);
assert.equal(
  renderedSchema.properties.related_artifacts.type,
  "array",
  "related_artifacts should render as an array schema"
);

const evalRubricArtifact = artifactCatalog.find((artifact) => artifact.id === "eval-rubric");
const evalRubricText = renderArtifactMarkdown(evalRubricArtifact, exampleValues["eval-rubric"]);
const warning = "Do not include real transcripts or incident records.";
assert.ok(evalRubricArtifact.publicSafetyNotes.includes(warning), "catalog should retain the eval warning");
assert.equal(
  countOccurrences(evalRubricText, warning),
  1,
  "eval rubric renderer should surface the transcript/incident warning exactly once in Public-Safety Checks"
);

const releasePackageArtifact = artifactCatalog.find(
  (artifact) => artifact.id === "public-scaffold-release-package"
);
const releasePackageText = renderArtifactMarkdown(
  releasePackageArtifact,
  exampleValues["public-scaffold-release-package"]
);
assert.match(releasePackageText, /## Release posture/);
assert.match(releasePackageText, /## What changed/);
assert.match(releasePackageText, /## Public-safety review/);
assert.match(releasePackageText, /## Validation checks/);
assert.match(releasePackageText, /not a production-readiness certification/i);

for (const artifact of artifactCatalog) {
  assert.equal(
    typeof artifactRenderers[artifact.id],
    "function",
    `${artifact.id} renderer must be registered`
  );
}

console.log("renderer smoke checks passed");

function countOccurrences(text, needle) {
  return text.split(needle).length - 1;
}

// Any "## " heading must be followed by at least one non-blank line before
// the next heading (of any level) or the end of output. This holds for every
// renderer today - the ones that emit no "## " headings at all (agent-manifest,
// tool-spec, resource-manifest, which render YAML) are vacuously fine - and it
// would catch a future section that loses its content while keeping its title.
function assertNoEmptyHeadingSections(output, artifactId) {
  const lines = output.split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (!/^##\s+\S/.test(lines[i])) {
      continue;
    }

    let hasContent = false;
    for (let j = i + 1; j < lines.length && !/^#{1,6}\s+\S/.test(lines[j]); j++) {
      if (lines[j].trim().length > 0) {
        hasContent = true;
        break;
      }
    }

    assert.ok(
      hasContent,
      `${artifactId} output has a "${lines[i].trim()}" section with no content beneath it`
    );
  }
}

// Every renderer trims and appends exactly one trailing newline. A byte-compare
// against the committed example pack would only catch a change from that one
// fixed baseline; this holds regardless of which scenario values were used.
function assertSingleTrailingNewline(output, artifactId) {
  assert.ok(
    output.endsWith("\n") && !output.endsWith("\n\n"),
    `${artifactId} output must end with exactly one trailing newline`
  );
}

// When a renderer emits a "Related Artifacts" section, every id in the
// artifact's catalog relatedArtifacts must be listed in it. Renderers that
// never emit that section (agent-manifest, skill-module, tool-spec,
// resource-manifest today) are intentionally skipped rather than failed -
// whether every artifact should surface this section is a separate, tracked
// concern, not what this check verifies.
function assertRelatedArtifactsSurfaced(output, artifact) {
  const lines = output.split("\n");
  const headingIndex = lines.findIndex((line) => /^##\s+Related Artifacts$/i.test(line.trim()));

  if (headingIndex === -1) {
    return;
  }

  const sectionIds = [];
  for (let j = headingIndex + 1; j < lines.length && !/^#{1,6}\s+\S/.test(lines[j]); j++) {
    const match = lines[j].match(/^-\s+(.+)$/);
    if (match) {
      sectionIds.push(match[1].trim());
    }
  }

  for (const relatedId of artifact.relatedArtifacts) {
    assert.ok(
      sectionIds.includes(relatedId),
      `${artifact.id} output's Related Artifacts section is missing "${relatedId}"`
    );
  }
}
