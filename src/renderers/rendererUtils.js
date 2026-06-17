export const EMPTY_VALUE = "_Not specified yet._";
export const YAML_EMPTY_VALUE = "TBD";

export function cleanText(value, fallback = EMPTY_VALUE) {
  const cleaned = String(value || "").trim();
  return cleaned || fallback;
}

export function splitLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function slugify(value, fallback = "starter-artifact") {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

export function appendList(lines, items = [], fallback = EMPTY_VALUE) {
  const normalized = Array.isArray(items) ? items.filter(Boolean) : splitLines(items);

  if (!normalized.length) {
    lines.push(`- ${fallback}`);
    return;
  }

  normalized.forEach((item) => {
    lines.push(`- ${item}`);
  });
}

export function appendKeyValueList(lines, value, fallback = EMPTY_VALUE) {
  const entries = parseKeyValueLines(value);

  if (!entries.length) {
    lines.push(`- ${fallback}`);
    return;
  }

  entries.forEach(({ key, description }) => {
    lines.push(`- ${key}: ${description}`);
  });
}

export function parseKeyValueLines(value) {
  return splitLines(value).map((line, index) => {
    const cleaned = line.replace(/^-+\s*/, "");
    const separatorIndex = cleaned.indexOf(":");

    if (separatorIndex === -1) {
      return {
        key: `field${index + 1}`,
        description: cleaned,
      };
    }

    const key = cleaned.slice(0, separatorIndex).trim();
    const description = cleaned.slice(separatorIndex + 1).trim();

    return {
      key: key || `field${index + 1}`,
      description: description || YAML_EMPTY_VALUE,
    };
  });
}

export function appendMarkdownSection(lines, heading, content, fallback = EMPTY_VALUE) {
  lines.push(`## ${heading}`);
  lines.push("");

  if (Array.isArray(content)) {
    appendList(lines, content, fallback);
  } else {
    lines.push(cleanText(content, fallback));
  }

  lines.push("");
}

export function appendYamlScalar(lines, key, value, indent = 0) {
  lines.push(`${space(indent)}${key}: ${quoteYaml(cleanText(value, YAML_EMPTY_VALUE))}`);
}

export function appendYamlBlock(lines, key, value, indent = 0) {
  const cleaned = cleanText(value, YAML_EMPTY_VALUE);

  if (cleaned === YAML_EMPTY_VALUE || !cleaned.includes("\n")) {
    appendYamlScalar(lines, key, cleaned, indent);
    return;
  }

  lines.push(`${space(indent)}${key}: |-`);
  splitLines(cleaned).forEach((line) => {
    lines.push(`${space(indent + 2)}${line}`);
  });
}

export function appendYamlList(lines, key, items, indent = 0) {
  const normalized = Array.isArray(items) ? items.filter(Boolean) : splitLines(items);
  lines.push(`${space(indent)}${key}:`);

  if (!normalized.length) {
    lines.push(`${space(indent + 2)}- ${quoteYaml(YAML_EMPTY_VALUE)}`);
    return;
  }

  normalized.forEach((item) => {
    lines.push(`${space(indent + 2)}- ${quoteYaml(item)}`);
  });
}

export function appendYamlKeyValueList(lines, key, value, indent = 0) {
  const entries = parseKeyValueLines(value);
  lines.push(`${space(indent)}${key}:`);

  if (!entries.length) {
    lines.push(`${space(indent + 2)}${YAML_EMPTY_VALUE}: ${quoteYaml(YAML_EMPTY_VALUE)}`);
    return;
  }

  entries.forEach((entry) => {
    lines.push(`${space(indent + 2)}${slugify(entry.key, `field-${entry.key}`)}:`);
    lines.push(`${space(indent + 4)}description: ${quoteYaml(entry.description)}`);
  });
}

export function quoteYaml(value) {
  const text = cleanText(value, YAML_EMPTY_VALUE);
  return JSON.stringify(text);
}

function space(count) {
  return " ".repeat(count);
}
