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
- Tool versions: `web_search_20260209` (with dynamic filtering, requires code execution tool) and `web_search_20250305` (basic)
- `web_search_20260209` dynamic filtering supported on: Claude Mythos Preview, Opus 4.7, Opus 4.6, Sonnet 4.6
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
- Gemini 2.5 (Pro, Flash, Flash-Lite): $35/1K ($0.035/search), **1,500 free searches/day** (RPD, shared across Flash and Flash-Lite; Pro gets 10,000 RPD free for Maps grounding)
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
- **xAI**: 0.1x base input. Automatic caching, no user configuration needed.

## Batch Pricing

All four providers offer batch processing at roughly 50% off standard rates.

- **Anthropic**: Exactly 50% off input and output. All models supported.
- **OpenAI**: Exactly 50% off. GPT-5.3 Codex batch pricing not explicitly listed on pricing page.
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

10. **Google cache storage fees**: Google charges a per-hour storage fee for cached content ($4.50/1M tokens/hour) on top of the discounted read price. We only track the read price, not storage. This makes Google caching harder to compare directly with other providers.

11. **xAI max output tokens**: xAI docs don't publish explicit max output limits. The models list a 2M context window but no output cap. Stored as null.

12. **Anthropic max output varies by model generation**: Unlike OpenAI (consistent 128K) or Google (consistent 65K), Anthropic's max output ranges from 4K (Haiku 3) to 128K (Opus 4.7/4.6). Always check per-model.

13. **Opus 4.7 tokenizer change**: Opus 4.7 uses a new tokenizer that may use up to 35% more tokens for the same text compared to previous models. This affects effective cost comparisons.
