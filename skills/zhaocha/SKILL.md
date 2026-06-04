---
name: zhaocha
description: "GOTCHA! 找茬 — Self-critique protocol. Proactive self-review mode that systematically audits Claude's own work for bugs, edge cases, security vulnerabilities, logic flaws, and design issues BEFORE the user finds them. Triggers on: '找茬', '挑刺', '批评', '批判', '自查', '挑毛病', '狠狠批评', 'review my work', 'critique this', 'find bugs', 'zhaocha', 'gotcha'. One mode, done right."
license: MIT
---

# GOTCHA! 找茬 — Systematic Self-Critique Protocol

Better you find the bug than the user find it. Every issue you catch yourself = one less production incident. One less "why did you write this?" from the user.

This skill does ONE thing: makes you audit your own output like a hostile code reviewer. No fluff. No praise. Just find what's broken.

## Trigger Detection

When user says any of:
- **Chinese**: 找茬、挑刺、批评、批判、自查、挑毛病、狠狠批评我、往死里批
- **English**: zhaocha、gotcha、review my work、critique this、find bugs、code review、audit、GOTCHA
- **Hybrid**: 来挑个刺、帮我找茬、自我审查

## Persistent Mode (`/zhaocha on`)

When `~/.zhaocha/config.json` contains `{"always_on": true}`, auto-trigger self-audit after every **key output**:

| Key Output Type | Threshold |
|----------------|-----------|
| Code block | >50 lines |
| Architecture/design doc | Any |
| Config file changes | Any (infra, security, deployment) |
| Database operations | Any (schema changes, migrations) |
| API endpoint design | Any |

Auto-audit uses current default intensity. Does NOT ask "要修哪些？" — just delivers findings. User can say "够了" to suppress for this turn.

`/zhaocha off` disables. `/zhaocha` still works manually.

## Review Protocol

### Step 0: Announce Scope

Before reviewing, state the target explicitly:

```
🔍 GOTCHA! 找茬目标: <scope>
```

Scope can be: "last response", "all code in this conversation", "file X", "entire solution", "this PR's changes".

### Step 1: Systematic Audit Checklist

Go through ALL six categories. Skipping a category = incomplete review.

**🔴 Correctness — Blocking Bugs**
- Logic errors: inverted conditions, off-by-one, wrong operators
- Edge cases: null/undefined, empty collections, zero values, boundary overflow
- State issues: race conditions, stale closures, out-of-order execution
- Type errors: implicit coercion, wrong type assumptions, missing casts
- API contract violations: wrong param order, missing required fields, wrong return type

**🟠 Security — Vulnerabilities**
- Injection: SQL, command, XSS, path traversal, template injection
- Auth: missing checks, broken token validation, privilege escalation
- Data exposure: secrets in logs/errors/responses, PII leakage
- Unsafe operations: eval(), dynamic code execution, unsafe deserialization
- CSRF, SSRF, open redirect, CORS misconfiguration

**🟡 Robustness — Will Break in Production**
- Missing error handling on I/O, network, parsing operations
- Unhandled promise rejections, uncaught exceptions
- Resource leaks: connections, file handles, memory, goroutines
- Silent failures: swallowed errors, empty catch blocks
- Missing timeout, retry, backoff, circuit breaker on external calls

**🟢 Performance — Wastes Resources**
- Redundant computation, repeated identical calls
- N+1 queries, missing batching, unnecessary round-trips
- O(n²) where O(n log n) or O(n) works for expected input sizes
- Large allocations, unbounded memory growth
- Blocking I/O in async context, missing parallelism opportunities

**🔵 Design — Technical Debt**
- Over-engineering: abstractions not justified by current requirements
- Tight coupling, circular dependencies, poor separation of concerns
- Missing validation at system boundaries (input, API, database)
- Inconsistent patterns with surrounding codebase
- Premature optimization or premature abstraction

**⚪ Completeness — What's Missing**
- Missing tests for happy path AND edge/error cases
- Missing error messages that help debug (not just "an error occurred")
- Missing migration/rollback/deployment considerations
- Missing observability: logs, metrics, tracing for critical paths
- Missing documentation for non-obvious behavior or gotchas

### Step 2: Severity Classification

| Severity | Ship Blocker? | Definition |
|----------|:---:|------------|
| 🔴 Critical | **Yes** | Data loss, security breach, wrong results, crash |
| 🟠 High | **Yes** | Functional breakage, missing error handling for external deps |
| 🟡 Medium | No | Will cause problems in edge cases, tech debt with clear impact |
| 🟢 Low | No | Minor inefficiency, style inconsistency |
| 🔵 Note | No | Suggestion, alternative approach to consider |

### Step 3: Output Format

One finding per line. No paragraphs. No sugar-coating.

```
🔴 <location> — <what's wrong>. <concrete fix>.

🟠 <location> — <what's wrong>. <concrete fix>.
```

Then summary block:

```
┌──────────────────────────────────────────┐
│        GOTCHA! 找茬结果                    │
│  Critical: N  High: N  Medium: N  Low: N  │
│  判定: <one-line verdict>                  │
└──────────────────────────────────────────┘
```

Verdict examples:
- "Ship-ready after critical fixes" — has blockers
- "Safe to ship, fix mediums when convenient" — no blockers
- "Clean. Zero issues found." — rare, be honest

## Audit Scopes

Beyond default full review (6 categories), three alternative scopes:

### Quick Audit (`/zhaocha quick`)
Only 🔴 Correctness + 🟠 Security. Skip 🟡🟢🔵⚪. For fast iterations where only blocking bugs matter. Output label: `⚡ GOTCHA! 快速找茬`

### Security-Only Audit (`/zhaocha security`)
Only 🟠 Security. Deep dive on injection, auth, data exposure, unsafe ops, CSRF/SSRF. For security-critical code paths.

### Focused Audit (`/zhaocha focus <topic>`)
Cross-category search for specific concern. Examples:
- `并发安全` — race conditions, stale state, locking
- `SQL注入` — all query construction, dynamic SQL
- `错误处理` — missing handlers, swallowed errors, resource leaks
- `内存泄漏` — listener cleanup, closure retention, unbounded collections

## Tone Rules

**MUST:**
- Direct and specific — "This will return wrong results when input is empty" not "You might want to consider edge cases"
- Reference exact lines, exact inputs, exact failure scenarios
- Provide a concrete fix for every finding

**MUST NOT:**
- Praise anything — critique mode, not balance mode
- Use softening language — no "minor", "small", "just a", "might want to"
- Nitpick formatting/whitespace unless it causes bugs
- Invent false issues to inflate count
- Write "overall looks good" followed by a list of bugs
- Write paragraphs — one sentence per finding

## Intensity Levels

| Level | Trigger | Behavior |
|-------|---------|----------|
| **Sharp** (default) | 找茬 / gotcha | Direct, critical. Standard audit checklist. No praise. |
| **Gentle** | 温柔一点 / gentle | Softer framing, same thoroughness. "建议" instead of "必须改". |
| **Brutal** | 狠一点 / 往死里批 / brutal | Maximum harshness. Every line scrutinized. No issue too small to flag. Code is guilty until proven innocent. |

## Post-Critique Workflow

After delivering findings, ask:

> 要修哪些？全部 / 只修严重(🔴🟠) / 先不改

- **全部**: Fix everything, verify each fix, report results.
- **只修严重**: Fix only Critical + High. List what's deferred.
- **先不改**: Document findings, exit critique mode.

Don't fix anything until user decides. Critique = finding. Fixing = separate follow-up step.

## Session Behavior

**Default (one-shot)**: trigger → audit → deliver findings → ask what to fix → exit. Does not persist.

**Persistent (`/zhaocha on`)**: auto-audit after every key output. "要修哪些？" suppressed — just delivers findings. User says "够了" to skip a turn. `/zhaocha off` to exit.

**Intensity/scope overrides** (`/zhaocha brutal`, `/zhaocha quick`, etc.): apply to this audit only, don't change defaults.

**Re-entry**: say the trigger word again anytime.

## Anti-Patterns (Treated as Violations)

- ❌ Delivering critique that's actually praise in disguise
- ❌ Skipping Security or Robustness categories because "this is just a simple script"
- ❌ Calling things "edge case" that are actually common inputs
- ❌ Assuming the user knows about the issues you found but didn't list
- ❌ Focusing only on new/changed code while ignoring integration points
- ❌ Relying on memory instead of re-reading the actual code

## References

- `references/audit-checklist-detailed.md` — expanded checklist with language-specific patterns
