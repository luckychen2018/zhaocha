# GOTCHA! 找茬

<p align="center">
  <h3 align="center">🔍 GOTCHA! 找茬 — 在用户之前找到你的 Bug</h3>
</p>

**[🇺🇸 English](README.md)** | **🇨🇳 中文**

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-black?style=flat-square&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/OpenAI_Codex_CLI-412991?style=flat-square&logo=openai&logoColor=white" alt="OpenAI Codex CLI">
  <img src="https://img.shields.io/badge/Cursor-000?style=flat-square&logo=cursor&logoColor=white" alt="Cursor">
  <img src="https://img.shields.io/badge/CodeBuddy-00B2FF?style=flat-square&logo=tencent-qq&logoColor=white" alt="CodeBuddy">
  <img src="https://img.shields.io/badge/VSCode_Copilot-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white" alt="VSCode Copilot">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License">
</p>

> 最好的 Bug 是你自己找到的那个。GOTCHA 让你的 AI 学会自我审查——系统化、不留情面地找出问题，在用户看到之前。

一个 AI Coding Agent 技能，触发**结构化自我审查协议**。当你说"找茬"或"zhaocha"时，AI 变成自己最严厉的代码审查员——逐行审计 bug、边界 case、安全漏洞、设计缺陷。支持 **Claude Code**、**OpenAI Codex CLI**、**CodeBuddy**、**Cursor**、**Kiro** 和 **VSCode (GitHub Copilot)**。

## 痛点

AI 编程助手天生乐观。它们交付的代码"看起来对"：

| 失败模式 | 例子 |
|---------|------|
| **漏边界** | 1 条数据正常，0 条数据崩溃 |
| **跳安全** | 没人 review 的 helper 里藏着 SQL 注入 |
| **吞错误** | `try { ... } catch {}` — 吃掉异常，装作一切正常 |
| **过度工程** | 3 行函数套了 AbstractFactoryBuilderDelegator |
| **缺异常处理** | 假设 API 永远返回 200 |
| **不完整** | 交付了功能，忘了 migration |

## 解决方案

**找茬** 每次回复后自动自查。Claude 回答 → 立刻自我审查 → 一起交付。不用额外触发。答案和质量检查，一条消息同时到达。

## 快速安装

### Claude Code

```bash
claude plugin marketplace add luckychen2018/zhaocha
claude plugin install zhaocha@zhaocha-skills
```

或手动安装：

```bash
git clone https://github.com/luckychen2018/zhaocha ~/.claude/plugins/zhaocha
```

### OpenAI Codex CLI

```bash
mkdir -p ~/.codex/skills/zhaocha
curl -o ~/.codex/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/codex/zhaocha/SKILL.md
```

### 其他平台

详见 [README.md](README.md) 各平台安装说明。

## 工作原理

### 六大审查类别

| 类别 | 检查内容 |
|------|---------|
| 🔴 **正确性** | 逻辑 bug、差一错误、条件反转、类型错误 |
| 🟠 **安全性** | 注入漏洞、认证缺失、数据暴露、不安全操作 |
| 🟡 **健壮性** | 缺异常处理、资源泄漏、静默失败 |
| 🟢 **性能** | N+1 查询、冗余计算、异步上下文中的阻塞 I/O |
| 🔵 **设计** | 过度工程、紧耦合、缺边界校验 |
| ⚪ **完整性** | 缺测试、缺错误信息、缺 migration 计划 |

### 输出示例

```
🔍 GOTCHA! 找茬目标: 上一次回复（用户认证中间件）

🔴 src/auth.ts:42 — Token 过期用 `<` 而非 `<=`，恰好在过期时刻的 token 会被拒。改为 `<=`。
🟠 src/auth.ts:38 — JWT secret 从 process.env 读取，无启动检查。加启动校验。
🟡 src/auth.ts:55 — db.query() 无超时，可能永久挂起。加 5s 查询超时。
🟢 src/auth.ts:67 — 密码哈希每次请求都算，即使缓存命中。移到缓存命中分支内。

┌──────────────────────────────────────────┐
│        GOTCHA! 找茬结果                    │
│  Critical: 1  High: 1  Medium: 1  Low: 1  │
│  判定: 先修严重问题再上线                    │
└──────────────────────────────────────────┘

要修哪些？全部 / 只修严重(🔴🟠) / 先不改
```

## 触发词

| 语言 | 触发词 |
|------|-------|
| 中文 | 找茬、挑刺、批评、批判、自查、挑毛病、狠狠批评我 |
| 英文 | zhaocha、gotcha、review my work、critique this、find bugs、audit |
| 混合 | 来挑个刺、帮我找茬、自我审查 |

## 理念

**"自己发现的 bug 好过用户发现的 bug。"**

GOTCHA 不是消极批判——是彻底审查。每个你自查出来的问题：
- 省去用户调试你输出的时间
- 避免线上事故
- 用可证明的质量建立信任
- 让你知道自己容易漏什么

这个 skill 刻意设计为**一次性**，非持久模式。需要审查时触发，审查完决定修什么。简洁。干净。零开销。

## 与 PUA 的对比

| | PUA | GOTCHA |
|---|---|---|
| **目的** | 逼 AI 不放弃 | 逼 AI 找自己的 bug |
| **触发** | 反复失败、用户不满 | 用户说"找茬/gotcha" |
| **使用场景** | AI 卡住、被动、摆烂 | AI 产出内容需要 review |
| **方法论** | 压力升级 L0-L4 | 6 类系统审计 |
| **持续性** | 可常驻 | 一次性，按需触发 |
| **作用域** | 调试过程 | 交付质量 |

两者互补：PUA 管**过程**，GOTCHA 管**产出**。

## License

MIT

## 作者

[luckychen2018](https://github.com/luckychen2018)
