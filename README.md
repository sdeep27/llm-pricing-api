# LLM Pricing API

Up-to-date pricing data for models from Anthropic, OpenAI, Google Gemini, and xAI.

Live at [llmpricingapi.com](https://llmpricingapi.com)

## API

```
GET https://llmpricingapi.com/api/models
```

Returns JSON with current pricing for all tracked models. Point your agents here when they need live LLM pricing data.

## Data freshness

Last audited: 2026-09-01

A scheduled Claude Code task re-audits every provider source page every 3 days. When it finds price drift or new models, it commits and pushes directly to main; when everything still matches, it just bumps the date above so you know the check ran.

### Recent audits

<!-- audit-history-start -->
- 2026-09-01: no changes — no price drift on any stored field across all four providers (Anthropic, OpenAI, Google, xAI all re-verified exact matches, including OpenAI's GPT-5.6/5.5/5.4 families, GPT-5.3 Codex, Google's Gemini 3.x/2.5 families, and xAI's Grok 4.6/4.5/4.3/4.20 base-tier rates); no new or missing current-generation tracked models (confirmed Gemini 3 Flash Preview still present via targeted re-fetch, despite a confusing free/paid-column extraction — sources.md gotcha 31); no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard again returned only variant-suffixed rows for Claude models, now also including Opus 5 (medium)[59] and (low)[52] — no scores rewritten; xAI batch/search/X-search/collections columns absent again (~11th consecutive audit, carried forward); OpenAI GPT-5.3 Codex row captured and matched stored exactly, batch columns still absent; Grok 4.20 naming split still unresolved; manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity, OpenAI legacy-catalog scope decision
- 2026-08-31: no changes — no price drift on any stored field across all four providers (Anthropic, OpenAI, Google, xAI all re-verified exact matches); no new or missing current-generation tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard again returned only variant-suffixed rows for Claude models, identical to the 08-25 reading — no scores rewritten; xAI batch/search/X-search/collections columns absent again (~10th consecutive audit, carried forward); OpenAI GPT-5.3 Codex row captured and matched stored exactly, batch columns still absent; Grok 4.20 naming split still unresolved; manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity, OpenAI legacy-catalog scope decision
- 2026-08-28: no changes — no price drift on any stored field across all four providers; no new or missing *current-generation* tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard again returned only variant-suffixed rows for Claude models — no scores rewritten; xAI batch/search/X-search/collections columns absent again (~10th consecutive audit, carried forward); OpenAI GPT-5.3 Codex row captured and matched stored exactly; discovered OpenAI's pricing page also lists a full legacy catalog (gpt-5, gpt-5.1, gpt-5.2, gpt-5.2-pro, gpt-4o, gpt-4.1-nano) under "Flagship models" — deliberately not added, these are previous-generation models outside this project's current-gen scope (sources.md gotcha 30); manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity, OpenAI legacy-catalog scope decision
- 2026-08-25: no changes — no price drift on any stored field across all four providers; no new or missing tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard again returned only variant-suffixed rows ("Opus 5 (max)" [63], "Fable 5 (with fallback)" [62], "Sonnet 5 (max)" [55]) — no scores rewritten; xAI batch/search/X-search/collections columns absent again (~9th consecutive audit, carried forward); OpenAI GPT-5.3 Codex row captured and matched stored exactly, batch columns still absent; Grok 4.20 naming split still unresolved; manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity
- 2026-08-22: OpenAI cut GPT-5.6 Sol standard pricing ($5/$0.50/$30 → $4/$0.40/$20 in/cache/out, batch $2.50/$15→$2/$10), confirmed via two independent targeted re-fetches while Terra/Luna matched stored exactly; no other price drift across any provider; no new or missing tracked models; no provisional scores resolved (GPT-5.5 Pro + Grok 4.20 Multi-Agent still absent from AA); AA leaderboard now returns only variant-suffixed rows ("Sonnet 5 (max)", "Fable 5 (with fallback)") for some models instead of a plain base name — no scores rewritten from these, flagged as manual review; xAI batch/search/X-search/collections columns absent again (~8th consecutive audit, carried forward); manual review: Claude Haiku 3, gpt-5.5-cyber include/exclude decision, Gemini Omni Flash Preview, Grok 4.20 naming split, AA variant-suffix ambiguity
<!-- audit-history-end -->
