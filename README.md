# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-06-07

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-06-07: marked Claude Opus 4.1 deprecated (Anthropic pricing page now labels it "(deprecated)"); all prices/free tiers still match; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from Artificial Analysis (provisional retained); flagged Haiku 4.5 AA score (stored 37 vs AA 31) and new pricing-less gpt-5.4-cyber for manual review
- 2026-06-04: no pricing changes; all provider prices, intelligence scores, and deprecations still match sources; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from Artificial Analysis (provisional scores retained); Claude Haiku 3 still not on Anthropic's pricing table (manual review)
- 2026-06-01: no pricing changes; added Claude Opus 4.8 to sources.md `web_search_20260209` dynamic-filtering support list; flagged GPT-5.3 Codex batch pricing for manual review (page shows $0.875/$7.00 but extractor likely inferred 50% rule; main batch table omits 5.3-codex)
- 2026-05-31: added Claude Opus 4.8 (AA score 61, $5/$25/MTok, 1M context, 128K max output)
- 2026-05-28: renamed Gemini 3.1 Flash-Lite Preview → Gemini 3.1 Flash-Lite (now GA on Google's pricing page, pricing unchanged); flagged Claude Haiku 3 for manual review (no longer listed on Anthropic's pricing table)
<!-- audit-history-end -->
