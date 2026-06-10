---
description: "关闭找茬"
---

1. 在当前项目创建 `.claude/zhaocha-off.local.md` marker 文件，当前对话立即停用
2. 从 `~/.claude/settings.json` 删除 zhaocha hook 条目：
   - `hooks.SessionStart[0].hooks` 中删除 `zhaocha-activate.js`
   - `hooks.UserPromptSubmit[0].hooks` 中删除 `zhaocha-user-prompt-submit.js`
   - `hooks.Stop[0].hooks` 中删除 `zhaocha-auto-stop.js`（如存在）
3. 确认 JSON 有效
