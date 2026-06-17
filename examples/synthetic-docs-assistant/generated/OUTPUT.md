# Documentation Starter Output Contract

## Purpose

Documentation Starter Output Contract defines the generated output contract. It describes required data shape, validation expectations, and failure handling rather than only prose formatting preferences.

## Output Contract

- Preferred format: JSON
- The renderer, prompt, interface, and evaluation rubric should agree on this contract.
- Adapters may map this contract to JSON, Markdown, YAML, or plain text without changing the taxonomy bucket.

## Required Fields

- title: Short public-safe artifact title
- summary: Concise synthetic summary
- key_points: List of generic documentation points
- limitations: Public-safe caveats and adaptation boundaries
- related_artifacts: Catalog artifact ids or suggested filenames referenced by the output

## Optional Fields

- related_artifacts: Artifact ids or filenames that the generated output depends on.
- assumptions: Labeled assumptions used to keep the starter output useful and public-safe.
- review_notes: Synthetic reviewer notes for learning and iteration.

## Validation Expectations

- Required fields must be present and non-empty.
- Generated examples must remain synthetic, generic, and public-safe.
- The output must not include secrets, private data, regulated data, production state, raw logs, or real traces.
- Use stable field names
- Keep examples synthetic
- Preserve related artifact references
- Reject requests that require private sources, secrets, real traces, memory entries, or state snapshots

## JSON Schema Example

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Documentation Starter Output Contract",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "title",
    "summary",
    "key_points",
    "limitations",
    "related_artifacts"
  ],
  "properties": {
    "title": {
      "type": "string",
      "description": "Short public-safe artifact title"
    },
    "summary": {
      "type": "string",
      "description": "Concise synthetic summary"
    },
    "key_points": {
      "type": "array",
      "description": "List of generic documentation points",
      "items": {
        "type": "string"
      }
    },
    "limitations": {
      "type": "string",
      "description": "Public-safe caveats and adaptation boundaries"
    },
    "related_artifacts": {
      "type": "array",
      "description": "Catalog artifact ids or suggested filenames referenced by the output",
      "items": {
        "type": "string"
      }
    }
  }
}
```

## Example JSON Output

```json
{
  "title": "Synthetic Starter Artifact",
  "summary": "Public-safe documentation starter for a learning scenario.",
  "key_points": [
    "Use synthetic inputs",
    "Name related artifacts"
  ],
  "limitations": "Not a production guarantee.",
  "related_artifacts": [
    "guardrails-governance-policy",
    "eval-rubric"
  ]
}
```

## Failure Handling

- Return a validation error when required fields are missing or unsafe values are requested.
- Ask for clarification when the requested output contract conflicts with related guardrails or interface expectations.
- Use placeholders instead of real private values when demonstrating the schema publicly.

## Related Artifacts

- interface-schema
- system-task-prompt
- eval-rubric
