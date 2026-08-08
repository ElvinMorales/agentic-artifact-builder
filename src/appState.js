import { exampleValues } from "./examples/exampleValues.js";
import { getSkillModuleDirectorySlug } from "./renderers/artifactRenderers.js";

export function createEmptyValues(artifact) {
  return Object.fromEntries(artifact.fields.map((field) => [field.id, ""]));
}

export function createGenericExampleValues(artifact) {
  return Object.fromEntries(
    artifact.fields.map((field) => [
      field.id,
      field.type === "list"
        ? "Synthetic example item\nAnother generic example item"
        : field.type === "key-value-list"
          ? "exampleKey: Generic example value\nsecondKey: Another example value"
          : `Synthetic ${field.label.toLowerCase()} example`,
    ])
  );
}

export function createAppState(artifactCatalog) {
  const artifactById = new Map(artifactCatalog.map((artifact) => [artifact.id, artifact]));
  const fieldValuesByArtifact = new Map();
  let selectedArtifactId = artifactCatalog[0]?.id;

  function getSelectedArtifact() {
    return artifactById.get(selectedArtifactId) || artifactCatalog[0];
  }

  function selectArtifact(artifactId) {
    selectedArtifactId = artifactId;
  }

  function getCurrentValues() {
    const artifact = getSelectedArtifact();

    if (!fieldValuesByArtifact.has(artifact.id)) {
      fieldValuesByArtifact.set(artifact.id, createEmptyValues(artifact));
    }

    return fieldValuesByArtifact.get(artifact.id);
  }

  function loadExample() {
    const artifact = getSelectedArtifact();
    fieldValuesByArtifact.set(artifact.id, {
      ...createEmptyValues(artifact),
      ...(exampleValues[artifact.id] || createGenericExampleValues(artifact)),
    });
  }

  function resetCurrent() {
    const artifact = getSelectedArtifact();
    fieldValuesByArtifact.set(artifact.id, createEmptyValues(artifact));
  }

  return {
    getSelectedArtifact,
    selectArtifact,
    getCurrentValues,
    loadExample,
    resetCurrent,
  };
}

export function getDownloadStatusMessage(artifact, filename, values) {
  if (artifact.id === "skill-module") {
    const slug = getSkillModuleDirectorySlug(values);
    return `${filename} downloaded — place it at ${slug}/SKILL.md.`;
  }

  return `${filename} downloaded.`;
}
