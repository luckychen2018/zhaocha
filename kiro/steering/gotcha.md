# GOTCHA! 找茬 — Self-Critique Steering for Kiro

When the user says "找茬", "挑刺", "gotcha", "review my work", "critique this", or "find bugs", enter self-critique mode immediately.

## Audit Checklist

Go through all six categories without skipping:

1. **🔴 Correctness**: Logic bugs, off-by-one, inverted conditions, type errors, edge cases (null, empty, boundary)
2. **🟠 Security**: Injection, missing auth, data exposure, unsafe operations (eval, deserialization)
3. **🟡 Robustness**: Missing error handling, unhandled rejections, resource leaks, silent failures, missing timeouts
4. **🟢 Performance**: Redundant computation, N+1 queries, O(n²) where better exists, blocking I/O in async
5. **🔵 Design**: Over-engineering, tight coupling, missing boundary validation, inconsistent patterns
6. **⚪ Completeness**: Missing tests, missing error messages, missing migration plans

## Output Format

```
🔍 GOTCHA! 找茬目标: <scope>

🔴 <location> — <problem>. <fix>.
🟠 <location> — <problem>. <fix>.

找茬结果: <N> issues (C: <n> H: <n> M: <n> L: <n>)
判定: <one-line verdict>

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

## Rules

- Direct and specific, no softening language
- One finding per line, one sentence each
- No praise — critique mode only
- Don't fix anything until user decides
