---
description: "找茬 — /zhaocha:on to enable, /zhaocha:off to disable, /zhaocha:update to upgrade."
argument-hint: "[on|off|update]"
---

- **on** — 开启找茬两轮交互。检查 `~/.claude/settings.json`:
  1. SessionStart hook: 确认 `zhaocha-activate.js` 条目存在，不存在则添加
  2. UserPromptSubmit hook: 确认 `zhaocha-user-prompt-submit.js` 条目存在，不存在则添加
  
  SessionStart 条目:
  ```json
  {
    "type": "command",
    "command": "\"D:\\js\\Node.js\\node.exe\" \"C:\\Users\\ch\\.claude\\hooks\\zhaocha-activate.js\"",
    "timeout": 5,
    "statusMessage": "Loading 找茬 mode..."
  }
  ```
  
  UserPromptSubmit 条目:
  ```json
  {
    "type": "command",
    "command": "\"D:\\js\\Node.js\\node.exe\" \"C:\\Users\\ch\\.claude\\hooks\\zhaocha-user-prompt-submit.js\"",
    "timeout": 5
  }
  ```
  添加完成后确认 JSON 格式有效，用户下次启动 Claude Code 后自动生效。

- **off** — 关闭找茬。在 `hooks.SessionStart[0].hooks` 和 `hooks.UserPromptSubmit[0].hooks` 数组中删除 zhaocha 对应条目。确认 JSON 格式有效，下次启动生效。

- **update** — 升级 zhaocha 到最新版本：
  1. 找到 zhaocha 项目目录（检查 `D:/12.股票/zhaocha`、`~/zhaocha`、或搜索 `zhaocha-activate.js`）
  2. `cd <项目目录> && git pull` 拉最新代码
  3. 复制升级文件到 `~/.claude/`：
     - `hooks/zhaocha-activate.js` → `~/.claude/hooks/zhaocha-activate.js`
     - `hooks/zhaocha-user-prompt-submit.js` → `~/.claude/hooks/zhaocha-user-prompt-submit.js`
     - `commands/zhaocha.md` → `~/.claude/commands/zhaocha.md`
     - `skills/zhaocha/SKILL.md` → `~/.claude/skills/zhaocha/SKILL.md`
  4. 确认 settings.json 中同时有 SessionStart 和 UserPromptSubmit 两个 hook 条目
  5. 报告升级了哪些文件、版本变化
