# GOTCHA! 找茬 — Frequently Asked Questions

## What's the difference between GOTCHA and PUA?

PUA focuses on the **debugging process**: when AI gets stuck, gives up, or produces sloppy work, PUA applies pressure to force better execution.
GOTCHA focuses on **output quality**: when AI has produced something, GOTCHA triggers a systematic review to find issues before the user does.

They're complementary. Use PUA while building. Use GOTCHA after building.

## When should I trigger GOTCHA?

Any time AI produces output you care about:
- After generating a non-trivial function or module
- After designing an architecture or data model
- After writing configuration or deployment code
- Before merging a PR the AI helped with
- When something "feels off" but you can't pinpoint it

## Does GOTCHA slow down my workflow?

GOTCHA is one-shot — you trigger it, review the findings, decide what to fix. No persistent overhead. The time spent reviewing is less than the time debugging issues that slip through.

## Can I use GOTCHA with other skills?

Yes. GOTCHA works alongside any other skill. It's a review layer, not a behavior modifier. Common combos:
- **GOTCHA + PUA**: PUA for execution, GOTCHA for output review
- **GOTCHA + caveman**: Caveman for communication style, GOTCHA for code quality

## Does GOTCHA work with all programming languages?

Yes. The six audit categories are language-agnostic. The detailed checklist in `references/` has language-specific patterns for JavaScript/TypeScript, Python, and SQL. More languages planned.

## Can I make GOTCHA always-on?

No. GOTCHA is intentionally one-shot. If you want persistent quality enforcement, consider combining GOTCHA (triggered review) with a code-review skill or CI pipeline.

## How is this different from `/code-review`?

Built-in `/code-review` reviews git diffs. GOTCHA reviews ALL output — not just code diffs, but also architecture decisions, configuration, documentation, and conversational analysis. And GOTCHA works across multiple AI coding platforms, not just Claude Code.

## What if GOTCHA finds nothing?

If your output is genuinely clean, GOTCHA should say so: "0 issues found." But this should be rare — most non-trivial output has at least one improvement opportunity. If you consistently get zero findings, you might be in "gentle" mode or not checking thoroughly.
