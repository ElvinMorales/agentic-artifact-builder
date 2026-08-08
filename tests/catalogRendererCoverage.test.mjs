import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { artifactCatalog, taxonomyBuckets } from "../src/data/artifactCatalog.js";
import { artifactDownloadFilenames, artifactRenderers } from "../src/renderers/artifactRenderers.js";

const coveragePath = fileURLToPath(
  new URL("../docs/catalog-renderer-coverage.md", import.meta.url)
);
const coverageText = readFileSync(coveragePath, "utf8");

const CODE_SPAN_PATTERN = /`([^`]+)`/;
const ROW_PATTERN = /^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*(.+?)\s*\|\s*([^|]+?)\s*\|$/;

function parseCoverageTable(text) {
  const rows = [];

  for (const line of text.split(/\r?\n/)) {
    const match = line.match(ROW_PATTERN);
    if (!match) continue;

    const [, id, bucketName, lifecycleStage, rendererType, filenameCell, issue] = match;
    const filenameMatch = filenameCell.match(CODE_SPAN_PATTERN);

    assert.ok(filenameMatch, `${coveragePath}: row for \`${id}\` has no backtick-quoted filename`);

    rows.push({
      id,
      bucketName,
      lifecycleStage,
      rendererType,
      filename: filenameMatch[1],
      issue,
    });
  }

  return rows;
}

const bucketNameById = new Map(taxonomyBuckets.map((bucket) => [bucket.id, bucket.name]));
const rows = parseCoverageTable(coverageText);

assert.ok(rows.length > 0, "docs/catalog-renderer-coverage.md must contain at least one artifact row");

const rowIds = rows.map((row) => row.id);
assert.equal(
  new Set(rowIds).size,
  rowIds.length,
  "docs/catalog-renderer-coverage.md must not list the same artifact id twice"
);

const rowsById = new Map(rows.map((row) => [row.id, row]));
const catalogIds = new Set(artifactCatalog.map((artifact) => artifact.id));

const missingFromTable = artifactCatalog
  .map((artifact) => artifact.id)
  .filter((id) => !rowsById.has(id));
const extraInTable = rowIds.filter((id) => !catalogIds.has(id));

assert.deepEqual(
  missingFromTable,
  [],
  `docs/catalog-renderer-coverage.md is missing a row for: ${missingFromTable.join(", ")}`
);
assert.deepEqual(
  extraInTable,
  [],
  `docs/catalog-renderer-coverage.md lists artifact ids that no longer exist in the catalog: ${extraInTable.join(", ")}`
);

for (const artifact of artifactCatalog) {
  const row = rowsById.get(artifact.id);
  const expectedBucketName = bucketNameById.get(artifact.bucket);

  assert.equal(
    row.bucketName,
    expectedBucketName,
    `${artifact.id}: coverage table lists taxonomy bucket "${row.bucketName}", catalog says "${expectedBucketName}"`
  );

  assert.equal(
    row.lifecycleStage,
    artifact.lifecycleStage,
    `${artifact.id}: coverage table lists lifecycle stage "${row.lifecycleStage}", catalog says "${artifact.lifecycleStage}"`
  );

  const expectedRendererType = typeof artifactRenderers[artifact.id] === "function" ? "Specialized" : "Generic fallback";
  assert.equal(
    row.rendererType,
    expectedRendererType,
    `${artifact.id}: coverage table lists renderer type "${row.rendererType}", expected "${expectedRendererType}"`
  );

  const expectedFilename = artifactDownloadFilenames[artifact.id];
  assert.equal(
    row.filename,
    expectedFilename,
    `${artifact.id}: coverage table lists download filename "${row.filename}", artifactDownloadFilenames says "${expectedFilename}"`
  );
}

console.log("catalog renderer coverage checks passed");
