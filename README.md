# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-08-13

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-08-13: added Grok 4.6 (xAI, $2/$6/MTok, cache $0.50, batch $1/$3 computed at xAI's standard 50% batch discount since the batch column was absent from this run's extraction, 500K context, real AA score 61 — no provisional needed); resolved Claude Sonnet 5's 2026-09-01 step-up manual-review item — Anthropic's pricing page now states the $2/$10 launch price "is now the standard price" and the scheduled $3/$15 increase will not occur; no other price drift on any stored field across all four providers; xAI's Grok 4.20 now also shows separately-listed but identically-priced "reasoning"/"non-reasoning"/"multi-agent" rows with a "-0309" suffix — flagged for manual review, not auto-split; xAI batch/search/X-search/collections columns absent from extraction again (carried forward); manual review: Claude Haiku 3 (still absent from Anthropic's table), gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split
- 2026-08-10: no changes
- 2026-08-07: no changes
- 2026-08-04: no changes
- 2026-08-01: resolved four provisional intelligence scores on second consecutive consistent AA observations — GPT-5.6 Sol (61→59), GPT-5.6 Terra (58→55), GPT-5.6 Luna (50→51), Gemini 3.6 Flash (56→50), flags removed (note: 3.6 Flash now sorts below Gemini 3.5 Flash's stored 55 — an artifact of mixing bias-era and current AA readings, revisit if AA normalizes); no price drift on any stored field across all four providers, with Luna/GPT-5.5/5.4-Mini/5.4-Nano batch rows re-confirmed via targeted second extraction; a broad extraction's GPT-5.3 Codex batch reading ($0.88/$7) was disproven by targeted re-check — codex is absent from OpenAI's batch table entirely, stored no-discount values kept; xAI batch/search columns absent again (carried forward); AA bias pattern recurred (Fable 5 60 vs stored 65, Grok 4.3 36 vs 53) so no established scores rewritten; GPT-5.5 Pro and Grok 4.20 Multi-Agent still absent from AA (provisionals retained); manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Sonnet 5's 2026-09-01 step-up
<!-- audit-history-end -->
