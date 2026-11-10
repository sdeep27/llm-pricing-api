# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

`intelligence_score` is the [Artificial Analysis](https://artificialanalysis.ai) Intelligence Index, on the version given in the response's `intelligence_index` field (currently v5). Models with `intelligence_score_provisional: true` carry an estimate because AA hasn't measured them on that version yet; `null` means unscored. Models are sorted by this score by default.

## Data freshness

Last audited: 2026-11-10

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-11-10: added Claude Fable 5.2 (anthropic, $8/$40/MTok, cache $0.20 at 0.025x, batch $4/$20, 1M context, 128K max output, real AA v5 score 64.6 — new #1) and Claude Mythos 5.2 (limited availability, same pricing, score null like Mythos 5.1); Fable 5.1 moved to Anthropic's legacy list (no deprecation flag); no price drift on any stored field across all four providers; AA scores identical to 11-07 (v5, none rewritten); GPT-5.6 Sol promo end now 2026-11-30; new gpt-6-cyber / gpt-rosalind-discovery out of scope; Gemini 4 Carbon still not on Google's page; xAI batch/search columns absent (carried forward)
- 2026-11-07: no changes — all stored fields match across all four providers; new: Google page schedules Gemini 3.8 Flash and 3.6 Flash to double ($0.75/$3.75 → $1.50/$7.50) on 2027-01-01, current rate kept; Gemini 4 Carbon still not on Google's page; AA scores identical to 11-04 (still variant-only, none rewritten)
- 2026-11-04: flagged Gemini 2.5 Pro and Gemini 2.5 Flash deprecated (Google's page: "deprecated and is no longer available to select in Google AI Studio"; API requests route to Gemini 3.8 Flash / 3.5 Flash-Lite from 2026-12-01; confirmed by verbatim re-fetch; 2.5 Flash-Lite not deprecated); Google pricing URL moved (301 to aistudio.google.com/docs/pricing, source URL updated); no price drift on any stored field across all four providers; no new in-scope models (Gemini 4 Carbon still AA-only); no provisional scores resolved (AA still variant-suffixed only; Opus 5.5/Sonnet 5.5 (max) +1 vs 10-28, rest identical); gotcha 34 still gated on user decision; xAI batch/search columns absent (~33rd consecutive audit, carried forward); manual review: AA rescale decision, Gemini 4 Carbon, Argon step-up 2026-12-01, GPT-5.6 Sol promo end 2026-11-21, Grok 4.20 naming split
- 2026-11-01: no changes — no price drift on any stored field across all four providers (Anthropic's 21-row table incl. the three cache multipliers and Haiku 5.5's ≤100K tier, OpenAI's GPT-6/6.1/5.6/5.5/5.4 families + GPT-5.3 Codex (standard row back in this extraction, exact match, batch absent), Google's Gemini 4 Argon promo (step-up to $4/$20 on 2026-12-01) + 3.8/3.6 Flash promo (step-up 2027-01-01), 3.5/3.1 Flash-Lite, 3 Flash Preview, 3.1 Pro Preview and 2.5 family, xAI's Grok 4.7/4.6/4.5/4.3/4.20/Build base-tier rates — all exact matches); no new in-scope models (new OpenAI `gpt-6-rosalind` and `gpt-6-astra-law` are domain variants, out of scope; Gemini 4 Carbon still on AA only); no new deprecation labels; no provisional scores resolved (AA still variant-suffixed only); gotcha 34 still gated on user decision; xAI batch/search columns absent (~32nd consecutive audit, carried forward); manual review: AA rescale decision, Gemini 4 Carbon, Argon step-up 2026-12-01, cyber/rosalind/astra-law scope, Grok 4.20 naming split
- 2026-10-31: no changes — no price drift on any stored field across all four providers (Anthropic's 21-row table incl. the three cache multipliers and Haiku 5.5's ≤100K tier, OpenAI's GPT-6/6.1/5.6/5.5/5.4 families (GPT-5.3 Codex absent from this extraction, carried forward), Google's Gemini 4 Argon promo (thru 2026-11-30) + 3.8/3.6 Flash promo (thru 2026-12-31), 3.5/3.1 Flash-Lite, 3 Flash Preview, 3.1 Pro Preview and 2.5 family, xAI's Grok 4.7/4.6/4.5/4.3/4.20/Build base-tier rates — all exact matches); no new in-scope models (AA lists a "Gemini 4 Carbon (high)" 59 that is not on Google's pricing page yet); no new deprecation labels; no provisional scores resolved (AA now has variant rows for Opus 5.5/Sonnet 5.5/Haiku 5.5/GPT-6.1 Terra/GPT-6 Luna but still no plain base-name rows); gotcha 34 still gated on user decision; xAI batch/search columns absent (~31st consecutive audit, carried forward); manual review: AA rescale decision, Gemini 4 Carbon, Argon promo step-up 2026-12-01, Grok 4.20 naming split
<!-- audit-history-end -->
