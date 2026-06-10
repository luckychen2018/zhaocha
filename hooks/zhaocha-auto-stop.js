#!/usr/bin/env node
'use strict';

// zhaocha-auto-stop — Stop hook for auto-critique 2-round loop
// Follows same pattern as ralph-loop: block exit → inject reason → Claude processes → approve
// State file .claude/zhaocha-auto.local.md tracks which round we're in.
// Checks .claude/zhaocha-off.local.md — if exists, approves exit (session-level off).

const fs = require('fs');
const path = require('path');

const STATE_FILE = '.claude/zhaocha-auto.local.md';
const OFF_MARKER = '.claude/zhaocha-off.local.md';
const TRIGGERS = new Set(['c', '找茬', 'zhaocha', '挑刺', 'gotcha']);

function log(msg) {
  process.stderr.write('[zhaocha-auto-stop] ' + msg + '\n');
}

function isDisabled(cwd) {
  try { return fs.existsSync(path.join(cwd, OFF_MARKER)); } catch (e) { return false; }
}

function readState(cwd) {
  try {
    const content = fs.readFileSync(path.join(cwd, STATE_FILE), 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    const state = {};
    match[1].split(/\r?\n/).forEach(line => {
      const idx = line.indexOf(':');
      if (idx > 0) state[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
    return state;
  } catch (e) { return null; }
}

function writeState(cwd, state) {
  const dir = path.join(cwd, '.claude');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const yaml = Object.entries(state).map(([k, v]) => k + ': ' + v).join('\n');
  fs.writeFileSync(path.join(cwd, STATE_FILE), '---\n' + yaml + '\n---\n', 'utf-8');
}

function isRealQuestion(prompt) {
  const trimmed = (prompt || '').trim();
  if (trimmed.length === 0) return false;
  return !TRIGGERS.has(trimmed) && !TRIGGERS.has(trimmed.toLowerCase());
}

function getLastUserMessage(transcriptPath) {
  try {
    const content = fs.readFileSync(transcriptPath, 'utf-8');
    const lines = content.split(/\r?\n/);
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (!line) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.role === 'user') {
          const msgContent = obj.message && obj.message.content;
          if (Array.isArray(msgContent)) {
            for (const block of msgContent) {
              if (block.type === 'text' && block.text) return block.text;
            }
          } else if (typeof msgContent === 'string' && msgContent) {
            return msgContent;
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
  return '';
}

var input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk) { input += chunk; });
process.stdin.on('end', function() {
  try {
    var hookData = JSON.parse(input);
    var sessionId = hookData.session_id || '';
    var transcriptPath = hookData.transcript_path || '';
    var cwd = process.cwd();

    if (isDisabled(cwd)) {
      log('DISABLED (marker exists)');
      process.stdout.write(JSON.stringify({ decision: 'approve' }));
      return;
    }

    var state = readState(cwd);

    if (state && state.active === 'true') {
      if (state.session_id === sessionId) {
        log('State found (same session) → cleanup + approve');
        try { fs.unlinkSync(path.join(cwd, STATE_FILE)); } catch (e) {}
        process.stdout.write(JSON.stringify({ decision: 'approve' }));
        return;
      }
      log('STALE state (diff session) → cleanup + continue');
      try { fs.unlinkSync(path.join(cwd, STATE_FILE)); } catch (e) {}
    }

    if (!transcriptPath || !fs.existsSync(transcriptPath)) {
      log('No transcript → approve');
      process.stdout.write(JSON.stringify({ decision: 'approve' }));
      return;
    }

    var lastUserMsg = getLastUserMessage(transcriptPath);
    log('Last user msg: "' + lastUserMsg.substring(0, 100) + '"');

    if (isRealQuestion(lastUserMsg)) {
      log('Real question → BLOCK with critique');
      writeState(cwd, {
        active: 'true',
        session_id: sessionId,
        started_at: new Date().toISOString()
      });
      process.stdout.write(JSON.stringify({
        continue: true,
        decision: 'block',
        reason: 'ZHAOCHA CRITIQUE ROUND: Critically review your PREVIOUS answer. Find problems, bugs, edge cases, security issues, missing considerations. Be harsh and thorough. One finding per line. Format: "🔍 找茬:" then bullet list. Do NOT wait for next question. Output critique NOW.',
        systemMessage: '🔍 Auto-找茬: triggering critique round...'
      }));
    } else {
      log('Not a real question → approve');
      process.stdout.write(JSON.stringify({ decision: 'approve' }));
    }
  } catch (e) {
    log('ERROR: ' + e.message);
    process.stdout.write(JSON.stringify({ decision: 'approve' }));
  }
});
