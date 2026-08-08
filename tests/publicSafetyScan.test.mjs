import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// This check automates part of docs/public-safety-checklist.md: it scans every
// tracked file for value *shapes* that look like real secrets or private
// endpoints, not for the vocabulary this repository uses to prohibit them.
// The repository's own prose is full of words like "secret", "credential",
// "token", and "internal" because it forbids them - matching on those words
// would make the scan fire on the checklist itself. Every rule below matches
// a concrete shape (a key format, an assignment with a literal value, an IP
// octet range, a non-public hostname pattern) so prose sentences never match.
//
// Reviewed false positive? Add `public-safety-scan:allow-line` anywhere on
// the offending line, or put `public-safety-scan:allow-next-line` on the line
// above it. Both markers are greppable so suppressions stay visible in review:
//   grep -rn "public-safety-scan:allow" .

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, "..");

const ALLOW_LINE_MARKER = "public-safety-scan:allow-line";
const ALLOW_NEXT_LINE_MARKER = "public-safety-scan:allow-next-line";

// --- Documented placeholders -----------------------------------------------
//
// Values that AGENTS.md, README.md, CONTRIBUTING.md, and
// docs/public-safety-checklist.md already tell contributors to use. A value
// that matches one of these is a placeholder, not a leaked credential, no
// matter which rule's shape it happens to satisfy.
const PLACEHOLDER_EXACT_VALUES = new Set([
  "EXAMPLE_API_KEY",
  "EXAMPLE_ACCOUNT_ID",
  "EXAMPLE_SERVICE_URL",
  "account-id-placeholder",
  "model-profile-placeholder",
  "provider-placeholder",
  "environment-variable-placeholder",
  "public-or-local-placeholder",
  "example-request-001",
  "example-run-001",
  "example-session-001",
  "localhost",
  "127.0.0.1",
]);

// Shape-based placeholder patterns, so a new EXAMPLE_*, *-placeholder, or
// example-* value does not need a one-off entry above to stay allowlisted.
const PLACEHOLDER_VALUE_PATTERNS = [
  /^EXAMPLE_[A-Z0-9_]+$/,
  /^[a-z][a-z0-9-]*-placeholder$/,
  /^example-[a-z0-9-]+$/,
  /^https:\/\/example\.invalid(?:\/.*)?$/,
];

function isPlaceholderValue(value) {
  const trimmed = value.trim();
  if (PLACEHOLDER_EXACT_VALUES.has(trimmed)) return true;
  return PLACEHOLDER_VALUE_PATTERNS.some((pattern) => pattern.test(trimmed));
}

// --- Rules -------------------------------------------------------------
//
// Each rule scans one line at a time and returns the substrings it matched.
// `scan(line)` must return an array (possibly empty) of matched strings.
// Keep rules narrow and shape-based; when a rule needs an allowlist check,
// do it inside `scan` via `isPlaceholderValue`.
const RULES = [
  {
    id: "aws-access-key-id",
    summary: "AWS-style access key id (AKIA/ASIA/... + 16 alphanumerics)",
    scan(line) {
      const matches = line.match(/\b(?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}\b/g);
      return matches || [];
    },
  },
  {
    id: "private-key-block",
    summary: "PEM-style private key header",
    scan(line) {
      // Built from parts so this rule's own source line does not contain the
      // contiguous literal text it matches.
      const header = new RegExp(["-{5}BEGIN ", "[A-Z0-9 ]*PRIVATE KEY", "-{5}"].join(""));
      const match = line.match(header);
      return match ? [match[0]] : [];
    },
  },
  {
    id: "vendor-token-prefix",
    summary: "Recognizable vendor token prefix (GitHub, Slack, Google API key)",
    scan(line) {
      const patterns = [
        /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g, // GitHub personal/OAuth/app tokens
        /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g, // Slack tokens
        /\bAIza[0-9A-Za-z_-]{35}\b/g, // Google API keys
      ];
      return patterns.flatMap((pattern) => line.match(pattern) || []);
    },
  },
  {
    id: "credential-assignment",
    summary: "Credential-shaped key assigned a literal, non-placeholder value",
    scan(line) {
      // Matches both quoted ("key": "value") and unquoted (key: value) forms,
      // since unquoted scalars are the normal YAML style used by this
      // repo's own artifacts (agent.yaml, resources.yaml, tools.yaml).
      const pattern =
        /\b(?:api[_-]?key|apikey|access[_-]?key|secret[_-]?key|secret|client[_-]?secret|private[_-]?key|password|passwd|auth[_-]?token|session[_-]?token|token)\b\s*[:=]\s*(?:(['"])([^'"\n]{8,})\1|([^\s'"#][^\s#]{7,}))/gi;
      const findings = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const isQuoted = match[2] !== undefined;
        const rawValue = isQuoted ? match[2] : match[3];
        // Trailing punctuation from surrounding syntax (YAML flow braces,
        // JS statement terminators) is not part of an unquoted value.
        const value = isQuoted ? rawValue : rawValue.replace(/[,;)\]}]+$/, "");
        // A quoted literal that contains whitespace is prose ("token: "the
        // shared secret between two parties""), not an assigned credential
        // value. Unquoted values can't contain whitespace by construction.
        if (/\s/.test(value)) continue;
        if (isPlaceholderValue(value)) continue;
        // match[0] always ends with rawValue (quoted: wrapped in quote
        // chars included in rawValue's surrounding match; unquoted: bare).
        // Slice by rawValue's length, not the trimmed value's, so trailing
        // punctuation dropped from `value` is also dropped from the report.
        const suffixLength = isQuoted ? rawValue.length + 2 : rawValue.length;
        const keyAndOperator = match[0].slice(0, match[0].length - suffixLength);
        findings.push(`${keyAndOperator}${isQuoted ? `"${value}"` : value}`);
      }
      return findings;
    },
  },
  {
    id: "private-ipv4",
    summary: "RFC1918 private-use or link-local IPv4 address",
    scan(line) {
      const patterns = [
        /\b10(?:\.\d{1,3}){3}\b/g,
        /\b172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}\b/g,
        /\b192\.168(?:\.\d{1,3}){2}\b/g,
        /\b169\.254(?:\.\d{1,3}){2}\b/g,
      ];
      return patterns.flatMap((pattern) => line.match(pattern) || []);
    },
  },
  {
    id: "internal-hostname-tld",
    summary: "Hostname-shaped label ending in an internal-only TLD (.internal/.corp/.lan/.intranet/.local)",
    scan(line) {
      const pattern = /\b[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:internal|corp|lan|intranet|local)\b/g;
      return line.match(pattern) || [];
    },
  },
  {
    id: "bare-http-host",
    summary: "http(s):// URL whose host is a single label (no dot) other than localhost",
    scan(line) {
      const pattern = /https?:\/\/([a-zA-Z0-9-]+)(?::\d+)?(?:[/?#"'\s>]|$)/g;
      const findings = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const host = match[1];
        if (host.toLowerCase() === "localhost") continue;
        findings.push(match[0]);
      }
      return findings;
    },
  },
  {
    id: "non-placeholder-email",
    summary: "Email address outside the documented example domains",
    scan(line) {
      const pattern = /\b[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
      const allowedDomains = new Set(["example.com", "example.org", "example.net", "example.invalid", "example.edu"]);
      const findings = [];
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const domain = match[1].toLowerCase();
        if (allowedDomains.has(domain)) continue;
        findings.push(match[0]);
      }
      return findings;
    },
  },
];

// --- File discovery ------------------------------------------------------

function listTrackedFiles() {
  const output = execFileSync("git", ["ls-files", "-z"], { cwd: repoRoot, encoding: "utf8" });
  return output.split("\0").filter(Boolean);
}

function isBinary(buffer) {
  const sampleLength = Math.min(buffer.length, 8000);
  for (let i = 0; i < sampleLength; i += 1) {
    if (buffer[i] === 0) return true;
  }
  return false;
}

// --- Scan ------------------------------------------------------------------

function scanFile(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const buffer = fs.readFileSync(absolutePath);
  if (isBinary(buffer)) return [];

  const lines = buffer.toString("utf8").split("\n");
  const findings = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineNumber = i + 1;

    if (line.includes(ALLOW_LINE_MARKER)) continue;
    if (i > 0 && lines[i - 1].includes(ALLOW_NEXT_LINE_MARKER)) continue;

    for (const rule of RULES) {
      const matches = rule.scan(line);
      for (const matched of matches) {
        findings.push({
          file: relativePath,
          line: lineNumber,
          ruleId: rule.id,
          summary: rule.summary,
          matched,
        });
      }
    }
  }

  return findings;
}

const trackedFiles = listTrackedFiles();
const allFindings = trackedFiles.flatMap(scanFile);

if (allFindings.length > 0) {
  console.error(`public safety scan found ${allFindings.length} finding(s):\n`);
  for (const finding of allFindings) {
    console.error(`  ${finding.file}:${finding.line} [${finding.ruleId}] ${finding.summary}`);
    console.error(`    matched: ${finding.matched}`);
  }
  console.error(
    `\nIf a finding is a reviewed false positive, mark it explicitly:\n` +
      `  - add "${ALLOW_LINE_MARKER}" on the offending line, or\n` +
      `  - add "${ALLOW_NEXT_LINE_MARKER}" on the line above it.\n` +
      `Do not delete or rewrite this scanner to make a finding disappear.`
  );
  process.exitCode = 1;
} else {
  console.log(`public safety scan passed, no findings across ${trackedFiles.length} tracked files`);
}
