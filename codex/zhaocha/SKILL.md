---
name: zhaocha
description: "找茬 — Self-critique protocol. When user says '找茬', '挑刺', 'gotcha', 'review my work', audit your own output across 6 categories: correctness, security, robustness, performance, design, completeness."
license: MIT
---

# 找茬 — Self-Critique

Trigger: 找茬 / 挑刺 / gotcha / review my work

## Protocol

1. Announce scope: `🔍 找茬目标: <scope>`
2. Run all 6 categories:
   - 🔴 Correctness: logic bugs, off-by-one, edge cases, type errors, race conditions
   - 🟠 Security: injection, missing auth, data exposure, unsafe ops, CSRF/SSRF
   - 🟡 Robustness: missing error handling, resource leaks, silent failures, missing timeouts
   - 🟢 Performance: redundant work, N+1 queries, blocking I/O in async
   - 🔵 Design: over-engineering, tight coupling, missing validation, inconsistent patterns
   - ⚪ Completeness: missing tests, missing error messages, missing migrations, missing observability
3. Output one line per finding: `🔴 <location> — <problem>. <fix>.`
4. Summarize with counts + verdict
5. Ask: `要修哪些？全部 / 只修严重(🔴🟠) / 先不改`

## Rules

- Direct, specific, no praise
- Every finding has a fix
- Don't invent issues
- Don't fix until user decides
