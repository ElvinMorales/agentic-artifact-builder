import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { artifactCatalog, taxonomyBuckets } from "../src/data/artifactCatalog.js";
import { artifactDownloadFilenames } from "../src/renderers/artifactRenderers.js";
import { getDownloadFilename, renderArtifactMarkdown } from "../src/renderers/markdownRenderer.js";
import { scenarioValues } from "../examples/synthetic-docs-assistant/scenario-values.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packDir = path.join(__dirname, "..", "examples", "synthetic-docs-assistant", "generated");
const bucketsById = new Map(taxonomyBuckets.map((bucket) => [bucket.id, bucket]));

const catalogArtifactIds = new Set(artifactCatalog.map((artifact) => artifact.id));
const scenarioArtifactIds = new Set(Object.keys(scenarioValues));

assert.deepEqual(
  scenarioArtifactIds,
  catalogArtifactIds,
  "committed scenario values must cover exactly the current catalog artifact ids"
);

const expectedFilenames = new Set(Object.values(artifactDownloadFilenames));
const actualFilenames = new Set(fs.readdirSync(packDir));

assert.deepEqual(
  actualFilenames,
  expectedFilenames,
  "committed pack directory must contain exactly the files the current catalog can generate"
);

const mismatches = [];

for (const artifact of artifactCatalog) {
  const bucket = bucketsById.get(artifact.bucket);
  const values = scenarioValues[artifact.id] || {};
  const rendered = renderArtifactMarkdown(artifact, values, bucket);
  const filename = getDownloadFilename(artifact);
  const committedPath = path.join(packDir, filename);

  let committedBuffer;
  try {
    // Renderers always emit "\n" line endings, matching the LF-only blobs git
    // stores for these files. On checkout, core.autocrlf can rewrite those LF
    // blobs to CRLF on disk (e.g. Windows with autocrlf=true); normalizing
    // CRLF -> LF here compares against what is actually committed, not a
    // platform-specific checkout artifact.
    committedBuffer = Buffer.from(fs.readFileSync(committedPath, "utf8").replace(/\r\n/g, "\n"), "utf8");
  } catch (error) {
    mismatches.push(`${filename} (${artifact.id}): could not read committed file - ${error.message}`);
    continue;
  }

  const renderedBuffer = Buffer.from(rendered, "utf8");

  if (!renderedBuffer.equals(committedBuffer)) {
    mismatches.push(
      `${filename} (${artifact.id}): regenerated output does not byte-match the committed pack file`
    );
  }
}

assert.equal(
  mismatches.length,
  0,
  `example pack regeneration produced ${mismatches.length} mismatch(es):\n${mismatches.join("\n")}`
);

console.log("synthetic docs assistant example pack regeneration checks passed");
