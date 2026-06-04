# Install GOTCHA! 找茬 for Codex CLI

## One-command install (git clone + symlink)

```bash
# Clone the repo
git clone https://github.com/luckychen2018/Gotcha /tmp/zhaocha-skill

# Install skill
mkdir -p ~/.codex/skills/zhaocha
cp /tmp/zhaocha-skill/codex/zhaocha/SKILL.md ~/.codex/skills/zhaocha/SKILL.md

# Install command alias (optional)
mkdir -p ~/.codex/prompts
cp /tmp/zhaocha-skill/commands/zhaocha.md ~/.codex/prompts/zhaocha.md

# Cleanup
rm -rf /tmp/zhaocha-skill
```

## Manual install

```bash
mkdir -p ~/.codex/skills/zhaocha
curl -o ~/.codex/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/codex/zhaocha/SKILL.md

mkdir -p ~/.codex/prompts
curl -o ~/.codex/prompts/zhaocha.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/commands/zhaocha.md
```

## Project-level install

```bash
mkdir -p .agents/skills/zhaocha
curl -o .agents/skills/zhaocha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/codex/zhaocha/SKILL.md

mkdir -p .agents/prompts
curl -o .agents/prompts/zhaocha.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/commands/zhaocha.md
```

## Trigger

- **Auto trigger**: Say "找茬", "zhaocha", "review my work" — skill description matching
- **Direct call**: Type `$zhaocha` in conversation
- **Manual prompt**: Type `/prompts:zhaocha` in conversation
