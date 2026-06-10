#!/bin/bash
# zhaocha-auto-stop — Stop hook (bash, follows ralph-loop pattern)
# Reads stdin hook input, checks transcript, blocks or approves.

set -euo pipefail

HOOK_INPUT=$(cat)
STATE_FILE=".claude/zhaocha-auto.local.md"
OFF_MARKER=".claude/zhaocha-off.local.md"

if [[ -f "$OFF_MARKER" ]]; then
  exit 0
fi

HOOK_SESSION=$(echo "$HOOK_INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('session_id',''))" 2>/dev/null || echo "")

if [[ -f "$STATE_FILE" ]]; then
  STATE_SESSION=$(sed -n '/^session_id:/{s/session_id: *//;p;}' "$STATE_FILE")
  if [[ "$STATE_SESSION" == "$HOOK_SESSION" ]]; then
    rm "$STATE_FILE"
    exit 0
  fi
  rm "$STATE_FILE"
fi

TRANSCRIPT_PATH=$(echo "$HOOK_INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('transcript_path',''))" 2>/dev/null || echo "")

if [[ -z "$TRANSCRIPT_PATH" ]] || [[ ! -f "$TRANSCRIPT_PATH" ]]; then
  exit 0
fi

# Get last user message from transcript
LAST_USER=$(python3 -c "
import json, sys
with open(sys.argv[1], 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.read().strip().split('\n')
for line in reversed(lines):
    line = line.strip()
    if not line: continue
    try:
        obj = json.loads(line)
        if obj.get('role') == 'user':
            content = obj.get('message', {}).get('content', [])
            if isinstance(content, list):
                for b in content:
                    if isinstance(b, dict) and b.get('type') == 'text':
                        print(b.get('text', ''))
                        raise SystemExit(0)
            elif isinstance(content, str):
                print(content)
                raise SystemExit(0)
    except SystemExit: raise
    except: pass
print('')
" "$TRANSCRIPT_PATH" 2>/dev/null)

# Check if real question (not trigger word)
if [[ -n "$LAST_USER" ]]; then
  TRIM=$(echo "$LAST_USER" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  if [[ "$TRIM" != "c" && "$TRIM" != "zhaocha" && "$TRIM" != "gotcha" && "$TRIM" != "找茬" && "$TRIM" != "挑刺" ]]; then
    mkdir -p .claude
    cat > "$STATE_FILE" <<STATEEND
---
active: true
session_id: $HOOK_SESSION
started_at: $(date -u +%Y-%m-%dT%H:%M:%SZ)
---
STATEEND

    # Write JSON output with python3 to a temp file to avoid encoding issues
    python3 -c "
import json, sys
out = {
    'decision': 'block',
    'reason': 'ZHAOCHA CRITIQUE ROUND: Critically review your PREVIOUS answer. Find problems, bugs, edge cases, security issues, missing considerations. Be harsh and thorough. One finding per line. Output critique NOW.',
    'systemMessage': 'Auto-zhaocha: triggering critique round...'
}
sys.stdout.write(json.dumps(out))
" 2>/dev/null
  fi
fi

exit 0
