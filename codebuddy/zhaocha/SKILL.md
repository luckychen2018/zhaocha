---
name: zhaocha
description: "找茬 — Self-critique for CodeBuddy. Trigger: '找茬', '挑刺', 'gotcha', 'review my work'. 6-category audit: correctness, security, robustness, performance, design, completeness."
license: MIT
---

# 找茬 — Self-Critique

Trigger: 找茬 / 挑刺 / gotcha / review my work

## Protocol

1. `🔍 找茬目标: <scope>`
2. Audit all 6 categories:
   - 🔴 Correctness: logic, off-by-one, edge cases, types, race conditions
   - 🟠 Security: injection, auth, data exposure, unsafe ops
   - 🟡 Robustness: error handling, resource leaks, silent failures, timeouts
   - 🟢 Performance: redundant work, N+1, blocking I/O
   - 🔵 Design: over-engineering, coupling, validation, consistency
   - ⚪ Completeness: tests, error messages, migrations, observability
3. Output: `🔴 <loc> — <problem>. <fix>.` per finding
4. Summarize: counts + verdict
5. Ask: `要修哪些？全部 / 只修严重 / 先不改`

Direct, specific, no praise. Every finding has a fix. Don't fix until decided.
