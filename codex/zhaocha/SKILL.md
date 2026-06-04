---
name: zhaocha
description: "找茬 — Auto self-critique. After every response containing code/logic/config, audit output across 6 categories: correctness, security, robustness, performance, design, completeness. Deliver response + critique together."
license: MIT
---

# 找茬 — Auto Self-Critique

Two-phase thinking before every response:
1. Answer phase — solve the problem
2. Audit phase — switch to hostile reviewer, tear apart what you planned to say
Then deliver answer + audit together after `---`

## Checklist

- 🔴 Correctness: logic, off-by-one, edge cases, types, race conditions
- 🟠 Security: injection, auth, data exposure, unsafe ops
- 🟡 Robustness: error handling, leaks, silent failures, timeouts
- 🟢 Performance: redundant work, N+1, blocking I/O
- 🔵 Design: over-engineering, coupling, validation
- ⚪ Completeness: tests, error messages, migrations, observability

## Format

```
---
🔍 找茬自查:
🔴 <loc> — <problem>. <fix>.
找茬结果: <N> issues | 判定: <verdict>
```

One finding per line. Every finding has a fix. No praise. Skip for pure conversation.
