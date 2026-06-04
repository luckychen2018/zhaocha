# GOTCHA! 找茬 — 安装指南

## Claude Code

### 方法一：插件市场安装（推荐）

```bash
claude plugin marketplace add luckychen2018/Gotcha
claude plugin install gotcha@gotcha-skills
```

### 方法二：源码安装

```bash
git clone https://github.com/luckychen2018/Gotcha ~/.claude/plugins/gotcha
```

然后在 `~/.claude/plugins/installed_plugins.json` 中注册。

### 方法三：项目级安装

```bash
mkdir -p .claude/skills/gotcha
cp skills/gotcha/SKILL.md .claude/skills/gotcha/
```

## OpenAI Codex CLI

```bash
mkdir -p ~/.codex/skills/gotcha
curl -o ~/.codex/skills/gotcha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/codex/gotcha/SKILL.md
```

## CodeBuddy

```bash
mkdir -p ~/.codebuddy/skills/gotcha
curl -o ~/.codebuddy/skills/gotcha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/codebuddy/gotcha/SKILL.md
```

## Cursor

```bash
mkdir -p .cursor/rules
curl -o .cursor/rules/gotcha.mdc \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/cursor/rules/gotcha.mdc
```

## Kiro

```bash
mkdir -p .kiro/steering
curl -o .kiro/steering/gotcha.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/kiro/steering/gotcha.md
```

## VSCode Copilot

```bash
mkdir -p .github
curl -o .github/copilot-instructions.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/vscode/copilot-instructions.md
```

然后在 VSCode 设置中启用 `github.copilot.chat.codeGeneration.useInstructionFiles`。

## 触发方式

安装后，在对话中说 **"找茬"**、**"gotcha"**、**"挑刺"** 或 **"review my work"** 即可触发自我审查。

## 更新

```bash
# Claude Code
claude plugin marketplace update
claude plugin update gotcha@gotcha-skills

# 源码安装
cd ~/.claude/plugins/gotcha && git pull

# 手动安装 — 重新下载对应文件覆盖
```
