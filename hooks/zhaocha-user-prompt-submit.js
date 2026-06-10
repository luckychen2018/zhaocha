#!/usr/bin/env node
// zhaocha — UserPromptSubmit hook
// Detects trigger words → injects critique context.
// On real questions → injects clean-answer reminder.
// Checks .claude/zhaocha-off.local.md — if exists, does nothing.

const fs = require('fs');
const path = require('path');

const TRIGGERS = new Set(['c', '找茬', 'zhaocha', '挑刺', 'gotcha']);

if (fs.existsSync(path.join(process.cwd(), '.claude', 'zhaocha-off.local.md'))) {
  process.exit(0);
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').trim();
    const promptLower = prompt.toLowerCase();

    if (TRIGGERS.has(prompt) || TRIGGERS.has(promptLower)) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'UserPromptSubmit',
          additionalContext:
            'ZHAOCHA CRITIQUE ROUND: Critically review your PREVIOUS answer. ' +
            'Find problems, bugs, edge cases, security issues, missing considerations. ' +
            'Be harsh and thorough. One finding per line. ' +
            'Format: "🔍 找茬:" then bullet list. ' +
            'Wait for next real question.'
        }
      }));
    } else if (prompt.length > 0) {
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'UserPromptSubmit',
          additionalContext:
            'ZHAOCHA: Clean answer. No inline self-critique.'
        }
      }));
    }
  } catch (e) {}
});
