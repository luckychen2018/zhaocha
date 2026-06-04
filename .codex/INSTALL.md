# Install GOTCHA! 找茬 for Codex CLI

## One-command install (git clone + symlink)

```bash
# Clone the repo
git clone https://github.com/luckychen2018/Gotcha /tmp/gotcha-skill

# Install skill
mkdir -p ~/.codex/skills/gotcha
cp /tmp/gotcha-skill/codex/gotcha/SKILL.md ~/.codex/skills/gotcha/SKILL.md

# Install command alias (optional)
mkdir -p ~/.codex/prompts
cp /tmp/gotcha-skill/commands/gotcha.md ~/.codex/prompts/gotcha.md

# Cleanup
rm -rf /tmp/gotcha-skill
```

## Manual install

```bash
mkdir -p ~/.codex/skills/gotcha
curl -o ~/.codex/skills/gotcha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/codex/gotcha/SKILL.md

mkdir -p ~/.codex/prompts
curl -o ~/.codex/prompts/gotcha.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/commands/gotcha.md
```

## Project-level install

```bash
mkdir -p .agents/skills/gotcha
curl -o .agents/skills/gotcha/SKILL.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/codex/gotcha/SKILL.md

mkdir -p .agents/prompts
curl -o .agents/prompts/gotcha.md \
  https://raw.githubusercontent.com/luckychen2018/Gotcha/main/commands/gotcha.md
```

## Trigger

- **Auto trigger**: Say "找茬", "gotcha", "review my work" — skill description matching
- **Direct call**: Type `$gotcha` in conversation
- **Manual prompt**: Type `/prompts:gotcha` in conversation
