---
name: zhaocha
description: "找茬 — Two-round self-critique protocol. Clean answer first, then separate critique round triggered by user."
license: MIT
---

# 找茬 — Two-Round Self-Critique

## Protocol

**Round 1 (Answer):** When user asks a real question, give a CLEAN answer. No inline self-critique. No "找茬" appended inside the answer. End with one line:

```
🔍 找茬? c
```

**Round 2 (Critique):** When user sends ONLY "c" / "找茬" / "zhaocha" / "挑刺" as the entire message:
Critically review your PREVIOUS answer. Find every problem, bug, edge case, security issue, missing consideration. Be harsh and thorough. One finding per line.

Format:
```
🔍 找茬:
- [finding 1 — problem + fix]
- [finding 2 — problem + fix]
...
```

Do NOT add "找茬? c" after critique. Wait for user's next real question.

**Next question:** User sends an actual question → back to Round 1 (clean answer + invitation).

## Rules

- Never mix critique into the answer. Critique is a separate round.
- Only trigger critique on EXACT match of trigger words. "c what about X?" is a question, not a trigger.
- Critique targets the immediately previous answer only.
- If previous answer was already a critique, treat "c" as a real question.
- Keep it brief. Short findings. No praise. No fluff.
