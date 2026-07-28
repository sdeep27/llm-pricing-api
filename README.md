# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-07-28

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-07-28: resolved two provisional intelligence scores against Artificial Analysis after second consecutive consistent observations — Claude Opus 5 (62→61) and Gemini 3.5 Flash-Lite (35→36), provisional flags removed; no price drift on any stored field across Anthropic/OpenAI/Google/xAI (token, cache, batch, search, free tiers, deprecations all match); AA leaderboard again showed the recurring partial/low bias (Fable 5 60 vs stored 65, Grok 4.3 36 vs 53) so GPT-5.6 Sol/Terra/Luna and Gemini 3.6 Flash provisionals deferred, while Claude Sonnet 5 (AA 53 = provisional) and Grok 4.5 (AA 54 = provisional) matched exactly on first observation — candidates to resolve next run; sources.md gained a gotcha on OpenAI GPT-5.6 long-context tiered pricing (2x base above the threshold, base rate stored) and notes that codex-batch and xAI batch/search columns dropped out of extractions again; still on manual review: Claude Haiku 3 (absent from Anthropic's table), Sonnet 5's 2026-09-01 step-up to $3/$15, new Gemini Omni Flash Preview (out of schema scope pending decision)
- 2026-07-25: added Claude Opus 5 (new model, $5/$25/MTok, cache $0.50, batch $2.50/$12.50, 1M context, max output null pending, provisional score 62 = Opus 4.8 + 1) and Gemini 3.5 Flash-Lite ($0.30/$2.50/MTok, cache $0.03, batch $0.15/$1.25, 1M context, 65536 max output, provisional score 35 = 3.1 Flash-Lite + 1); all other Anthropic/OpenAI/Google/xAI prices, batch rates, free tiers, and deprecations still match sources; AA leaderboard again showed the recurring partial/low bias (Fable 5 60 vs stored 65, Opus 4.8 56 vs 61, Grok 4.3 wildly off at 36 vs 53) so no established scores were rewritten and all provisional resolutions deferred (AA does list Opus 5 at 61 and 3.5 Flash-Lite at 36 — close to the assigned provisionals, re-check next run); sources.md gained gotchas on Anthropic fast-mode premium pricing (Opus 5/4.8 $10/$50, untracked dimension) and on xAI batch/search columns dropping out of this run's fetch (stored values carried forward); flagged for manual review: Claude Haiku 3 (still absent), GPT-5.3 Codex batch pricing (not listed this run), Sonnet 5's scheduled 2026-09-01 step-up to $3/$15
- 2026-07-22: added Gemini 3.6 Flash (new model, $1.50/$7.50/MTok, cheaper output than 3.5 Flash's $9.00, cache $0.15, batch $0.75/$3.75, provisional score 56); confirmed via targeted re-fetch to rule out extraction artifact; all other Anthropic/OpenAI/xAI/Google prices, batch rates, free tiers, and deprecations still match sources; sources.md gained a new gotcha noting xAI now publishes context-tiered pricing above 200K (like Google's Pro-class models) — base <200K tier still matches stored values, no price changes; AA leaderboard again showed the recurring partial/low bias (Fable 5 60 vs stored 65, Opus 4.8 56 vs stored 61) so no established scores were rewritten and GPT-5.6 Sol/Terra/Luna provisional scores retained; flagged for manual review: Claude Haiku 3 (still absent from Anthropic's table), GPT-5.3 Codex batch pricing (not extracted this run), and Claude Sonnet 5's scheduled 2026-09-01 step-up to $3/$15
- 2026-07-19: corrected Grok 4.5 cached-input price ($0.50 → $0.30/MTok, re-verified twice directly against xAI's "Cached input" column); Gemini 2.5 Flash and Flash-Lite free search tiers flipped from 500/day back to 1.5K/day shared; all other Anthropic/OpenAI/xAI/Google prices, batch rates, and deprecations still match sources; AA leaderboard again showed the recurring partial/low bias (Opus 4.7 landed at 54 vs stored 57, a 3pt miss matching the pattern from 06-16/06-19/07-16) so no scores were rewritten this run, including the GPT-5.6 Sol/Terra/Luna provisional resolutions it would otherwise have implied; sources.md gained a new gotcha noting Gemini Pro-class standard (non-batch) pricing is also context-tiered above 200K, not just batch; flagged for manual review: Claude Haiku 3 (still absent from Anthropic's table), GPT-5.3 Codex (absent from this run's OpenAI fetch), a newly-noticed "Claude Mythos Preview" referenced in Anthropic's docs notes but with no explicit pricing row, and Claude Sonnet 5's scheduled standard-pricing step-up ($2/$10 → $3/$15) effective 2026-09-01
- 2026-07-16: xAI cached-input pricing changed from a flat 0.1x multiplier to model-specific published rates (Grok 4.3/4.20/4.20 Multi-Agent/Build 0.1: $1.25-$1.00 input → $0.20 cache; Grok 4.5: $2.00 input → $0.50 cache); all other Anthropic/OpenAI/Google/xAI prices, batch rates, free tiers, and deprecations still match sources; AA leaderboard again returned a partial/low extraction (Fable 5, Opus 4.8, Opus 4.7 all 3-5pts below stored, Grok 4.3 wildly off at 25-38 vs stored 53 — not trusted, no scores rewritten); sources.md updated with new `web_search_20260318` tool version, refreshed tokenizer overhead note (~30%, expanded model list), and the new xAI cache-pricing gotcha; Claude Haiku 3 still absent from Anthropic's pricing table and GPT-5.3 Codex absent from this run's OpenAI fetch (both manual review)
<!-- audit-history-end -->
