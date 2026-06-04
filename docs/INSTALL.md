# GOTCHA! 找茬 — 安装指南

## Claude Code

### 方法一：插件市场安装（推荐）

```bash
claude plugin marketplace add luckychen2018/zhaocha
claude plugin install zhaocha@zhaocha-skills
```

### 方法二：源码安装

```bash
git clone https://github.com/luckychen2018/zhaocha ~/.claude/plugins/zhaocha
```

然后在 `~/.claude/plugins/installed_plugins.json` 中注册。

### 方法三：项目级安装

```bash
mkdir -p .claude/skills/zhaocha
cp skills/zhaocha/SKILL.md .claude/skills/zhaocha/
```

## OpenAI Codex CLI

```bash
mkdir -p ~/.codex/skills/zhaocha
curl -o ~/.codex/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/codex/zhaocha/SKILL.md
```

## CodeBuddy

```bash
mkdir -p ~/.codebuddy/skills/zhaocha
curl -o ~/.codebuddy/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/codebuddy/zhaocha/SKILL.md
```

## Cursor

```bash
mkdir -p .cursor/rules
curl -o .cursor/rules/zhaocha.mdc \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/cursor/rules/zhaocha.mdc
```

## Kiro

```bash
mkdir -p .kiro/steering
curl -o .kiro/steering/zhaocha.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/kiro/steering/zhaocha.md
```

## VSCode Copilot

```bash
mkdir -p .github
curl -o .github/copilot-instructions.md \
  https://raw.githubusercontent.com/luckychen2018/zhaocha/main/vscode/copilot-instructions.md
```

然后在 VSCode 设置中启用 `github.copilot.chat.codeGeneration.useInstructionFiles`。

## 触发方式

安装后，在对话中说 **"找茬"**、**"zhaocha"**、**"挑刺"** 或 **"review my work"** 即可触发自我审查。

## 更新

```bash
# Claude Code
claude plugin marketplace update
claude plugin update zhaocha@zhaocha-skills

# 源码安装
cd ~/.claude/plugins/zhaocha && git pull

# 手动安装 — 重新下载对应文件覆盖
```
