#!/usr/bin/env node
// zhaocha — SessionStart activation hook
// Injects 找茬 self-critique instruction into every session

const fs = require('fs');
const path = require('path');

// Read SKILL.md from the installed skill location
const skillPaths = [
  path.join(__dirname, '..', 'skills', 'zhaocha', 'SKILL.md'),           // user install
  path.join(__dirname, '..', '..', 'skills', 'zhaocha', 'SKILL.md'),      // plugin install
];

let skillContent = '';
for (const p of skillPaths) {
  try {
    skillContent = fs.readFileSync(p, 'utf8');
    break;
  } catch (e) {}
}

if (!skillContent) {
  // Fallback: minimal 找茬 rule
  skillContent = `---
name: zhaocha
description: "找茬 — After answering, re-examine your output. Find any problems, flaws, or missing considerations. Think critically. Append your critique after your response."
---

# 找茬

回答用户问题后，重新审视你的输出。找出任何问题、漏洞、遗漏。批判地思考。把审查结果追加在回复后面。

Output:

\`\`\`
<answer>

---
🔍 找茬:
<your critique — anything wrong, missing, or could be better>
\`\`\`
`;
}

// Strip YAML frontmatter
const body = skillContent.replace(/^---[\s\S]*?---\s*/, '');

const output = 'ZHAOCHA ACTIVE — After every response, re-examine your output critically.\n\n' + body;

process.stdout.write(output);
