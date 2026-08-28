# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-08-28

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-08-28: no changes — no price drift on any stored field across all four providers; no new or missing *current-generation* tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard again returned only variant-suffixed rows for Claude models — no scores rewritten; xAI batch/search/X-search/collections columns absent again (~10th consecutive audit, carried forward); OpenAI GPT-5.3 Codex row captured and matched stored exactly; discovered OpenAI's pricing page also lists a full legacy catalog (gpt-5, gpt-5.1, gpt-5.2, gpt-5.2-pro, gpt-4o, gpt-4.1-nano) under "Flagship models" — deliberately not added, these are previous-generation models outside this project's current-gen scope (sources.md gotcha 30); manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity, OpenAI legacy-catalog scope decision
- 2026-08-25: no changes — no price drift on any stored field across all four providers; no new or missing tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard again returned only variant-suffixed rows ("Opus 5 (max)" [63], "Fable 5 (with fallback)" [62], "Sonnet 5 (max)" [55]) — no scores rewritten; xAI batch/search/X-search/collections columns absent again (~9th consecutive audit, carried forward); OpenAI GPT-5.3 Codex row captured and matched stored exactly, batch columns still absent; Grok 4.20 naming split still unresolved; manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity
- 2026-08-22: OpenAI cut GPT-5.6 Sol standard pricing ($5/$0.50/$30 → $4/$0.40/$20 in/cache/out, batch $2.50/$15→$2/$10), confirmed via two independent targeted re-fetches while Terra/Luna matched stored exactly; no other price drift across any provider; no new or missing tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard now returns only variant-suffixed rows ("Sonnet 5 (max)", "Fable 5 (with fallback)") for some models instead of a plain base name — no scores rewritten from these, flagged as manual review; xAI batch/search/X-search/collections columns absent again (~8th consecutive audit, carried forward); manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity
- 2026-08-19: no changes — no price drift on any stored field across all four providers; no new or missing tracked models; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA (provisionals retained); xAI batch/search/X-search/collections columns absent from extraction again (~7th consecutive audit, carried forward); GPT-5.3 Codex model pricing captured this run and matched stored exactly, though its batch columns were still absent (consistent with its no-discount batch policy); manual review: Claude Haiku 3 (still absent from Anthropic's table since 05-28), gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split
- 2026-08-16: added Gemini 3.7 Flash (google, $0.75/$3.75/MTok promotional rate thru 2026-12-31, cache $0.075, batch $0.375/$1.875, 1M context, 65536 max output, real AA score 56 — no provisional needed); Gemini 3.6 Flash cut to the same promotional rate ($1.50/$7.50→$0.75/$3.75, cache $0.15→$0.075, batch $0.75/$3.75→$0.375/$1.875), reverting to the old figures on 2027-01-01 per Google's page; no other price drift on any stored field across all four providers; xAI Grok 4.6 confirmed context-tiered above 200K ($4/$1/$12); xAI batch/search/X-search/collections columns and OpenAI GPT-5.3 Codex both absent from extraction again (carried forward); GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA (provisionals retained); manual review: Claude Haiku 3 (still absent from Anthropic's table), gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split
<!-- audit-history-end -->
