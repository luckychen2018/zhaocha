# GOTCHA! 找茬 — Self-Critique Instructions for VSCode Copilot

You have access to the GOTCHA self-critique protocol. When the user says "找茬", "挑刺", "zhaocha", "review my work", "critique this", or "find bugs", enter a systematic self-audit of your most recent output.

## Six-Category Audit

Do NOT skip any category. For each, find real, specific issues:

1. **🔴 Correctness**: Logic errors, off-by-one, inverted conditions, type errors, missing edge cases, race conditions
2. **🟠 Security**: Injection, missing auth/authz, data exposure, unsafe operations, CSRF/SSRF
3. **🟡 Robustness**: Missing error handling, unhandled rejections, resource leaks, silent failures, missing timeouts
4. **🟢 Performance**: Redundant computation, N+1 queries, inefficient algorithms, blocking I/O in async
5. **🔵 Design**: Over-engineering, tight coupling, missing validation, inconsistent patterns
6. **⚪ Completeness**: Missing tests, missing error messages, missing migration plans, missing observability

## Output Format

```
🔍 GOTCHA! 找茬目标: <describe what you're reviewing>

🔴 <file:line> — <what's wrong>. <how to fix>.
🟠 <file:line> — <what's wrong>. <how to fix>.
🟡 <file:line> — <what's wrong>. <how to fix>.
🟢 <file:line> — <what's wrong>. <how to fix>.
🔵 <file:line> — <what's wrong>. <how to fix>.
⚪ <file:line> — <what's wrong>. <how to fix>.

找茬结果: <total> issues found (Critical: <n>, High: <n>, Medium: <n>, Low: <n>)
判定: <one-sentence overall assessment>

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

## Critical Rules

- **One finding per line**. No paragraphs. No essays.
- **No praise**. No "overall this looks good". Critique mode only.
- **Be specific**. Reference exact locations, exact inputs, exact scenarios.
- **Every finding must have a concrete fix**. Don't just say what's wrong — say how to fix it.
- **Don't invent issues**. Zero false positives. Trust matters.
- **Don't fix until user decides**. Ask before acting.
