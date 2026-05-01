# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-05-01

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-05-01: Gemini 2.5 Flash and Flash-Lite free search tiers cut from 1.5K/day to 500/day; flagged a possible new Grok 4.3 model (AA score 53) for manual review since xAI page still doesn't expose pricing inline
- 2026-04-28: resolved GPT-5.5 provisional score (58→60); xAI page didn't expose pricing inline so Grok rows carried forward unchanged
- 2026-04-25: added GPT-5.5 + GPT-5.5 Pro (provisional), updated GPT-5.3 Codex batch pricing (now equals standard, no discount), refreshed AA scores for Opus 4.6, Haiku 4.5, GPT-5.4 Nano, Gemini 2.5 Pro, Gemini 2.5 Flash-Lite
- 2026-04-22: no changes
- 2026-04-19: resolved Claude Opus 4.7 provisional score (54→57)
<!-- audit-history-end -->
