# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-04-14

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it opens a PR; when everything still matches, it just bumps the date above so you know the check ran. See `.claude/SCHEDULED_TASK.md` for setup.
