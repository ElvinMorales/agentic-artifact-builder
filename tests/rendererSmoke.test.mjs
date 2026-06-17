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
  const output = renderArtifactMarkdown(artifact, exampleValues[artifact.id] || {}, bucket);

  assert.doesNotThrow(
    () => renderArtifactMarkdown(artifact, exampleValues[artifact.id] || {}, bucket),
    `${artifact.id} should render without throwing`
  );
  assert.ok(output.trim().length > 0, `${artifact.id} output must not be empty`);
  assert.match(
    output,
    /(^#\s|\n##\s|purpose|description|scope|contract|policy|configuration|goal)/i,
    `${artifact.id} output should include a recognizable title or section`
  );

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
  lifecycleStage: "build-time",
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
const warning = "Do not include real traces, logs, transcripts, or incident records.";
assert.ok(evalRubricArtifact.publicSafetyNotes.includes(warning), "catalog should retain the eval warning");
assert.equal(
  countOccurrences(evalRubricText, warning),
  0,
  "eval rubric renderer should not duplicate the trace/log warning in Public-Safety Checks"
);

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
