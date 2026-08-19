# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-08-19

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-08-19: no changes — no price drift on any stored field across all four providers; no new or missing tracked models; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA (provisionals retained); xAI batch/search/X-search/collections columns absent from extraction again (~7th consecutive audit, carried forward); GPT-5.3 Codex model pricing captured this run and matched stored exactly, though its batch columns were still absent (consistent with its no-discount batch policy); manual review: Claude Haiku 3 (still absent from Anthropic's table since 05-28), gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split
- 2026-08-16: added Gemini 3.7 Flash (google, $0.75/$3.75/MTok promotional rate thru 2026-12-31, cache $0.075, batch $0.375/$1.875, 1M context, 65536 max output, real AA score 56 — no provisional needed); Gemini 3.6 Flash cut to the same promotional rate ($1.50/$7.50→$0.75/$3.75, cache $0.15→$0.075, batch $0.75/$3.75→$0.375/$1.875), reverting to the old figures on 2027-01-01 per Google's page; no other price drift on any stored field across all four providers; xAI Grok 4.6 confirmed context-tiered above 200K ($4/$1/$12); xAI batch/search/X-search/collections columns and OpenAI GPT-5.3 Codex both absent from extraction again (carried forward); GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA (provisionals retained); manual review: Claude Haiku 3 (still absent from Anthropic's table), gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split
- 2026-08-13: added Grok 4.6 (xAI, $2/$6/MTok, cache $0.50, batch $1/$3 computed at xAI's standard 50% batch discount since the batch column was absent from this run's extraction, 500K context, real AA score 61 — no provisional needed); resolved Claude Sonnet 5's 2026-09-01 step-up manual-review item — Anthropic's pricing page now states the $2/$10 launch price "is now the standard price" and the scheduled $3/$15 increase will not occur; no other price drift on any stored field across all four providers; xAI's Grok 4.20 now also shows separately-listed but identically-priced "reasoning"/"non-reasoning"/"multi-agent" rows with a "-0309" suffix — flagged for manual review, not auto-split; xAI batch/search/X-search/collections columns absent from extraction again (carried forward); manual review: Claude Haiku 3 (still absent from Anthropic's table), gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split
- 2026-08-10: no changes
- 2026-08-07: no changes
<!-- audit-history-end -->
