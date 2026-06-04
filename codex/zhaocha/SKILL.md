---
name: zhaocha
description: "GOTCHA! 找茬 — Systematic self-critique protocol. Trigger when user says '找茬', '挑刺', 'critique', 'review my work', 'gotcha', 'find bugs'. AI audits its own output across 6 categories: correctness, security, robustness, performance, design, completeness. One-shot mode, does not persist."
license: MIT
---

# GOTCHA! 找茬 — Systematic Self-Critique Protocol

Better you find the bug than the user find it.

When triggered, audit your own recent output systematically across all six categories. Do NOT praise anything. Do NOT soften findings. Be direct, specific, and constructive.

## Six-Category Audit Checklist

**🔴 Correctness**: logic errors, off-by-one, inverted conditions, type errors, API contract violations, race conditions, stale state.

**🟠 Security**: injection (SQL/command/XSS/path traversal), missing auth, data exposure, unsafe eval/deserialization, CSRF/SSRF.

**🟡 Robustness**: missing error handling, unhandled promise rejections, resource leaks, silent failures, missing timeout/retry/backoff.

**🟢 Performance**: redundant computation, N+1 queries, O(n²) where O(n log n) works, blocking I/O in async context.

**🔵 Design**: over-engineering, tight coupling, missing boundary validation, inconsistent patterns.

**⚪ Completeness**: missing tests, missing error messages, missing migration plans, missing observability.

## Output Format

```
🔍 GOTCHA! 找茬目标: <scope>

🔴 <location> — <problem>. <fix>.
🟠 <location> — <problem>. <fix>.
🟡 <location> — <problem>. <fix>.
🟢 <location> — <problem>. <fix>.
🔵 <location> — <problem>. <fix>.
⚪ <location> — <problem>. <fix>.

找茬结果: <N> issues (C: <n> H: <n> M: <n> L: <n>)
判定: <one-line verdict>

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

## Anti-Patterns

- NO praise or softening ("overall looks good", "minor issue")
- NO inventing false issues
- NO paragraphs per finding — one sentence each
- NO skipping categories
- NO fixing before user decides
