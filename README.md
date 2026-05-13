# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-05-13

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-05-13: Gemini 2.5 Flash and Flash-Lite free search tiers flipped back to 500/day shared (from 1.5K/day shared); marked Grok 4.1 Fast deprecated (xAI page announces 2026-05-15 retirement)
- 2026-05-10: added Grok 4.3 (AA score 53, ctx 1M); xAI cut Grok 4.20 and Grok 4.20 Multi-Agent prices (input $2.00→$1.25, output $6.00→$2.50, batch and cache scaled accordingly)
- 2026-05-07: no changes; flagged Gemini 3 Flash AA score (now 35 vs stored 46) and Grok 4.20 AA score (now showing "0309 v2" at 29 vs stored 49) for manual review — ambiguous version/naming
- 2026-05-04: Gemini 2.5 Flash and Flash-Lite free search tiers reverted from 500/day back to a 1.5K/day shared pool; Grok 4.3 (now on AA at 53) still flagged for manual review since xAI page doesn't expose pricing inline
- 2026-05-01: Gemini 2.5 Flash and Flash-Lite free search tiers cut from 1.5K/day to 500/day; flagged a possible new Grok 4.3 model (AA score 53) for manual review since xAI page still doesn't expose pricing inline
<!-- audit-history-end -->
