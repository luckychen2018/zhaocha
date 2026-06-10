---
description: "找茬 — /zhaocha:on 开启 /zhaocha:off 关闭 /zhaocha:update 升级"
argument-hint: "[on|off|update]"
---

- **on** — 开启找茬自动挑刺。
  1. 删除当前项目 `.claude/zhaocha-off.local.md`，当前对话立即生效
  2. 检查 `~/.claude/settings.json`，确认三个 hook 都存在：
     - SessionStart: zhaocha-activate.js
     - UserPromptSubmit: zhaocha-user-prompt-submit.js
     - Stop: zhaocha-auto-stop.js
     不存在则添加。工作流：提问→回答→自动挑刺→停止。

- **off** — 关闭找茬。
  1. 创建当前项目 `.claude/zhaocha-off.local.md`，当前对话立即停用。Hook 配置保留不动，下次 `/zhaocha:on` 即恢复。

- **update** — 升级到最新版。cd D:/12.股票/zhaocha && git pull，复制 hooks/*.js 到 ~/.claude/hooks/，复制 commands/zhaocha.md 到 ~/.claude/commands/。
