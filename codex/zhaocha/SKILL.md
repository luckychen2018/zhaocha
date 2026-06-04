---
name: zhaocha
description: "找茬 — Auto self-critique. After every response containing code/logic/config, audit output across 6 categories: correctness, security, robustness, performance, design, completeness. Deliver response + critique together."
license: MIT
---

# 找茬 — Auto Self-Critique

After every response containing code, logic, config, or design decisions, self-audit:

1. Answer user normally
2. Audit using 6-category checklist
3. Append findings after `---`

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
