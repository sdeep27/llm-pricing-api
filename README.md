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

Last audited: 2026-11-22

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-11-22: no price changes, no new models; field fixes from Anthropic's models overview "All models" table (verbatim re-fetch): max output null → 128K for Claude Fable 5, Mythos 5, Mythos 5.1, Mythos 5.2; Claude Sonnet 4.6 64K → 128K; Claude Sonnet 4 8K → 64K; xAI Grok Build 0.1 context 256K → 500K; AA scores unchanged (v5); xAI batch/search columns absent (carried forward); grok-4.1-fast gone from xAI page (already deprecated); manual review: Argon/Carbon step-up 2026-12-01, GPT-5.6 Sol promo end 2026-11-30, Gemini 2.5 Pro/Flash routing 2026-12-01
- 2026-11-19: added GPT-6.2 Astra (openai, $8/$40/MTok, cache $0.40 at 0.05x, batch $4/$20, real AA v5 score 62.1 — new #2), GPT-6.2 Sol (openai, $2/$10/MTok, cache $0.10, batch $1/$5, real AA v5 score 57.3) and Gemini 4 Neon (google, $3/$15/MTok, cache $0.15, batch $1.50/$7.50, 1M context, real AA v5 score 61.4); all three confirmed by verbatim re-fetch; no price drift on any stored field; existing AA scores unchanged (v5); xAI batch/search columns absent (carried forward); manual review: Argon/Carbon step-up 2026-12-01, GPT-5.6 Sol promo end 2026-11-30, Gemini 3.8/3.6 Flash step-up 2027-01-01
- 2026-11-16: no changes — all stored fields match across all four providers; AA scores identical to 11-13 (v5, none rewritten); no new in-scope models or deprecation labels; xAI batch/search columns absent (carried forward); manual review: Gemini 4 Argon/Carbon step-up to $4/$20 on 2026-12-01, GPT-5.6 Sol promo end 2026-11-30, Gemini 3.8/3.6 Flash step-up 2027-01-01
- 2026-11-13: added Gemini 4 Carbon (google, $2/$10/MTok promo thru 2026-11-30 → $4/$20, cache $0.10, batch $1/$5, 1M context, real AA v5 score 60 — new #2) and Gemini 4 Hydrogen (google, $1.50/$7.50, cache $0.075, batch $0.75/$3.75, 1M context, real AA v5 score 53.9); no price drift on any stored field across all four providers; AA scores identical to 11-10 (v5, none rewritten); gemini-decision-1 (eval model, unpriced) out of scope; xAI batch/search columns absent (carried forward); manual review: Argon/Carbon step-up 2026-12-01, GPT-5.6 Sol promo end 2026-11-30, Grok 4.20 naming split
- 2026-11-10: added Claude Fable 5.2 (anthropic, $8/$40/MTok, cache $0.20 at 0.025x, batch $4/$20, 1M context, 128K max output, real AA v5 score 64.6 — new #1) and Claude Mythos 5.2 (limited availability, same pricing, score null like Mythos 5.1); Fable 5.1 moved to Anthropic's legacy list (no deprecation flag); no price drift on any stored field across all four providers; AA scores identical to 11-07 (v5, none rewritten); GPT-5.6 Sol promo end now 2026-11-30; new gpt-6-cyber / gpt-rosalind-discovery out of scope; Gemini 4 Carbon still not on Google's page; xAI batch/search columns absent (carried forward)
<!-- audit-history-end -->
