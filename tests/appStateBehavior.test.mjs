import assert from "node:assert/strict";

import { artifactCatalog } from "../src/data/artifactCatalog.js";
import { exampleValues } from "../src/examples/exampleValues.js";
import { getSkillModuleDirectorySlug } from "../src/renderers/artifactRenderers.js";
import {
  getDownloadContentType,
  getDownloadFilename,
} from "../src/renderers/markdownRenderer.js";
import {
  createAppState,
  createEmptyValues,
  getDownloadStatusMessage,
} from "../src/appState.js";

// Per-artifact form state must persist across artifact switches: typing into
// one artifact's form, switching away, and switching back must not lose it.
// getCurrentValues() returns a live reference into a per-artifact Map for
// exactly this reason - this test protects that contract directly.
{
  const state = createAppState(artifactCatalog);
  const [first, second] = artifactCatalog;

  state.selectArtifact(first.id);
  const firstValues = state.getCurrentValues();
  const typedFieldId = first.fields[0].id;
  firstValues[typedFieldId] = "typed value for first artifact";

  state.selectArtifact(second.id);
  state.getCurrentValues()[second.fields[0].id] = "typed value for second artifact";

  state.selectArtifact(first.id);
  assert.equal(
    state.getCurrentValues()[typedFieldId],
    "typed value for first artifact",
    "per-artifact form state did not persist: switching back to the first artifact lost its typed value"
  );
}

// loadExample() merges catalog example values (skill-module has a committed
// example) into an artifact's form state.
{
  const state = createAppState(artifactCatalog);
  const skillModule = artifactCatalog.find((artifact) => artifact.id === "skill-module");
  state.selectArtifact(skillModule.id);

  state.loadExample();
  const values = state.getCurrentValues();

  assert.equal(
    values.skillName,
    exampleValues["skill-module"].skillName,
    "loadExample() did not populate skill-module's skillName from src/examples/exampleValues.js"
  );
}

// loadExample() falls back to a generic synthetic value when an artifact has
// no entry in exampleValues (exercised with a synthetic artifact, since every
// current catalog artifact does have an entry - see rendererSmoke.test.mjs).
{
  const syntheticArtifact = {
    id: "future-output-contract",
    fields: [{ id: "purpose", label: "Purpose", type: "textarea", required: true }],
  };
  const state = createAppState([syntheticArtifact]);

  state.loadExample();
  const values = state.getCurrentValues();

  assert.equal(
    values.purpose,
    "Synthetic purpose example",
    "loadExample() did not fall back to a generic synthetic value for an artifact with no committed example"
  );
}

// resetCurrent() clears the selected artifact's form state back to empty
// values, independent of what loadExample() or typing had set.
{
  const skillModule = artifactCatalog.find((artifact) => artifact.id === "skill-module");
  const state = createAppState(artifactCatalog);
  state.selectArtifact(skillModule.id);

  state.loadExample();
  state.resetCurrent();

  assert.deepEqual(
    state.getCurrentValues(),
    createEmptyValues(skillModule),
    "resetCurrent() did not clear skill-module's form state back to empty values"
  );
}

// getDownloadStatusMessage() is artifact-dependent: skill-module's message
// includes the directory slug derived from the typed skill name, every other
// artifact gets the plain "downloaded" message.
{
  const skillModule = artifactCatalog.find((artifact) => artifact.id === "skill-module");
  const values = { skillName: "Synthetic Example Skill" };
  const filename = getDownloadFilename(skillModule);
  const expectedSlug = getSkillModuleDirectorySlug(values);

  const message = getDownloadStatusMessage(skillModule, filename, values);

  assert.equal(
    message,
    `${filename} downloaded — place it at ${expectedSlug}/SKILL.md.`,
    "skill-module's download status message did not include the skill directory slug"
  );
}

{
  const agentManifest = artifactCatalog.find((artifact) => artifact.id === "agent-manifest");
  const filename = getDownloadFilename(agentManifest);

  const message = getDownloadStatusMessage(agentManifest, filename, {});

  assert.equal(
    message,
    `${filename} downloaded.`,
    "a non-skill-module artifact's download status message should not mention a skill directory slug"
  );
}

// Download content type is derived from the resolved filename's extension.
// A .yaml artifact must resolve to a YAML content type, not markdown or a
// generic fallback.
{
  const agentManifest = artifactCatalog.find((artifact) => artifact.id === "agent-manifest");
  const filename = getDownloadFilename(agentManifest);

  assert.equal(filename, "agent.yaml", "agent-manifest's download filename should still be agent.yaml");
  assert.equal(
    getDownloadContentType(filename),
    "text/yaml;charset=utf-8",
    `getDownloadContentType() returned the wrong content type for a .yaml artifact (${filename})`
  );
}

{
  const skillModule = artifactCatalog.find((artifact) => artifact.id === "skill-module");
  const filename = getDownloadFilename(skillModule);

  assert.equal(filename, "SKILL.md", "skill-module's download filename should still be SKILL.md");
  assert.equal(
    getDownloadContentType(filename),
    "text/markdown;charset=utf-8",
    `getDownloadContentType() returned the wrong content type for a .md artifact (${filename})`
  );
}

{
  assert.equal(
    getDownloadContentType("notes.txt"),
    "text/plain;charset=utf-8",
    "getDownloadContentType() should fall back to text/plain for an unrecognized extension"
  );
}

console.log("app state behavior checks passed");
