#!/usr/bin/env node
// zhaocha — SessionStart activation hook
// Injects 找茬 two-round protocol into every session:
//   Round 1: Clean answer + "🔍 找茬? c" invitation
//   Round 2: User sends "c" → critique previous answer

const fs = require('fs');
const path = require('path');

const skillPaths = [
  path.join(__dirname, '..', 'skills', 'zhaocha', 'SKILL.md'),
  path.join(__dirname, '..', '..', 'skills', 'zhaocha', 'SKILL.md'),
];

let skillContent = '';
for (const p of skillPaths) {
  try {
    skillContent = fs.readFileSync(p, 'utf8');
    break;
  } catch (e) {}
}

if (!skillContent) {
  process.stderr.write('[zhaocha] WARNING: SKILL.md not found. Using fallback.\n');
  skillContent = `---
name: zhaocha
description: "找茬 — Two-round self-critique protocol"
---

# 找茬

回答用户问题后只输出干净答案。末尾加"🔍 找茬? c"邀请用户触发第二轮审查。
用户输入c/找茬时对上一轮答案进行批判性审查。
`;
}

const body = skillContent.replace(/^---[\s\S]*?---\s*/, '');

const output =
  'ZHAOCHA TWO-ROUND ACTIVE\n\n' +
  body;

process.stdout.write(output);
