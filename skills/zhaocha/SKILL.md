---
name: zhaocha
description: "找茬 — Self-critique protocol. When user says '找茬', '挑刺', '请挑刺', 'gotcha', 'review my work', Claude audits its own recent output across 6 categories: correctness, security, robustness, performance, design, completeness. One trigger, one behavior, done right."
license: MIT
---

# 找茬 — Systematic Self-Critique

When triggered, audit your own recent output like a hostile code reviewer. Better you find the bug than the user.

## Trigger

User says: 找茬 / 挑刺 / 请挑刺 / 狠狠批评我 / gotcha / review my work / critique this / find bugs

## Protocol

### 1. Announce scope

```
🔍 找茬目标: <what you're reviewing>
```

### 2. Run the 6-category checklist

Go through ALL six. Don't skip.

**🔴 Correctness — blocking bugs**
Logic errors, off-by-one, inverted conditions, wrong types, missing edge cases (null, empty, boundary), race conditions, stale state, API contract violations.

**🟠 Security — vulnerabilities**
Injection (SQL, command, XSS, path traversal), missing auth/authz, data exposure in logs/errors, unsafe deserialization/eval, CSRF, SSRF, CORS misconfig.

**🟡 Robustness — will break in production**
Missing error handling on I/O/external calls, unhandled promise rejections, resource leaks (connections, file handles, memory), silent failures (empty catch), missing timeout/retry/backoff.

**🟢 Performance — wastes resources**
Redundant computation, N+1 queries, O(n²) where better exists, blocking I/O in async context, large allocations, unbounded memory growth.

**🔵 Design — technical debt**
Over-engineering for current requirements, tight coupling, missing validation at system boundaries, inconsistent patterns, premature abstraction.

**⚪ Completeness — what's missing**
Missing tests (happy + edge + error paths), missing actionable error messages, missing migration/rollback, missing observability (logs, metrics).

### 3. Output findings

One line per finding. No paragraphs. No softening.

```
🔴 <location> — <what's wrong>. <fix>.
🟠 <location> — <what's wrong>. <fix>.
🟡 <location> — <what's wrong>. <fix>.
🟢 <location> — <what's wrong>. <fix>.
🔵 <location> — <what's wrong>. <fix>.
⚪ <location> — <what's wrong>. <fix>.
```

### 4. Summarize

```
┌──────────────────────────────────────────┐
│           找茬结果                         │
│  Critical: N  High: N  Medium: N  Low: N  │
│  判定: <one-line verdict>                  │
└──────────────────────────────────────────┘

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

Verdict examples: "先修严重再上线" / "无阻塞问题" / "需重写"

## Rules

- Direct and specific — "This returns wrong results when input is empty" not "You might consider edge cases"
- Reference exact locations, inputs, scenarios
- Every finding has a concrete fix
- No praise. No "overall looks good". Critique mode only.
- No inventing false issues. Zero false positives.
- One finding per line. No essays.
- Don't fix until user decides what to fix.

## Anti-Patterns

- Skipping categories because "this is simple"
- Calling common inputs "edge cases"
- Softening findings with "minor" or "just a"
- Relying on memory instead of re-reading the actual code
