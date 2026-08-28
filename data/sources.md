# Pricing Data Sources

Canonical sources used to populate `pricing.json`. When updating pricing data, always verify against these URLs first.

## Model Pricing (input/output tokens)

| Provider | URL |
|----------|-----|
| Anthropic | https://platform.claude.com/docs/en/about-claude/pricing |
| OpenAI | https://developers.openai.com/api/docs/pricing |
| Google | https://ai.google.dev/gemini-api/docs/pricing |
| xAI | https://docs.x.ai/developers/models |

All four pages include web search, batch, and cached input pricing inline -- no separate pages needed.

## Web Search Pricing

Web search pricing is on the same pages listed above. Anthropic also has a dedicated tool docs page with more detail:

| Provider | Supplementary URL |
|----------|-------------------|
| Anthropic | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool |

### Provider-specific notes

**Anthropic** -- $10/1K searches ($0.010/search)
- No free tier
- Tool versions: `web_search_20250305` (basic), `web_search_20260209` (adds dynamic filtering, requires code execution tool), `web_search_20260318` (adds `response_inclusion` control for agentic workflows)
- `web_search_20260209` dynamic filtering supported on: Claude Fable 5, Claude Opus 5, Claude Opus 4.8, Claude Mythos 5, Claude Mythos Preview, Opus 4.7, Opus 4.6, Claude Sonnet 5, Sonnet 4.6 (Anthropic's docs now phrase this as "Claude 4.6 and later models and Claude Mythos Preview")
- Basic web search (`web_search_20250305`) is GA across all recent Claude models
- Older models (Haiku 3) likely don't support it; Anthropic doesn't publish an explicit exclusion list
- Search content tokens count as input tokens and are billed at model rates
- Web fetch tool (`web_fetch_20260209`) has NO per-call charge, only token costs

**OpenAI** -- $10/1K searches ($0.010/search)
- No free tier
- Multiple pricing tiers exist but the standard is $10/1K:
  - Standard web search: $10/1K + search content tokens billed at model rates
  - Web search preview (reasoning models like o-series): $10/1K + tokens billed
  - Web search preview (non-reasoning): $25/1K but search content tokens are FREE
- We use the standard $10/1K rate in our data
- Supported models (Responses API): gpt-5, o4-mini, o3-deep-research, o4-mini-deep-research
- Supported models (Chat Completions): gpt-5-search-api, gpt-4o-search-preview, gpt-4o-mini-search-preview
- NOT supported: gpt-5 with `minimal` reasoning, gpt-4.1-nano (and likely nano-class models)
- Context window limited to 128K when using web search

**Google** -- varies by model family
- Gemini 3.x (3.1 Pro Preview, 3 Flash Preview, 3 Pro Image Preview): $14/1K ($0.014/search), **5,000 free searches/month** shared across Gemini 3 models
- Gemini 2.5 (Pro, Flash, Flash-Lite): $35/1K ($0.035/search). Free tier: **Pro = 1,500 free/day** (separate); **Flash + Flash-Lite share a pool that is two-tiered**: 500/day for free-tier accounts, 1,500/day for paid-tier accounts. Pro additionally gets 10,000 RPD free for Maps grounding. (Resolved 2026-07-31: the page now shows both quotas side by side — the historical "flips" between 500/day and 1.5K/day were extractions catching one tier or the other, not Google changing the quota. We store the paid-tier 1.5K/day value since API billing customers are on the paid tier. Don't "fix" it back to 500/day when an extraction surfaces only the free-tier number.)
- Important: "A customer-submitted request to Gemini may result in one or more queries to Google Search. You will be charged for each individual search query performed." -- a single prompt can trigger multiple billed searches
- Google also offers "Google Maps grounding" with similar pricing structure
- The free tier units are different between families: monthly for Gemini 3, daily (RPD) for Gemini 2.5

**xAI** -- $5/1K searches ($0.005/search)
- No free tier
- Cheapest web search across all providers
- Also offers X Search (search X/Twitter posts): $5/1K calls
- Also offers Collections Search (document collections): $2.50/1K calls

## Cached Input Pricing

All four providers use the same 0.1x multiplier for cache reads (90% discount on standard input price). This is stored as `cache_read_price` in pricing.json.

- **Anthropic**: 0.1x base input. Also has cache write costs (1.25x for 5-min, 2x for 1-hour) but we only track the read price.
- **OpenAI**: 0.1x base input (90% off). GPT-5.4 Pro does NOT support cached input.
- **Google**: 0.1x base input. Also charges a storage fee ($4.50/1M tokens/hour) which we don't track.
- **xAI**: No longer a flat 0.1x multiplier (changed as of 2026-07-16 audit). Cached input is now a model-specific published rate: Grok 4.3/4.20/4.20 Multi-Agent = $0.20 (0.16x of $1.25 input), Grok Build 0.1 = $0.20 (0.2x of $1.00 input), Grok 4.5 = $0.30 (0.15x of $2.00 input, corrected 2026-07-19 from $0.50 recorded on 2026-07-16 — re-verified directly against the "Cached input" column twice this run). Always read the "Cached input" column directly rather than assuming 10%. Automatic caching, no user configuration needed.

## Batch Pricing

All four providers offer batch processing at roughly 50% off standard rates.

- **Anthropic**: Exactly 50% off input and output. All models supported.
- **OpenAI**: Exactly 50% off for the GPT-5.4 family. GPT-5.3 Codex is an exception — its batch pricing equals standard pricing (no batch discount). Note: the codex batch columns drop out of page extractions intermittently (absent 2026-07-25, 2026-07-28, 2026-07-31, and 2026-08-01 runs); treat absence as a layout issue and carry stored values forward, per the same logic as xAI gotcha 17. Beware: a broad extraction on 2026-08-01 hallucinated codex batch at $0.88/$7.00 (echoing the phantom 2026-06-01 reading); a targeted re-check confirmed codex is simply absent from the batch table — codex sits in a "Specialized models" section with standard/fast pricing only.
- **Google**: Approximately 50% off. Some models have tiered batch pricing (different rates for prompts >200K tokens vs <=200K). We store the <=200K rate.
- **xAI**: 50% off standard rates for all token types.

## Max Output Tokens

- **Anthropic**: Varies significantly (4K for Haiku 3 up to 128K for Opus 4.7/4.6). Check model overview page.
- **OpenAI**: Consistently 128K across GPT-5.4 family.
- **Google**: Consistently ~65K (65,536) across all Gemini models.
- **xAI**: Not explicitly published. Stored as null in pricing.json.

## Intelligence Rankings

| Source | URL |
|--------|-----|
| Artificial Analysis | https://artificialanalysis.ai/leaderboards/models |

Previously used https://llm-stats.com/ but switched to Artificial Analysis.

### Provisional scores

New models often appear on provider pricing pages before Artificial Analysis ranks them. When this happens, we assign a **provisional score** = predecessor's score + 1 (so the new model sorts just above its predecessor). The model gets an `"intelligence_score_provisional": true` flag in `pricing.json`. Each audit re-checks provisional models against Artificial Analysis and replaces the score when a real one is published.

## Scraping Gotchas

Notes for future agents updating this data:

1. **Anthropic docs domain changed**: Old URLs at `docs.anthropic.com` 301-redirect to `platform.claude.com`. Always use `platform.claude.com/docs/en/...` URLs.

2. **Anthropic docs index pages 404**: Fetching `platform.claude.com/docs/en/agents-and-tools` returns 404. You must use the full path to a specific page (e.g., `.../tool-use/web-search-tool`).

3. **xAI docs structure**: `docs.x.ai/docs/guides/tools` returns 404. The working URL is `docs.x.ai/developers/models` which contains both model specs and tool pricing in one page.

4. **OpenAI web search pricing is confusing**: There are three tiers (standard, preview-reasoning, preview-non-reasoning) with different token billing rules. The standard tier ($10/1K) is what most integrations use.

5. **Google free tiers use different units**: Gemini 3 = per month, Gemini 2.5 = per day (RPD = requests per day). Don't mix these up.

6. **Google multi-search billing**: A single user prompt can trigger multiple Google Search queries, each billed separately. This makes Google's effective per-prompt search cost potentially higher than the per-query price suggests.

7. **OpenAI context_window values**: OpenAI's pricing page doesn't always list context windows for newer models. We store these as `null` in pricing.json when unconfirmed.

8. **Search price units**: In pricing.json, `search_price` is stored as the cost per single search (e.g., 0.010 = $0.01/search). The source pages list prices per 1,000 searches. Remember to divide by 1,000 when entering data.

9. **Google batch pricing tiers**: Google has different batch rates for prompts >200K vs <=200K tokens. We store the <=200K rate. If a user typically sends large prompts, they'll pay more.

9a. **Google standard pricing is also context-tiered for Pro-class models**: Not just batch — Gemini 2.5 Pro and Gemini 3.1 Pro Preview's standard (non-batch) input/output/cached prices also step up above 200K tokens (e.g. Gemini 2.5 Pro: $1.25/$10 in/out at <=200K vs $2.50/$15 above). We store the <=200K rate consistently across standard, cached, and batch fields. Confirmed 2026-07-19.

10. **Google cache storage fees**: Google charges a per-hour storage fee for cached content ($4.50/1M tokens/hour) on top of the discounted read price. We only track the read price, not storage. This makes Google caching harder to compare directly with other providers.

11. **xAI max output tokens**: xAI docs don't publish explicit max output limits. The models list a 2M context window but no output cap. Stored as null.

12. **Anthropic max output varies by model generation**: Unlike OpenAI (consistent 128K) or Google (consistent 65K), Anthropic's max output ranges from 4K (Haiku 3) to 128K (Opus 4.7/4.6). Always check per-model.

13. **Opus 4.7+ tokenizer change**: Claude Opus 4.7 and later Opus models, Claude Fable 5, Claude Mythos 5, Claude Mythos Preview, and Claude Sonnet 5 use a newer tokenizer that produces ~30% more tokens for the same text (Anthropic's docs previously said "up to 35%"; re-verify this figure each audit). Sonnet 4.6 and earlier use the previous tokenizer. This affects effective cost comparisons.

14. **xAI cached input is not a flat 10% multiplier**: Confirmed 2026-07-16 — xAI publishes explicit per-model "Cached input" prices on `docs.x.ai/developers/models` that vary between 16-25% of the base input price depending on the model. Don't assume 0.1x; read the column directly.

15. **xAI is now context-tiered above 200K, like Google's Pro-class models**: Confirmed 2026-07-22 — `docs.x.ai/developers/models` now lists separate input/output/cached rates for <200K vs >=200K tokens (e.g. Grok 4.5: $2/$6 base vs $4/$12 above 200K; ratio holds for Grok 4.3, 4.20, 4.20 Multi-Agent, Build 0.1 too). We store the <200K rate, same convention as Google's tiering (gotcha 9a). All base-tier rates matched previously stored values this run — no price changes, just a schema note.

16. **Anthropic fast mode is a separate premium price**: Confirmed 2026-07-25 — Claude Opus 5 and Opus 4.8 offer a "fast mode" (research preview) at $10/$50 in/out vs the standard $5/$25. It's a request-time speed option, not a different model; we store only standard pricing and don't track this dimension.

17. **xAI batch/search pricing can drop out of the models page extraction**: On 2026-07-25 the `docs.x.ai/developers/models` fetch returned per-model token+cache prices but no batch, web search, X search, or collections pricing. Treat a missing column as an extraction/layout issue, not a price removal — carry stored values forward and re-verify next run. (Recurred 2026-07-28, 2026-07-31, and 2026-08-01.)

18. **OpenAI GPT-5.6 family has long-context tiered pricing**: Confirmed 2026-07-28 — the pricing page lists a separate "long context" tier; same pattern as Google's and xAI's >200K tiers (gotchas 9a, 15). We store the base (short-context) rate. Current LC values (updated 2026-08-22 after the Sol price cut, gotcha 28): gpt-5.6-sol $8/$0.80/$30, gpt-5.6-terra $4/$0.40/$18, gpt-5.6-luna $0.40/$0.04/$1.80 (ratio to base no longer a clean 2x/1.5x for sol post-cut — verify LC directly each run rather than deriving from base). gpt-5.5 and gpt-5.4 also list LC tiers ($10/$1/$45 and $5/$0.50/$22.50 — the terra figure recorded here on 07-28 actually belonged to gpt-5.4). OpenAI also lists Flex (~50% off) and "Fast mode" (~2x, renamed from "Priority" on 2026-07-30, `service_tier: "fast"`) service tiers; we store only standard.

19. **Claude Sonnet 5 intro pricing is now permanent (resolved 2026-08-13)**: The scheduled step-up to $3/$15 on 2026-09-01 will not happen — Anthropic's pricing page now states the $2/$10 in/out (batch $1/$5, cache $0.20) launch price "is now the standard price." No action needed going forward; this gotcha is closed. (Kept for history — don't reintroduce a step-up expectation.)

20. **xAI batch/search/X-search/collections columns keep dropping from the models-page extraction**: Recurred again 2026-08-13 (previously 2026-07-25, 07-28, 07-31, 08-01). Treat absence as a layout/extraction issue, not a price removal — carry forward stored values. When adding a brand-new xAI model with no prior stored batch price, compute batch as 50% off standard input/output (the documented general xAI batch policy) rather than leaving it null.

21. **xAI Grok 4.20 naming split (flagged 2026-08-13, unresolved)**: `docs.x.ai/developers/models` now lists three separate rows — `grok-4.20-0309-reasoning`, `grok-4.20-0309-non-reasoning`, `grok-4.20-multi-agent-0309` — all with identical pricing to what we store as "Grok 4.20" and "Grok 4.20 Multi-Agent". Unclear whether this is a genuine product split or just an internal model-id/date-suffix convention. Left unchanged pending a clearer page layout; re-check next audit before renaming or splitting rows. (Recurred again 2026-08-25, still identically priced, still unresolved.)

22. **Grok 4.6 added 2026-08-13**: New xAI model alongside (not replacing) Grok 4.5 — different cache price ($0.50 vs Grok 4.5's $0.30) confirms it's a distinct model, not a rename. $2/$6 (<200k) / $4/$12 (>=200k), 500K context, real AA score (61, "high" tier) available at launch so no provisional flag needed.

23. **Gemini 3.6/3.7 Flash intro pricing, confirmed 2026-08-16**: Google's pricing page now shows Gemini 3.6 Flash and Gemini 3.7 Flash at a promotional rate — $0.75/$3.75 in/out (cache $0.075, batch $0.375/$1.875) — explicitly "through December 31, 2026", stepping up to $1.50/$7.50 (cache $0.15, batch $0.75/$3.75) on 2027-01-01. We store the current (promotional) rate. Note the 2027-01-01 post-step-up figures are exactly what we previously had stored for 3.6 Flash pre-cut — this reads as a genuine mid-cycle price cut with a pre-announced reversion, not a data error. Re-verify at each audit; don't "fix" the discount back to the higher number before the date passes. Gemini 3.7 Flash is a new model line alongside (not replacing) 3.6 Flash, same pricing, real AA score available at launch (56, "high" tier) — no provisional flag needed.

24. **xAI Grok 4.6 confirmed context-tiered above 200K**: `docs.x.ai/developers/models` (2026-08-16) lists Grok 4.6 at $4/$1/$12 (in/cache/out) above 200K vs the $2/$0.50/$6 base tier we store — consistent with the tiering pattern in gotcha 15, extending it to Grok 4.6.

25. **xAI batch/search/X-search/collections columns absent again (2026-08-16)**: Recurred for the ~6th consecutive audit (previously 07-25, 07-28, 07-31, 08-01, 08-13). Treat as a stable extraction/layout limitation of `docs.x.ai/developers/models`, not a pricing change — carried forward stored values again. (Recurred again 2026-08-19, ~7th consecutive audit; and again 2026-08-22, ~8th; and again 2026-08-25, ~9th consecutive audit.)

26. **OpenAI GPT-5.3 Codex still absent from pricing table extraction (2026-08-16)**: Recurred again (previously 07-25, 07-28, 07-31, 08-01). Codex continues to sit in a "Specialized models" section separate from the main pricing table that our fetch prompt targets. Carried forward stored values; no evidence of an actual price change. (2026-08-19: the model row itself was captured this run — $1.75/$0.175/$14.00 in/cache/out, exact match to stored, confirming no drift — but the batch columns were still absent, consistent with codex's documented no-discount batch policy. Whether the row appears seems to depend on fetch-prompt phrasing/extraction luck rather than actual page changes. 2026-08-25: row captured again, still an exact match to stored, batch columns still absent — same pattern.)

27. **Claude Haiku 3 confirmed absent from Anthropic's pricing table again (2026-08-19)**: Anthropic's pricing page table lists 15 models (Fable 5 through Haiku 3.5) but no Haiku 3 row, retired-label or otherwise — it has been missing since at least 2026-05-28 across every subsequent audit. Since the page doesn't explicitly label it deprecated, we don't set `"deprecated": true` on a guess; kept on manual review per the "never auto-delete" rule.

28. **GPT-5.6 Sol price cut, confirmed 2026-08-22 via two independent targeted re-fetches**: Standard (short-context) rate dropped from $5/$0.50/$30 (in/cache/out) to $4/$0.40/$20; batch dropped from $2.50/$15 to $2/$10. Terra and Luna were re-checked in the same run and matched stored values exactly (no change), which is why Sol's mismatch was treated as a real price cut rather than an extraction fluke — see gotcha 18 for the updated LC-tier figures.

29. **Artificial Analysis now surfaces only variant-suffixed entries for some models (2026-08-22)**: A targeted re-check for exact base names ("Claude Sonnet 5", "Claude Fable 5", etc.) found only qualified rows — e.g. "Claude Sonnet 5 (max)" [55], "Claude Sonnet 5 (Non-reasoning)" [43], "Claude Fable 5 (with fallback)" [62] — no unqualified base-name row present. Since it's unclear which variant (if any) corresponds to our stored convention, no scores were rewritten from these reads; treat any single variant-suffixed AA score as manual review, not a source of truth, until a plain base-name row reappears. (Recurred 2026-08-25: only "Claude Opus 5 (max)" [63], "Claude Opus 5 (xhigh)" [63], "Claude Opus 5 (high)" [61], "Claude Fable 5 (with fallback)" [62], "Claude Sonnet 5 (max)" [55] surfaced — still no plain base-name rows; no scores rewritten.)

30. **OpenAI pricing page also lists a full legacy/previous-generation catalog under "Flagship models" (discovered 2026-08-28)**: Three independent targeted fetches confirmed literal table rows for `gpt-5` ($1.25/$0.125/$10.00, batch $0.625/$5.00), `gpt-5.1` (identical to gpt-5), and `gpt-5.2` ($1.75/$0.175/$14.00, batch $0.875/$7.00) — plus, in the surrounding table context, `gpt-5.2-pro` ($21/$168), `gpt-4o` ($2.50/$10), `gpt-4o-2024-05-13` ($5/$15), and `gpt-4.1-nano` ($0.10/$0.40). None are labeled deprecated on the page. These predate our tracked GPT-5.4/5.5/5.6 family (and 5.3 Codex) in the same generational line the way `gpt-4o` predates `gpt-5` — i.e. previous-generation flagships still billable but superseded, analogous to Claude 3/Gemini 1.5/Grok 2/o-series, none of which we track either. Deliberately NOT added to pricing.json: this project tracks current-generation flagships across the four labs, not full historical catalogs. `gpt-5` is separately referenced in the web-search supported-models list above (line ~42) — that reference predates this discovery and doesn't imply it should be a pricing.json row. Re-raise as a scope question if the user wants full-catalog coverage; don't silently add these on a future run without an explicit decision.
