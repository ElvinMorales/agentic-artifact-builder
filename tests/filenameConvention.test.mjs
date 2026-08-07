import assert from "node:assert/strict";

import { artifactCatalog } from "../src/data/artifactCatalog.js";
import { artifactDownloadFilenames, artifactRenderers } from "../src/renderers/artifactRenderers.js";
import { getDownloadContentType, getDownloadFilename } from "../src/renderers/markdownRenderer.js";

const LOWERCASE_BASENAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+$/;

// Kept in sync with docs/filename-convention.md.
const PROTOCOL_DRIVEN_EXCEPTIONS = new Set(["SKILL.md"]);
const ECOSYSTEM_CONVENTION_EXCEPTIONS = new Set(["CHANGELOG.md"]);
const DOCUMENTED_EXCEPTIONS = new Set([
  ...PROTOCOL_DRIVEN_EXCEPTIONS,
  ...ECOSYSTEM_CONVENTION_EXCEPTIONS,
]);

for (const [id, filename] of Object.entries(artifactDownloadFilenames)) {
  const basename = filename.split("/").pop();
  const conforms = LOWERCASE_BASENAME_PATTERN.test(basename) || DOCUMENTED_EXCEPTIONS.has(basename);

  assert.ok(
    conforms,
    `${id} download filename "${filename}" must match the lowercase basename convention ` +
      "or be added to docs/filename-convention.md and this test's exception list"
  );
}

// Content type must derive from the extension: .yaml/.yml must not be sent as markdown.
for (const artifact of artifactCatalog) {
  const filename = getDownloadFilename(artifact);
  const extension = filename.split(".").pop().toLowerCase();
  const contentType = getDownloadContentType(filename);

  if (extension === "yaml" || extension === "yml") {
    assert.match(contentType, /yaml/, `${artifact.id} .yaml download must use a yaml content type`);
  } else if (extension === "md") {
    assert.match(contentType, /markdown/, `${artifact.id} .md download must use a markdown content type`);
  }
}

// The identity artifact must have exactly one YAML filename spelling.
const agentManifest = artifactCatalog.find((artifact) => artifact.id === "agent-manifest");
const yamlExample = agentManifest.exampleFilenames.find((name) => name.endsWith(".yaml"));

assert.equal(
  yamlExample,
  artifactDownloadFilenames["agent-manifest"],
  "agent-manifest's yaml exampleFilenames entry must match its download filename"
);
assert.equal(yamlExample, "agent.yaml", "agent-manifest's yaml filename must be lowercase agent.yaml");

// Skill module: frontmatter name capped at 64 chars, no trailing hyphen, directory matches name.
const skillArtifact = artifactCatalog.find((artifact) => artifact.id === "skill-module");
const longSkillValues = {
  skillName: "A Very Long Capability Module Name For Regression Testing Purposes Indeed Yes Truly",
};

const skillDownloadPath = getDownloadFilename(skillArtifact, longSkillValues);
const [skillDir, skillFile] = skillDownloadPath.split("/");

assert.equal(skillFile, "SKILL.md", "skill-module download must be named SKILL.md within its directory");
assert.ok(skillDir.length <= 64, "skill directory slug must be capped at 64 characters");
assert.match(
  skillDir,
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "skill directory slug must be lowercase, hyphen-separated, with no leading/trailing hyphen"
);

const renderedSkillText = artifactRenderers["skill-module"](skillArtifact, longSkillValues);
const frontmatterNameMatch = renderedSkillText.match(/^name: (.+)$/m);

assert.ok(frontmatterNameMatch, "rendered skill-module output must include a frontmatter name field");
assert.equal(
  JSON.parse(frontmatterNameMatch[1]),
  skillDir,
  "frontmatter name must match the download directory segment"
);

// A short skill name must not be affected by the cap and must download without a directory-flattening surprise.
const shortSkillPath = getDownloadFilename(skillArtifact, { skillName: "Research" });
assert.equal(shortSkillPath, "research/SKILL.md");

console.log("filename convention checks passed");
