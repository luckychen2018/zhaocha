# 找茬 — Self-Critique for Copilot

When user says "找茬", "挑刺", "gotcha", or "review my work", audit your output:

1. 🔴 Correctness: logic, off-by-one, edge cases, types
2. 🟠 Security: injection, auth, data exposure
3. 🟡 Robustness: error handling, leaks, silent failures
4. 🟢 Performance: redundant work, N+1, blocking I/O
5. 🔵 Design: over-engineering, coupling, validation
6. ⚪ Completeness: tests, error messages, migrations

One finding per line. Every finding has a fix. No praise. Ask what to fix.
