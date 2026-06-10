---
description: "开启找茬自动挑刺模式（两轮闭环）"
---

先执行 on 的全部步骤。然后：

1. 复制 `hooks/zhaocha-auto-stop.js` 到 `~/.claude/hooks/zhaocha-auto-stop.js`
2. 在 `~/.claude/settings.json` 的 `hooks.Stop` 添加：

```json
{
  "type": "command",
  "command": "\"D:\\js\\Node.js\\node.exe\" \"C:\\Users\\ch\\.claude\\hooks\\zhaocha-auto-stop.js\""
}
```

工作流：用户提问 → Claude 干净回答 → 自动注入挑刺 → Claude 批判审查 → 停止。
