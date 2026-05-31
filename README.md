# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-05-31

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-05-31: added Claude Opus 4.8 (AA score 61, $5/$25/MTok, 1M context, 128K max output)
- 2026-05-28: renamed Gemini 3.1 Flash-Lite Preview → Gemini 3.1 Flash-Lite (now GA on Google's pricing page, pricing unchanged); flagged Claude Haiku 3 for manual review (no longer listed on Anthropic's pricing table)
- 2026-05-25: added Gemini 3.5 Flash (AA score 55, $1.50/$9.00) and Grok Build 0.1 ($1/$2, 256K, score null); cut Grok 4.20 and Grok 4.20 Multi-Agent context window 2M→1M (second observation); Gemini 2.5 Flash + Flash-Lite free search tier 500/day → 1.5K/day shared
- 2026-05-22: no changes; flagged xAI 4.20 context window (page now lists 1M vs stored 2M) and a new `grok-build-0.1` SKU ($1/$2, 256K) for manual review — both need a second observation before changing data
- 2026-05-19: no changes; re-verified Gemini 2.5 free search tiers (Pro 1.5K/day dedicated, Flash + Flash-Lite share 500/day pool) and confirmed xAI 4.20 SKU split (`0309-reasoning` / `0309-non-reasoning` / `multi-agent-0309`) all at $1.25/$2.50
<!-- audit-history-end -->
