---
description: "GOTCHA! 找茬 — Systematic self-critique. Use when you want Claude to audit its own output for bugs, edge cases, security issues, and design flaws. Trigger by typing /zhaocha or saying '找茬'/'zhaocha'/'挑刺'/'review my work'."
argument-hint: "[sharp|gentle|brutal]"
---

根据参数选择审查强度：

- **无参数** — 启动默认 Sharp 级别审查（直接、批判、无糖衣）
- **sharp** — 同默认
- **gentle** — Gentle 级别（温和语气，同等深度）
- **brutal** — Brutal 级别（极致严苛，每行有罪推定）

## 执行规则

1. 用 Skill tool 加载 `zhaocha` skill
2. 严格遵循 SKILL.md 中的 6 类审查清单
3. 审查完成后输出完整报告 + 修复选择
4. 不做任何修复，等用户决定
