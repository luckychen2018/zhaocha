# GOTCHA! 找茬

<p align="center">
  <h3 align="center">🔍 GOTCHA! — Catch Bugs Before Your Users Do</h3>
</p>

**[🇨🇳 中文](README.zh-CN.md)** | **🇺🇸 English**

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-black?style=flat-square&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/OpenAI_Codex_CLI-412991?style=flat-square&logo=openai&logoColor=white" alt="OpenAI Codex CLI">
  <img src="https://img.shields.io/badge/Cursor-000?style=flat-square&logo=cursor&logoColor=white" alt="Cursor">
  <img src="https://img.shields.io/badge/CodeBuddy-00B2FF?style=flat-square&logo=tencent-qq&logoColor=white" alt="CodeBuddy">
  <img src="https://img.shields.io/badge/VSCode_Copilot-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white" alt="VSCode Copilot">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License">
</p>

> The best bug is the one you find yourself. GOTCHA makes your AI audit its own output — systematically, mercilessly, before the user ever sees it.

An AI Coding Agent skill that triggers a **structured self-critique protocol**. When you say "找茬" or "zhaocha", your AI becomes its own harshest code reviewer — auditing every line for bugs, edge cases, security holes, and design flaws. Works with **Claude Code**, **OpenAI Codex CLI**, **CodeBuddy**, **Cursor**, **Kiro**, and **VSCode (GitHub Copilot)**.

## The Problem

AI coding agents are optimists. They ship code that "looks right" but:

| Failure Mode | Example |
|-------------|---------|
| **Misses edge cases** | Works for 1 item, breaks for 0 items |
| **Skips security** | SQL injection in the helper nobody reviews |
| **Silent failures** | `try { ... } catch {}` — swallows errors, continues like nothing happened |
| **Over-engineering** | AbstractFactoryBuilderDelegator for a 3-line function |
| **No error handling** | Assumes the API always returns 200 |
| **Incomplete** | Ships the feature, forgets the migration |

## The Solution

**GOTCHA! 找茬** is a one-shot self-audit protocol. Say the trigger word → AI systematically reviews its own work → delivers a categorized report → you decide what to fix.

Three steps:
1. **Trigger** — say "找茬" / "zhaocha" / "挑刺" / "review my work"
2. **Audit** — AI runs a 6-category systematic checklist
3. **Decide** — you choose: fix all / fix critical only / defer

## Quick Start

### Claude Code

```bash
claude plugin marketplace add luckychen2018/zhaocha
claude plugin install zhaocha@zhaocha-skills
```

Or manual install:

```bash
git clone https://github.com/luckychen2018/zhaocha ~/.claude/plugins/zhaocha
```

Then in `~/.claude/plugins/installed_plugins.json`:

```json
{
  "version": 2,
  "plugins": {
    "zhaocha@zhaocha-skills": [
      {
        "scope": "user",
        "installPath": "/Users/<you>/.claude/plugins/zhaocha",
        "version": "1.0.0"
      }
    ]
  }
}
```

### OpenAI Codex CLI

```bash
mkdir -p ~/.codex/skills/zhaocha
curl -o ~/.codex/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/codex/zhaocha/SKILL.md
```

### CodeBuddy

```bash
mkdir -p ~/.codebuddy/skills/zhaocha
curl -o ~/.codebuddy/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/codebuddy/zhaocha/SKILL.md
```

### Cursor

```bash
mkdir -p .cursor/rules
curl -o .cursor/rules/zhaocha.mdc \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/cursor/rules/zhaocha.mdc
```

## How It Works

### The Six-Category Audit

| Category | What It Finds |
|----------|--------------|
| 🔴 **Correctness** | Logic bugs, off-by-one, wrong conditions, type errors |
| 🟠 **Security** | Injection, missing auth, data exposure, unsafe operations |
| 🟡 **Robustness** | Missing error handling, resource leaks, silent failures |
| 🟢 **Performance** | N+1 queries, redundant work, blocking I/O in async context |
| 🔵 **Design** | Over-engineering, tight coupling, missing validation |
| ⚪ **Completeness** | Missing tests, missing error messages, missing migration plans |

### Three Intensity Levels

| Level | Trigger | Behavior |
|-------|---------|----------|
| **Sharp** (default) | 找茬 / zhaocha | Direct, critical. Full checklist. No praise. |
| **Gentle** | 温柔一点 | Softer framing. Same thoroughness. |
| **Brutal** | 狠一点 / 往死里批 | Maximum harshness. Every line guilty until proven innocent. |

### Example Output

```
🔍 GOTCHA! 找茬目标: last response (user auth middleware)

🔴 src/auth.ts:42 — Token expiry uses `<` not `<=`, rejects tokens at exact expiry boundary. Change to `<=`.
🟠 src/auth.ts:38 — JWT secret read from process.env without fallback check. Add startup validation.
🟡 src/auth.ts:55 — db.query() has no timeout, can hang indefinitely. Add 5s query timeout.
🟢 src/auth.ts:67 — Password hash computed on every request even when cache hit. Move inside cache-miss branch.

┌──────────────────────────────────────────┐
│        GOTCHA! 找茬结果                    │
│  Critical: 1  High: 1  Medium: 1  Low: 1  │
│  判定: Fix critical + high before shipping  │
└──────────────────────────────────────────┘

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

## Commands

| Command | What It Does |
|---------|-------------|
| `/zhaocha` | One-shot full audit (all 6 categories) |
| `/zhaocha on` | Persistent mode — auto-audit after key outputs |
| `/zhaocha off` | Disable persistent mode |
| `/zhaocha sharp` | Sharp intensity (default) — direct, critical |
| `/zhaocha gentle` | Gentle intensity — suggestions, no pressure |
| `/zhaocha brutal` | Brutal intensity — code guilty until proven innocent |
| `/zhaocha quick` | Fast audit — correctness + security only |
| `/zhaocha security` | Security-only deep dive |
| `/zhaocha focus <keyword>` | Focused audit — specific concern only |

## Trigger Words

| Language | Trigger Words |
|----------|--------------|
| Chinese | 找茬、挑刺、批评、批判、自查、挑毛病、狠狠批评我 |
| English | zhaocha、gotcha、review my work、critique this、find bugs、audit |
| Hybrid | 来挑个刺、帮我找茬、自我审查 |

## Philosophy

**"Better you find the bug than the user find it."**

GOTCHA is not about being negative — it's about being thorough. Every issue you catch yourself:
- Saves the user from debugging your output
- Prevents production incidents
- Builds trust through demonstrated quality
- Teaches you what you tend to miss

The skill is deliberately **one-shot**, not persistent. You trigger it when you want a review. After the review, you decide what to fix. Clean. Simple. No overhead.

## Multi-Platform Support

| Platform | Install Path | Trigger |
|----------|-------------|---------|
| **Claude Code** | Plugin marketplace or manual | Skill description matching |
| **Codex CLI** | `~/.codex/skills/zhaocha/SKILL.md` | Skill description matching + `$zhaocha` |
| **CodeBuddy** | `~/.codebuddy/skills/zhaocha/SKILL.md` | Skill description matching |
| **Cursor** | `.cursor/rules/zhaocha.mdc` | Agent Discretion (semantic matching) |
| **Kiro** | `.kiro/steering/zhaocha.md` | Steering file (auto) |
| **VSCode Copilot** | `.github/copilot-instructions.md` | Always-on instructions |

## Architecture

```
├── skills/zhaocha/SKILL.md        ← Core skill (Claude Code format)
├── commands/zhaocha.md            ← Slash command alias
├── codex/zhaocha/SKILL.md         ← Codex variant
├── codebuddy/zhaocha/SKILL.md     ← CodeBuddy variant
├── cursor/rules/zhaocha.mdc       ← Cursor rule
├── kiro/steering/zhaocha.md       ← Kiro steering file
├── vscode/                       ← VSCode Copilot instructions
├── agents/zhaocha-reviewer.md     ← Standalone review agent
├── plugin.json                   ← Plugin metadata
├── .claude-plugin/               ← Claude Code marketplace
└── .codebuddy-plugin/            ← CodeBuddy marketplace
```

## Comparison with PUA

| | PUA | GOTCHA |
|---|---|---|
| **Purpose** | Force AI to not give up | Force AI to find its own bugs |
| **Trigger** | Repeated failures, user frustration | User says "找茬/zhaocha" |
| **When to use** | AI is stuck, passive, or sloppy | AI has produced output you want reviewed |
| **Methodology** | Pressure escalation L0-L4 | 6-category systematic audit |
| **Persistence** | Can be always-on | One-shot, trigger when needed |
| **Scope** | Debugging process | Output quality |

They're complementary: PUA fixes the **process**, GOTCHA fixes the **output**.

## License

MIT

## Credits

By [luckychen2018](https://github.com/luckychen2018)
