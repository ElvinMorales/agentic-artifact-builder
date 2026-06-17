# Documentation Draft Request

## Interface Purpose

Documentation Draft Request defines a public-safe interaction contract for Learner, Synthetic Docs Assistant, Public-safe reviewer.

## Participants

- Learner
- Synthetic Docs Assistant
- Public-safe reviewer

## Input Fields

- artifact_id: Selected catalog artifact id
- notes: Synthetic notes or placeholder requirements
- review_mode: draft | safety-review | private-adaptation-planning

## Required Fields

- artifact_id
- notes
- review_mode

## Validation Rules

- Required fields must be present before rendering the artifact.
- Inputs must use synthetic, generic, public-safe values.
- Protocol mappings are adapters to this interface, not new taxonomy buckets.

## Output Fields

- artifact_text: Generated starter artifact text
- suggested_filename: Suggested public-safe filename
- related_artifacts: Catalog artifact ids referenced by the draft

## Error States

- Missing required field
- Unknown artifact id
- Unsafe private or regulated content detected
- Protocol mapping presented as taxonomy replacement

## Example Request

```json
{
  "interface": "documentation-draft-request",
  "request_id": "example-request-001",
  "inputs": {
    "artifact_id": "Synthetic selected catalog artifact id",
    "notes": "Synthetic synthetic notes or placeholder requirements",
    "review_mode": "Synthetic draft | safety-review | private-adaptation-planning"
  }
}
```

## Related Artifacts

- system-task-prompt
- tool-spec
- output-schema
