import {
  artifactCatalog,
  sourceTaxonomy,
  taxonomyBuckets,
} from "./data/artifactCatalog.js";
import { exampleValues } from "./examples/exampleValues.js";
import {
  getDownloadFilename,
  renderMarkdownArtifact,
} from "./renderers/markdownRenderer.js";

const pickerElement = document.querySelector("#artifact-picker");
const learningElement = document.querySelector("#learning-content");
const formElement = document.querySelector("#artifact-form");
const previewElement = document.querySelector("#markdown-preview");
const statusElement = document.querySelector("#control-status");
const loadExampleButton = document.querySelector("#load-example");
const resetButton = document.querySelector("#reset-form");
const copyButton = document.querySelector("#copy-markdown");
const downloadButton = document.querySelector("#download-markdown");

const artifactById = new Map(artifactCatalog.map((artifact) => [artifact.id, artifact]));
const bucketById = new Map(taxonomyBuckets.map((bucket) => [bucket.id, bucket]));
const fieldValuesByArtifact = new Map();
let selectedArtifactId = artifactCatalog[0]?.id;
let statusTimer;

const lifecycleStageDetails = {
  "design-time": {
    label: "Design-time",
    description:
      "Defines intended structure, policy, prompts, schemas, reusable templates, and other decisions that guide implementation.",
  },
  runtime: {
    label: "Runtime",
    description:
      "Describes execution posture, operational configuration, resumable state, plans, or handoffs without publishing live runtime data.",
    warning:
      "Runtime templates and configs are okay. Do not commit unsanitized live sessions, traces, logs, private state snapshots, secrets, or workspace snapshots.",
  },
  iteration: {
    label: "Iteration",
    description:
      "Captures evaluation results, feedback, release notes, versioning, lessons learned, and improvement loops.",
  },
};

renderApp();

pickerElement.addEventListener("click", (event) => {
  const button = event.target.closest("[data-artifact-id]");
  if (!button) {
    return;
  }

  selectedArtifactId = button.dataset.artifactId;
  renderApp();
});

formElement.addEventListener("input", (event) => {
  const field = event.target.closest("[data-field-id]");
  if (!field) {
    return;
  }

  const values = getCurrentValues();
  values[field.dataset.fieldId] = field.value;
  renderPreview();
});

loadExampleButton.addEventListener("click", () => {
  const artifact = getSelectedArtifact();
  fieldValuesByArtifact.set(artifact.id, {
    ...createEmptyValues(artifact),
    ...(exampleValues[artifact.id] || createGenericExampleValues(artifact)),
  });
  renderBuilder();
  showStatus("Synthetic example loaded.");
});

resetButton.addEventListener("click", () => {
  const artifact = getSelectedArtifact();
  fieldValuesByArtifact.set(artifact.id, createEmptyValues(artifact));
  renderBuilder();
  showStatus("Current form reset.");
});

copyButton.addEventListener("click", async () => {
  try {
    await copyText(previewElement.value);
    showStatus("Markdown copied.");
  } catch (error) {
    showStatus("Copy failed. Select the preview and copy manually.");
  }
});

downloadButton.addEventListener("click", () => {
  const artifact = getSelectedArtifact();
  const blob = new Blob([previewElement.value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = getDownloadFilename(artifact);
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showStatus(`${link.download} downloaded.`);
});

function renderApp() {
  renderPicker();
  renderLearningPanel();
  renderBuilder();
}

function renderPicker() {
  pickerElement.innerHTML = "";

  taxonomyBuckets.forEach((bucket) => {
    const artifacts = artifactCatalog.filter((artifact) => artifact.bucket === bucket.id);
    if (!artifacts.length) {
      return;
    }

    const group = document.createElement("section");
    group.className = "bucket-group";
    group.setAttribute("aria-labelledby", `bucket-${bucket.id}`);

    const title = document.createElement("h3");
    title.className = "bucket-title";
    title.id = `bucket-${bucket.id}`;
    title.textContent = bucket.name;
    group.append(title);

    artifacts.forEach((artifact) => {
      const button = document.createElement("button");
      button.className = "artifact-option";
      button.type = "button";
      button.dataset.artifactId = artifact.id;
      button.setAttribute("aria-pressed", String(artifact.id === selectedArtifactId));
      button.innerHTML = `<strong></strong><span></span>`;
      button.querySelector("strong").textContent = artifact.name;
      button.querySelector("span").textContent = artifact.description;
      group.append(button);
    });

    pickerElement.append(group);
  });
}

function renderLearningPanel() {
  const artifact = getSelectedArtifact();
  const bucket = bucketById.get(artifact.bucket);
  const related = artifact.relatedArtifacts.map((id) => artifactById.get(id)?.name || id);

  learningElement.innerHTML = "";
  learningElement.append(
    createElement("h3", artifact.name),
    createElement("p", artifact.description, "summary-text"),
    createMetaList([
      ["Canonical bucket", bucket?.name || artifact.bucket],
      ["Lifecycle stage", getLifecycleStageLabel(artifact.lifecycleStage)],
    ]),
    createLifecycleStageBlock(artifact.lifecycleStage),
    createInfoBlock("Example filenames", artifact.exampleFilenames),
    createInfoBlock("Learning goals", artifact.learningGoals),
    createInfoBlock("Public-safety notes", artifact.publicSafetyNotes),
    createInfoBlock("Related artifacts", related),
    createInfoBlock("Source taxonomy", [sourceTaxonomy.notes])
  );
}

function renderBuilder() {
  const artifact = getSelectedArtifact();
  const values = getCurrentValues();

  formElement.innerHTML = "";

  artifact.fields.forEach((field) => {
    const fieldId = `${artifact.id}-${field.id}`;
    const group = document.createElement("div");
    group.className = "field-group";

    const labelRow = document.createElement("div");
    labelRow.className = "field-label-row";

    const label = document.createElement("label");
    label.htmlFor = fieldId;
    label.textContent = field.label;
    labelRow.append(label);

    if (field.required) {
      const required = document.createElement("span");
      required.className = "required-marker";
      required.textContent = "Required";
      labelRow.append(required);
    }

    const help = createElement("p", getFieldHelp(field), "field-help");
    const control = createFieldControl(field, fieldId, values[field.id] || "");

    group.append(labelRow, help, control);
    formElement.append(group);
  });

  renderPreview();
}

function renderPreview() {
  const artifact = getSelectedArtifact();
  const bucket = bucketById.get(artifact.bucket);
  previewElement.value = renderMarkdownArtifact(artifact, bucket, getCurrentValues());
}

function createFieldControl(field, fieldId, value) {
  const selectOptions = getSelectOptions(field);
  const element = selectOptions.length
    ? document.createElement("select")
    : field.type === "text"
      ? document.createElement("input")
      : document.createElement("textarea");

  element.id = fieldId;
  element.dataset.fieldId = field.id;
  element.required = Boolean(field.required);

  if (element.tagName === "INPUT") {
    element.type = "text";
  }

  if (selectOptions.length) {
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Select an option";
    element.append(emptyOption);

    selectOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      element.append(optionElement);
    });
  }

  element.value = value;
  return element;
}

function createMetaList(items) {
  const list = document.createElement("dl");
  list.className = "meta-list";

  items.forEach(([term, description]) => {
    const wrapper = document.createElement("div");
    wrapper.className = "meta-item";
    wrapper.append(createElement("dt", term), createElement("dd", description));
    list.append(wrapper);
  });

  return list;
}

function createInfoBlock(title, items) {
  const block = document.createElement("section");
  block.className = "info-block";
  block.append(createElement("h4", title));

  const list = document.createElement("ul");
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  });

  block.append(list);
  return block;
}

function createLifecycleStageBlock(stage) {
  const detail = lifecycleStageDetails[stage] || {
    label: stage,
    description: "Lifecycle stage guidance is not available for this artifact.",
  };
  const block = document.createElement("section");
  block.className = "lifecycle-block";

  block.append(
    createElement("h4", `${detail.label} stage`),
    createElement("p", detail.description)
  );

  if (detail.warning) {
    block.append(createElement("p", detail.warning, "runtime-warning"));
  }

  return block;
}

function createElement(tagName, text, className = "") {
  const element = document.createElement(tagName);
  element.textContent = text;

  if (className) {
    element.className = className;
  }

  return element;
}

function getLifecycleStageLabel(stage) {
  return lifecycleStageDetails[stage]?.label || stage;
}

function getCurrentValues() {
  const artifact = getSelectedArtifact();

  if (!fieldValuesByArtifact.has(artifact.id)) {
    fieldValuesByArtifact.set(artifact.id, createEmptyValues(artifact));
  }

  return fieldValuesByArtifact.get(artifact.id);
}

function createEmptyValues(artifact) {
  return Object.fromEntries(artifact.fields.map((field) => [field.id, ""]));
}

function createGenericExampleValues(artifact) {
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

function getSelectedArtifact() {
  return artifactById.get(selectedArtifactId) || artifactCatalog[0];
}

function getFieldHelp(field) {
  if (field.type === "list") {
    return "Enter one item per line.";
  }

  if (field.type === "key-value-list") {
    return "Enter one key-value pair per line, such as name: description.";
  }

  if (field.type === "select") {
    return "Choose the closest generic option for this starter artifact.";
  }

  if (field.type === "textarea") {
    return "Write a concise public-safe description.";
  }

  return "Use a short synthetic, public-safe value.";
}

function getSelectOptions(field) {
  const optionsByFieldId = {
    autonomy: ["Low - recommends only", "Medium - drafts for review", "High - acts within approved limits"],
    format: ["Markdown", "JSON", "YAML", "Plain text"],
    resourceType: ["Static reference collection", "Public documentation", "Template library", "Synthetic dataset"],
    status: ["Not started", "In progress", "Blocked", "Ready for review", "Done"],
  };

  return optionsByFieldId[field.id] || [];
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  previewElement.select();
  const copied = document.execCommand("copy");
  window.getSelection()?.removeAllRanges();

  if (!copied) {
    throw new Error("Clipboard copy failed");
  }
}

function showStatus(message) {
  statusElement.textContent = message;
  window.clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    statusElement.textContent = "";
  }, 3000);
}
