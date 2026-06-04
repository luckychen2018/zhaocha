---
description: "GOTCHA! 找茬 — Systematic self-critique. Use /zhaocha to audit AI output for bugs, edge cases, security issues, and design flaws. Sub-commands: on, off, sharp, gentle, brutal, quick, security, focus."
argument-hint: "[on|off|sharp|gentle|brutal|quick|security|focus]"
---

根据参数执行不同操作：

## 参数路由

**无参数** — 一次性完整审查（默认 Sharp 强度，6类全覆盖）。加载 `zhaocha` skill，立即审查最近的AI产出。

**on** — 开启常驻模式。将 `{"always_on": true}` 写入 `~/.zhaocha/config.json`。此后每次会话，AI 在关键输出后自动触发自查。关键输出定义：代码块 >50 行、架构设计方案、配置文件变更、数据库操作、API 设计。输出确认：
> [ZHAOCHA ON] 常驻审查已开启。关键输出后自动找茬。

**off** — 关闭常驻模式。写入 `{"always_on": false}`。输出确认：
> [ZHAOCHA OFF] 常驻审查已关闭。需要时手动 /zhaocha 触发。

强度控制：

- **sharp** — 锐利模式（默认）。直接批判，不废话。每行一个发现，无糖衣。
- **gentle** — 温和模式。"建议"代替"必须改"。同等深度，软语气。
- **brutal** — 暴击模式。极致严苛。代码有罪推定。每行都审。

范围控制：

- **quick** — 快速审查。只查 🔴 正确性 + 🟠 安全性。跳过健壮性/性能/设计/完整性。适合快速迭代中检查核心问题。
- **security** — 纯安全审计。注入、认证、数据暴露、不安全操作、CSRF/SSRF。不看性能/设计。
- **focus** `<关键词>` — 聚焦审查。只关注用户指定的主题。例如：`/zhaocha:focus 并发安全`、`/zhaocha:focus SQL注入`、`/zhaocha:focus 错误处理`。

## 执行规则

1. 先用 Skill tool 加载 `zhaocha` skill
2. on/off 操作直接完成，不触发审查
3. 强度参数设置本次审查强度，不会修改默认配置
4. 范围参数约束审查类别，不指定=全覆盖
5. focus 将审查聚焦于指定主题，跨类别检索相关内容
6. 审查完成后输出报告 + "要修哪些？"
7. 不修复任何问题，等用户决定
