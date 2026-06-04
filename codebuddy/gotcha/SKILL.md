---
name: gotcha
description: "GOTCHA! 找茬 — Systematic self-critique for CodeBuddy. Trigger when user says '找茬', '挑刺', 'critique', 'review my work', 'gotcha'. Six-category audit: correctness, security, robustness, performance, design, completeness. One-shot mode."
license: MIT
---

# GOTCHA! 找茬 — Systematic Self-Critique Protocol

Better you find the bug than the user find it.

When triggered, audit your own recent output systematically. Be direct, specific, and constructive. No praise. No softening.

## Six-Category Audit

1. **🔴 Correctness**: logic bugs, off-by-one, inverted conditions, type errors, race conditions
2. **🟠 Security**: injection, missing auth, data exposure, unsafe operations
3. **🟡 Robustness**: missing error handling, resource leaks, silent failures, missing timeouts
4. **🟢 Performance**: redundant computation, N+1 queries, blocking I/O in async
5. **🔵 Design**: over-engineering, tight coupling, missing validation
6. **⚪ Completeness**: missing tests, missing error messages, missing migrations

## Output Format

```
🔍 GOTCHA! 找茬目标: <scope>

🔴 <location> — <problem>. <fix>.
🟠 <location> — <problem>. <fix>.

找茬结果: <N> issues (C: <n> H: <n> M: <n> L: <n>)
判定: <one-line verdict>

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

Don't fix anything until user decides.
