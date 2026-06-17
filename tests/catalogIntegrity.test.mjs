import assert from "node:assert/strict";

import {
  artifactCatalog,
  lifecycleStages,
  taxonomyBuckets,
} from "../src/data/artifactCatalog.js";
import { artifactRenderers } from "../src/renderers/artifactRenderers.js";
import {
  renderArtifactMarkdown,
  renderGenericArtifactMarkdown,
} from "../src/renderers/markdownRenderer.js";

const requiredArtifactFields = [
  "id",
  "bucket",
  "name",
  "description",
  "lifecycleStage",
  "exampleFilenames",
  "learningGoals",
  "fields",
  "publicSafetyNotes",
  "relatedArtifacts",
];

const allowedFieldTypes = new Set([
  "text",
  "textarea",
  "list",
  "key-value-list",
  "select",
]);

assert.equal(taxonomyBuckets.length, 14, "catalog must preserve the stable 14 taxonomy buckets");

const bucketIds = taxonomyBuckets.map((bucket) => bucket.id);
assert.equal(new Set(bucketIds).size, bucketIds.length, "taxonomy bucket IDs must be unique");

for (const bucket of taxonomyBuckets) {
  assert.ok(bucket.id, "bucket must have an id");
  assert.ok(bucket.name, `bucket ${bucket.id} must have a name`);
}

const validBucketIds = new Set(bucketIds);
const artifactIds = artifactCatalog.map((artifact) => artifact.id);
const validArtifactIds = new Set(artifactIds);

assert.ok(artifactCatalog.length > 0, "artifact catalog must not be empty");
assert.equal(new Set(artifactIds).size, artifactIds.length, "artifact IDs must be unique");

for (const artifact of artifactCatalog) {
  for (const fieldName of requiredArtifactFields) {
    assert.ok(
      Object.hasOwn(artifact, fieldName),
      `${artifact.id || "artifact"} must define ${fieldName}`
    );
  }

  assert.ok(validBucketIds.has(artifact.bucket), `${artifact.id} must use a valid bucket id`);
  assert.ok(
    lifecycleStages.includes(artifact.lifecycleStage),
    `${artifact.id} must use a known lifecycle stage`
  );
  assert.ok(artifact.name.trim(), `${artifact.id} must have a name`);
  assert.ok(artifact.description.trim(), `${artifact.id} must have a description`);
  assert.ok(artifact.exampleFilenames.length > 0, `${artifact.id} must suggest filenames`);
  assert.ok(artifact.learningGoals.length > 0, `${artifact.id} must include learning goals`);
  assert.ok(artifact.fields.length > 0, `${artifact.id} must define UI fields`);
  assert.ok(artifact.publicSafetyNotes.length > 0, `${artifact.id} must include safety notes`);
  assert.ok(Array.isArray(artifact.relatedArtifacts), `${artifact.id} relatedArtifacts must be an array`);

  const fieldIds = artifact.fields.map((field) => field.id);
  assert.equal(new Set(fieldIds).size, fieldIds.length, `${artifact.id} field IDs must be unique`);

  for (const field of artifact.fields) {
    assert.ok(field.id, `${artifact.id} field must have an id`);
    assert.ok(field.label, `${artifact.id}.${field.id} must have a label`);
    assert.ok(allowedFieldTypes.has(field.type), `${artifact.id}.${field.id} has unknown type`);
    assert.equal(typeof field.required, "boolean", `${artifact.id}.${field.id} required must be boolean`);
  }

  for (const relatedArtifact of artifact.relatedArtifacts) {
    if (/^[a-z0-9-]+$/.test(relatedArtifact)) {
      assert.ok(
        validArtifactIds.has(relatedArtifact),
        `${artifact.id} related artifact ${relatedArtifact} must exist`
      );
    }
  }

  assert.equal(
    typeof artifactRenderers[artifact.id],
    "function",
    `${artifact.id} must have a specialized renderer`
  );
}

assert.equal(typeof renderGenericArtifactMarkdown, "function", "generic fallback renderer must exist");

const unknownArtifact = {
  id: "future-artifact",
  bucket: "identity",
  name: "Future artifact",
  description: "Unexpected future catalog entry.",
  lifecycleStage: "design-time",
  exampleFilenames: ["future-artifact.md"],
  fields: [{ id: "purpose", label: "Purpose", type: "textarea", required: true }],
  publicSafetyNotes: ["Use synthetic examples only."],
  relatedArtifacts: [],
};

const fallbackOutput = renderArtifactMarkdown(unknownArtifact, {
  purpose: "Confirm fallback rendering remains available.",
});

assert.match(fallbackOutput, /# Future artifact/, "unknown artifacts must render through fallback");
assert.match(fallbackOutput, /## Fields/, "fallback output must include generic field rendering");

console.log("catalog integrity checks passed");
