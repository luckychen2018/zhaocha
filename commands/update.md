---
description: "升级 zhaocha 到最新版本"
---

1. 进入项目目录 `D:/12.股票/zhaocha`
2. `git pull` 拉取最新代码
3. 复制升级文件到 `~/.claude/`：
   - `hooks/zhaocha-activate.js` → `~/.claude/hooks/zhaocha-activate.js`
   - `hooks/zhaocha-user-prompt-submit.js` → `~/.claude/hooks/zhaocha-user-prompt-submit.js`
   - `hooks/zhaocha-auto-stop.js` → `~/.claude/hooks/zhaocha-auto-stop.js`
4. 报告升级了哪些文件、版本变化
