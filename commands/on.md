---
description: "开启找茬两轮交互"
---

1. 删除当前项目 `.claude/zhaocha-off.local.md`（如存在），当前对话立即生效
2. 检查 `~/.claude/settings.json`，确认以下 hook 存在（不存在则添加）：

SessionStart:
```json
{
  "type": "command",
  "command": "\"D:\\js\\Node.js\\node.exe\" \"C:\\Users\\ch\\.claude\\hooks\\zhaocha-activate.js\"",
  "timeout": 5,
  "statusMessage": "Loading 找茬 mode..."
}
```

UserPromptSubmit:
```json
{
  "type": "command",
  "command": "\"D:\\js\\Node.js\\node.exe\" \"C:\\Users\\ch\\.claude\\hooks\\zhaocha-user-prompt-submit.js\"",
  "timeout": 5
}
```

确认 JSON 有效，下次启动自动生效。
