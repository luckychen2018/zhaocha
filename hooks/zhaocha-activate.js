#!/usr/bin/env node
// zhaocha — SessionStart activation hook
// Injects 找茬 two-round protocol into every session.
// Checks .claude/zhaocha-off.local.md — if exists, does nothing (session-level off).

const fs = require('fs');
const path = require('path');

// Check if zhaocha is disabled in current project
if (fs.existsSync(path.join(process.cwd(), '.claude', 'zhaocha-off.local.md'))) {
  process.exit(0);
}

const protocol = `# 找茬 — Auto Two-Round Self-Critique

## Protocol

**Round 1 (Answer):** Give a CLEAN answer. No inline self-critique. Be direct and helpful. After you finish, the system will automatically trigger a critique round.

**Round 2 (Critique — auto-triggered):** Critically review your PREVIOUS answer. Find problems, bugs, edge cases, security issues, missing considerations. Be harsh and thorough. One finding per line.

Format:
\`\`\`
🔍 找茬:
- [finding — problem + fix]
\`\`\`

## Rules

- Never mix critique into the answer. Critique is a separate auto-triggered round.
- Critique targets the immediately previous answer only.
- Keep it brief. Short findings. No praise. No fluff.
`;

process.stdout.write('ZHAOCHA TWO-ROUND ACTIVE\n\n' + protocol);
