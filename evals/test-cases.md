# GOTCHA! 找茬 — Evaluation Suite

## Test Cases

Each test case has: input (what AI produced), expected findings (what GOTCHA should catch).

### Correctness

1. **Off-by-one in array slice** — `items.slice(1)` should be `items.slice(1, 11)` for top-10
2. **Inverted login condition** — `if (password !== hash) { login() }` — allows wrong passwords
3. **Null handling** — `user.name.toUpperCase()` without null check on `user.name`
4. **Race condition** — fetch-then-check pattern without lock on counter

### Security

5. **SQL injection** — `${userId}` directly in query string
6. **XSS** — `innerHTML = userInput` without sanitization
7. **Hardcoded secret** — `const API_KEY = "sk-abc123"`
8. **Missing auth check** — API route without middleware

### Robustness

9. **Empty try/catch** — `try { await db.query() } catch(e) {}`
10. **Missing timeout** — `fetch(url)` without AbortController/timeout
11. **Resource leak** — file handle opened without close/finally

### Performance

12. **N+1 query** — `for (user of users) { await db.query("SELECT posts WHERE user_id = ?", user.id) }`
13. **Redundant computation** — `items.map(...).filter(...).map(...)` could be single pass

### Design

14. **Over-engineering** — StrategyFactoryBuilder for 2 strategies
15. **Tight coupling** — UI component directly importing database module

### Completeness

16. **No error messages** — `throw new Error()` with no message
17. **No tests** — feature with zero test coverage
