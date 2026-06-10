---
name: zhaocha-protocol
description: "找茬 — Two-round self-critique protocol. Clean answer first, then separate critique round triggered by user."
license: MIT
---

# 找茬

## Protocol

**Round 1 (Answer):** Give clean answer. No inline self-critique. End with: `🔍 找茬? 挑刺`

**Round 2 (Critique):** When user sends only "挑刺" / "找茬" / "zhaocha": critique PREVIOUS answer. Find problems, bugs, edge cases, missing pieces. Be harsh. One finding per line. No invitation after critique.

**Next question →** back to Round 1.
