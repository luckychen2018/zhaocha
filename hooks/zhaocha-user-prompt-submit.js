#!/usr/bin/env node
// zhaocha — UserPromptSubmit hook
// Detects "c"/"找茬" trigger words and injects critique-round context.
// On real questions, injects clean-answer reminder.

const TRIGGERS = new Set(['c', '找茬', 'zhaocha', '挑刺', 'gotcha']);

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').trim();
    const promptLower = prompt.toLowerCase();

    if (TRIGGERS.has(prompt) || TRIGGERS.has(promptLower)) {
      // Critique round — model should review its previous answer
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'UserPromptSubmit',
          additionalContext:
            'ZHAOCHA CRITIQUE ROUND: Critically review your PREVIOUS answer. ' +
            'Find problems, bugs, edge cases, security issues, missing considerations. ' +
            'Be harsh and thorough. One finding per line. ' +
            'Format: "🔍 找茬:" then bullet list. ' +
            'Do NOT add "找茬? c" at the end of critique. ' +
            'Wait for next real question.'
        }
      }));
    } else if (prompt.length > 0) {
      // Real question — remind model to give clean answer + invitation
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'UserPromptSubmit',
          additionalContext:
            'ZHAOCHA: Clean answer. No inline self-critique. ' +
            'End answer with "🔍 找茬? c"'
        }
      }));
    }
  } catch (e) {
    // Silent fail — never block user input
  }
});
