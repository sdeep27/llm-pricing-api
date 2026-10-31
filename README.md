# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-10-31

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-10-31: no changes — no price drift on any stored field across all four providers (Anthropic's 21-row table incl. the three cache multipliers and Haiku 5.5's ≤100K tier, OpenAI's GPT-6/6.1/5.6/5.5/5.4 families (GPT-5.3 Codex absent from this extraction, carried forward), Google's Gemini 4 Argon promo (thru 2026-11-30) + 3.8/3.6 Flash promo (thru 2026-12-31), 3.5/3.1 Flash-Lite, 3 Flash Preview, 3.1 Pro Preview and 2.5 family, xAI's Grok 4.7/4.6/4.5/4.3/4.20/Build base-tier rates — all exact matches); no new in-scope models (AA lists a "Gemini 4 Carbon (high)" 59 that is not on Google's pricing page yet); no new deprecation labels; no provisional scores resolved (AA now has variant rows for Opus 5.5/Sonnet 5.5/Haiku 5.5/GPT-6.1 Terra/GPT-6 Luna but still no plain base-name rows); gotcha 34 still gated on user decision; xAI batch/search columns absent (~31st consecutive audit, carried forward); manual review: AA rescale decision, Gemini 4 Carbon, Argon promo step-up 2026-12-01, Grok 4.20 naming split
- 2026-10-28: added GPT-6.1 Terra (openai, $1/$5/MTok, cache $0.05 at 0.05x like GPT-6.1 Sol, batch $0.50/$2.50, LC $2/$0.10/$7.50, context/max output null, provisional score 56 = GPT-5.6 Terra + 1, no AA row yet; confirmed PRESENT via verbatim re-fetch, gpt-5.6-terra stays listed); no price drift on any other stored field across all four providers; no new deprecation labels; no provisional scores resolved (AA still variant-suffixed only); AA scale moved again, non-uniformly (GPT-6 Astra (max) 53→57, Fable 5.1 (max) 53→49, Grok 4.7 (high) 46→35): the stable-scale precondition in gotcha 34 is reset, still gated on user decision; xAI batch/search columns absent (~30th consecutive audit, carried forward); manual review: AA rescale decision, Argon predecessor, cyber/rosalind scope, Grok 4.20 naming split, OpenAI legacy-catalog scope
- 2026-10-25: no changes — no price drift on any stored field across all four providers (Anthropic's 21-row table incl. the three cache multipliers and Haiku 5.5's ≤100K tier, OpenAI's GPT-6/6.1/5.6/5.5/5.4 families + GPT-5.3 Codex (standard row exact match, batch absent), Google's Gemini 4 Argon promo (thru 2026-11-30) + 3.8/3.6 Flash promo (thru 2026-12-31), 3.5/3.1 Flash-Lite, 3 Flash Preview (targeted re-check), 3.1 Pro Preview and 2.5 family, xAI's Grok 4.7/4.6/4.5/4.3/4.20/Build base-tier rates — all exact matches); no new in-scope models (new `gpt-rosalind-discovery` is life-sciences, out of scope); no new deprecation labels; no provisional scores resolved (AA still variant-suffixed only); AA lowered scale identical for a seventeenth read (gotcha 34 still gated on user decision); xAI batch/search columns absent (~29th consecutive audit, carried forward); manual review: AA rescale decision, Argon predecessor, cyber/rosalind scope, Grok 4.20 naming split, OpenAI legacy-catalog scope
- 2026-10-22: no changes — no price drift on any stored field across all four providers (Anthropic's 21-row table incl. the three cache multipliers and Haiku 5.5's ≤100K tier, OpenAI's GPT-6/6.1/5.6/5.5/5.4 families + GPT-5.3 Codex (standard row exact match, batch —), Google's Gemini 4 Argon promo (thru 2026-11-30) + 3.8/3.6 Flash promo (thru 2026-12-31), 3.5/3.1 Flash-Lite, 3 Flash Preview, 3.1 Pro Preview and 2.5 family, xAI's Grok 4.7/4.6/4.5/4.3/4.20/Build base-tier rates — all exact matches); no new in-scope models; no new deprecation labels; no provisional scores resolved (AA still variant-suffixed only); AA lowered scale identical for a sixteenth read (gotcha 34 still gated on user decision); xAI batch/search columns absent (~28th consecutive audit, carried forward); manual review: AA rescale decision, Argon predecessor, cyber/rosalind scope, Grok 4.20 naming split, OpenAI legacy-catalog scope
- 2026-10-19: no changes — no price drift on any stored field across all four providers (Anthropic's 21-row table incl. the three cache multipliers and Haiku 5.5's ≤100K tier, OpenAI's GPT-6/6.1/5.6/5.5/5.4 families + GPT-5.3 Codex (standard row exact match, batch ABSENT), Google's Gemini 4 Argon promo (thru 2026-11-30) + 3.8/3.6 Flash promo (thru 2026-12-31), 3.5/3.1 Flash-Lite, 3 Flash Preview, 3.1 Pro Preview and 2.5 family, xAI's Grok 4.7/4.6/4.5/4.3/4.20/Build base-tier rates — all exact matches); no new in-scope models; no new deprecation labels; no provisional scores resolved (AA still variant-suffixed only); AA lowered scale identical for a fifteenth read (gotcha 34 still gated on user decision); xAI batch/search columns absent (~27th consecutive audit, carried forward); manual review: AA rescale decision, Argon predecessor, cyber/rosalind scope, Grok 4.20 naming split, OpenAI legacy-catalog scope
<!-- audit-history-end -->
