# Local Synthetic Docs Assistant Runtime

## Purpose

Local Synthetic Docs Assistant Runtime documents non-secret runtime assumptions, deployment posture, operational limits, and placeholder configuration for Local browser served by a static file server with public catalog data.

## Model And Provider Assumptions

- Model provider, model name, region, and account details are placeholders in this public starter artifact.
- Prompts, tools, policies, schemas, memory, and state behavior should be declared in their related artifacts.
- Changing providers or model profiles should trigger review of output schemas, eval rubrics, and governance rules.

## Non-Secret Settings

- host: localhost
- port: 8000
- content_root: src
- model_profile: model-profile-placeholder
- secrets_source: environment-variable-placeholder

## Example Runtime Configuration

```yaml
runtime:
  name: "Local Synthetic Docs Assistant Runtime"
  environment: "Local browser served by a static file server with public catalog data"
  model_provider: "provider-placeholder"
  model_reference: "model-profile-placeholder"
settings:
  host: "localhost"
  port: "8000"
  content_root: "src"
  model_profile: "model-profile-placeholder"
  secrets_source: "environment-variable-placeholder"
secret_references:
  - name: "EXAMPLE_API_KEY"
    source: "environment-variable-placeholder"
    required: "only when an approved adapter needs it"
```

## Environment Variables And Secret References

- Use placeholders such as EXAMPLE_API_KEY, EXAMPLE_SERVICE_URL, or EXAMPLE_ACCOUNT_ID.
- Do not commit real credentials, private endpoints, tokens, account ids, or secret manager paths.
- Document which component would read a secret, but keep the actual value outside this public artifact.

## Tool Availability

- Only enable tools documented in related tool-spec artifacts.
- Disable external writes and irreversible actions until explicitly approved in governance policy and runtime review.
- Use placeholder adapters for protocol-specific surfaces.

## Resource Paths

- Prefer public or local placeholder paths for examples.
- Do not include private repository paths, private buckets, internal URLs, or production storage locations.

## Timeout And Retry Assumptions

- No analytics
- No remote scripts
- No persistence beyond the current session
- Request timeout placeholder: 30 seconds for future approved adapters
- Retry limit placeholder: 1 safe retry after a visible checkpoint

## Deployment Posture

- This starter config describes assumptions, not a production deployment guarantee.
- Review policy, schema, state, memory, and eval artifacts before moving from local learning examples to any private environment.

## Local Development Notes

- Modern browser
- Local static server
- Public catalog and renderer files
- Placeholder model profile reference

## Public-Safety Notes

- Use synthetic, generic examples only.
- Do not include secrets, private data, proprietary workflows, regulated data, unsanitized logs, real traces, or production state.
- Use placeholders for endpoints, credentials, regions, and account identifiers.

## Related Artifacts

- agent-manifest
- tool-spec
- state-strategy
