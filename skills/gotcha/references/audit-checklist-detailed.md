# GOTCHA! 找茬 — Detailed Audit Checklist

Language-specific patterns and examples for each audit category.

## 🔴 Correctness

### JavaScript/TypeScript
- `==` vs `===` — implicit coercion bugs
- `undefined` vs `null` — inconsistent null checks
- `Array.sort()` without compare function — lexicographic sort of numbers
- `parseInt` without radix — `parseInt("08")` = 0 in old engines
- Floating point comparisons — `0.1 + 0.2 !== 0.3`
- `typeof null === "object"` — null checks needed
- Async function called without `await`
- Promise not returned or awaited
- `for...in` iterates prototype chain
- `switch(true)` pattern without `break`

### Python
- Mutable default arguments — `def f(x=[])`
- Late binding closures in loops
- `is` vs `==` — identity vs equality
- Floating point precision
- Timezone-naive datetime comparisons
- `except:` without specific exception type
- List/dict modified during iteration
- `re.match` vs `re.search` — match anchors at start

### SQL
- `WHERE` clause missing on `UPDATE`/`DELETE`
- `NULL` comparisons — `= NULL` instead of `IS NULL`
- Implicit type conversion in comparisons
- Missing `BEGIN TRANSACTION` / `COMMIT`
- `COUNT(*)` vs `COUNT(column)` — NULL handling

### General
- Off-by-one in loops and slice/range boundaries
- Integer overflow/underflow
- Empty collection, null, zero-value edge cases
- Boundary values (max, min, -1, 0, 1)
- Concurrent modification of shared state
- Order-dependent logic without explicit ordering

## 🟠 Security

### Injection Vectors
- SQL: concatenated queries, dynamic table/column names
- Command: `exec()`, `system()`, `subprocess` with user input
- XSS: unescaped user content in HTML/JS context
- Path traversal: `../` in file paths from user input
- Template injection: user input in template strings
- Regex DoS: catastrophic backtracking patterns

### Authentication & Authorization
- Missing auth check on endpoints
- Token validation bypass (none, expired, wrong audience)
- Password in logs/errors/URLs
- Hardcoded credentials
- Weak random (Math.random for tokens)
- Missing rate limiting on auth endpoints

### Data Exposure
- Secrets in error messages or stack traces
- PII in logs
- Debug endpoints in production
- Internal IPs/ports in responses
- Verbose error details to client

### Unsafe Operations
- `eval()`, `new Function()`, `exec()` with any input
- `JSON.parse` of untrusted input without try/catch
- `child_process.exec` with string (shell injection)
- Deserialization of untrusted data
- Dynamic imports with user-controlled paths

## 🟡 Robustness

### Error Handling
- Empty catch blocks swallowing errors
- Catching `Exception`/`Error` too broadly
- Not checking error type before handling
- Throwing raw strings instead of Error objects
- Missing `.catch()` on promise chains
- Async functions without try/catch

### Resource Management
- File handles not in try-with-resources / context manager
- DB connections not returned to pool
- Network sockets not closed on error
- Event listeners not removed
- Timers/intervals not cleared
- Streaming responses not consumed/destroyed

### Resilience
- No timeout on external HTTP/DB calls
- No retry with backoff on transient failures
- No circuit breaker for failing dependencies
- No graceful shutdown handlers
- No health check endpoint
- Assuming external service is always available

## 🟢 Performance

### Database
- N+1 queries (query inside loop)
- Missing index for WHERE/JOIN columns
- `SELECT *` when only need few columns
- No pagination on large result sets
- Multiple single-row queries instead of batch

### Computation
- Repeated identical calculations (cache miss)
- Sorting when only need top-N
- Deep clone of large objects unnecessarily
- Regular expression in tight loop (precompile)
- String concatenation in loop (use array/builder)

### I/O & Network
- Blocking I/O in async context
- Sequential requests where parallel possible
- No connection reuse/pooling
- Large payloads without compression
- No caching for repeated expensive operations

### Memory
- Unbounded collections (no max size)
- Large object retention (closure references)
- Memory leak from uncleaned listeners
- Loading entire file/result set into memory

## 🔵 Design

### Over-Engineering
- Abstract class for single implementation
- Factory for simple object construction
- Interface with one implementation
- Configuration for things that never change
- Plugin architecture for 2 plugins
- Builder pattern for 3 property object

### Coupling
- Circular imports
- Module A importing from Module B and vice versa
- Business logic in UI/data layer
- Hardcoded environment-specific values
- Direct filesystem/network access in domain logic

### Validation
- No input validation at API boundaries
- Trusting database constraints as sole validation
- No output sanitization
- Missing content-type checking
- No max length on user input fields

### Consistency
- Mixed error handling patterns (callbacks + promises)
- Mixed sync/async in same function
- Different naming conventions in same module
- Inconsistent parameter order across similar functions

## ⚪ Completeness

### Testing
- No tests for error paths
- No tests for edge cases (empty, max, boundary)
- No integration test for external dependencies
- Tests that don't assert anything meaningful
- Only happy path covered

### Error Messages
- Generic "an error occurred" without context
- No error codes for programmatic handling
- No actionable guidance in error messages
- Stack traces exposed to end users
- Missing logging context (user ID, request ID, timestamp)

### Operations
- No database migration scripts
- No rollback plan documented
- No feature flag for risky changes
- No monitoring/metrics for new functionality
- No alert thresholds defined
- No runbook for failure scenarios
