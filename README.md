# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-07-13

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-07-13: added Claude Sonnet 5 (intro pricing $2/$10/MTok thru 2026-08-31, 1M context, 128K max output, provisional score 53), GPT-5.6 Sol/Terra/Luna (provisional scores 61/58/50), and Grok 4.5 ($2/$6/MTok, 500K context, provisional score 54) — AA leaderboard returned a partial/low extraction again this run (Fable 5, Opus 4.8, Opus 4.7, GPT-5.5 all ~4-5pts below stored; not trusted, provisional formula used instead for new models); Gemini 2.5 Flash and Flash-Lite free search tiers flipped from 1.5K/day back to 500/day shared; sources.md dynamic-filtering support list updated to add Fable 5, Mythos 5, Sonnet 5; flagged Grok Build 0.1's new AA entry ("0616" suffix, score 40) and Claude Haiku 3 (still absent from Anthropic's pricing table) for manual review
- 2026-06-19: Gemini 2.5 Flash and Flash-Lite free search tiers flipped from 500/day back to 1.5K/day shared (Google's page shows 1,500 shared this run); all other prices/cache/batch/scores/deprecations still match; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from Artificial Analysis (provisional retained); AA leaderboard returned a partial/low extraction again (scores not rewritten — manual review); OpenAI batch column extracted implausibly high (batch > standard — broken extraction, not applied); Claude Haiku 3 still absent from Anthropic's pricing table (manual review)
- 2026-06-16: Gemini 2.5 Flash and Flash-Lite free search tiers flipped from 1.5K/day back to 500/day shared (standard tier now shows 500 RPD shared on Google's page); all other prices/cache/batch/scores/deprecations still match; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from Artificial Analysis (provisional retained); AA leaderboard returned a partial/low extraction this run (scores not rewritten — manual review); Claude Haiku 3 still absent from Anthropic's pricing table (manual review)
- 2026-06-13: no pricing changes; all provider prices, cache/batch rates, search/free tiers, scores, and deprecations still match sources; GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from Artificial Analysis (provisional retained); Haiku 4.5 score confirmed correct (AA now shows reasoning=37 vs non-reasoning=31); Claude Haiku 3 still absent from Anthropic's pricing table (manual review)
- 2026-06-10: added Claude Fable 5 (AA score 65, $10/$50/MTok, 1M context) and Claude Mythos 5 (limited availability, $10/$50, 1M context, score null — new line, no AA score); GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from Artificial Analysis (provisional retained); flagged GPT-5.3 Codex and Gemini 3 Flash Preview as absent from this run's source fetch (manual review)
<!-- audit-history-end -->
