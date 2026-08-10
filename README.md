# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-08-10

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-08-10: no changes
- 2026-08-07: no changes
- 2026-08-04: no changes
- 2026-08-01: resolved four provisional intelligence scores on second consecutive consistent AA observations — GPT-5.6 Sol (61→59), GPT-5.6 Terra (58→55), GPT-5.6 Luna (50→51), Gemini 3.6 Flash (56→50), flags removed (note: 3.6 Flash now sorts below Gemini 3.5 Flash's stored 55 — an artifact of mixing bias-era and current AA readings, revisit if AA normalizes); no price drift on any stored field across all four providers, with Luna/GPT-5.5/5.4-Mini/5.4-Nano batch rows re-confirmed via targeted second extraction; a broad extraction's GPT-5.3 Codex batch reading ($0.88/$7) was disproven by targeted re-check — codex is absent from OpenAI's batch table entirely, stored no-discount values kept; xAI batch/search columns absent again (carried forward); AA bias pattern recurred (Fable 5 60 vs stored 65, Grok 4.3 36 vs 53) so no established scores rewritten; GPT-5.5 Pro and Grok 4.20 Multi-Agent still absent from AA (provisionals retained); manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Sonnet 5's 2026-09-01 step-up
- 2026-07-31: OpenAI cut GPT-5.6 Terra prices ($2.50/$15 → $2/$12 in/out, cache $0.25→$0.20, batch $1.25/$7.50 → $1/$6) and GPT-5.6 Luna prices 5x ($1/$6 → $0.20/$1.20, cache $0.10→$0.02, batch $0.50/$3 → $0.10/$0.60) — both re-verified via targeted second extraction with GPT-5.4 Nano as an unchanged control; resolved Claude Sonnet 5 (53) and Grok 4.5 (54) provisional scores on second consecutive exact AA match, flags removed; AA bias pattern recurred (Fable 5 60 vs stored 65, Gemini 3.5 Flash 50 vs stored 55, Grok 4.3 absent) so GPT-5.6 Sol/Terra/Luna and Gemini 3.6 Flash provisionals deferred — this run's max-effort readings (Sol 59, Terra 55, Luna 51, 3.6 Flash 50) are first observations, resolve next run if consistent; Google's long-running 500-vs-1.5K free-search-tier flip-flop resolved: page now shows both quotas as a two-tier structure (500/day free tier, 1.5K/day paid tier, shared Flash+Flash-Lite pool) — stored paid-tier 1.5K/day kept, sources.md updated to stop future flips; long-context tier values corrected in gotcha 18 and new gotcha 19 added for Sonnet 5's 2026-09-01 step-up; still on manual review: Claude Haiku 3 (absent from Anthropic's table), GPT-5.3 Codex batch + xAI batch/search columns (absent from extractions again, carried forward), new gpt-5.5-cyber (specialized model, now priced at $12.50/$75 — cyber line previously excluded 2026-06-07, needs a decision), Gemini Omni Flash Preview
<!-- audit-history-end -->
