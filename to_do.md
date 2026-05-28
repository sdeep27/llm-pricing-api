# To Dos Remaining
- Add image/vision input pricing (needs design discussion for cross-provider comparison)

# Operational notes
- 2026-04-25: cron's `git push` had been failing silently for ~a week (3 audits stranded locally). Backlog pushed manually; auth method for cron now reconfigured so future runs push cleanly.
- 2026-05-05: 2026-05-04 audit committed locally but cron's `--max-turns 30` ran out before `git push` (commit timestamp 14:04:56 — right at the budget edge). Pushed manually; bumped crontab to `--max-turns 60` and reordered `check-pricing.md` so push is the final step with a post-push `git status` verification that fails loudly if the branch isn't up-to-date with origin.

# To Dos Completed
- ~~Integrate Artificial Analysis API for automated rankings (user has API key)~~
- ~~Ask any open questions and develop initial scaffolding~~
- ~~Create .gitignore and make first commit to origin~~
- ~~Explore sources of truth for initial data population~~
- ~~Implement Light Warm theme (Theme 6)~~
- ~~Move API section from footer to top, compact single-row bar~~
- ~~Mobile-responsive styles~~
- ~~Rate limiting for the JSON API (slowapi, 60/min)~~
- ~~Verify pricing data accuracy against source URLs~~
- ~~Add web search pricing column with free tier display~~
- ~~Create data/sources.md with all source URLs, pricing notes, and scraping gotchas~~
- ~~Add max output tokens column~~
- ~~Add cached input pricing column + enable cached tokens in calculator~~
- ~~Add batch input/output pricing columns~~
- ~~Pricing audit 2026-04-14: fixed Haiku 3 cache price, added 3 new models, updated GPT-5.4 Mini score~~
- ~~Set up scheduled `/check-pricing --apply` via VPS cron (every 3 days at 2pm UTC)~~
- ~~Pricing audit 2026-04-16: filled in GPT-5.3 Codex batch pricing ($0.875/$7.00); no other changes~~
- ~~Pricing audit 2026-04-17: added Claude Opus 4.7 (provisional score 54), resolved Gemini 3.1 Flash-Lite Preview score (26→34)~~
- ~~Pricing audit 2026-04-19: resolved Claude Opus 4.7 provisional score (54→57)~~
- ~~Pricing audit 2026-04-25: added GPT-5.5 + GPT-5.5 Pro (provisional), updated GPT-5.3 Codex batch pricing (now equals standard, no discount), refreshed AA scores for Opus 4.6, Haiku 4.5, GPT-5.4 Nano, Gemini 2.5 Pro, Gemini 2.5 Flash-Lite~~
- ~~Pricing audit 2026-04-28: resolved GPT-5.5 provisional score (58→60); xAI page didn't expose pricing inline so Grok rows carried forward unchanged~~
- ~~Pricing audit 2026-05-01: Gemini 2.5 Flash and Flash-Lite free search tiers cut from 1.5K/day to 500/day; flagged a possible new Grok 4.3 model (AA score 53) for manual review since xAI page still doesn't expose pricing inline~~
- ~~Pricing audit 2026-05-04: Gemini 2.5 Flash and Flash-Lite free search tiers reverted from 500/day back to a 1.5K/day shared pool; Grok 4.3 (now on AA at 53) still flagged for manual review since xAI page doesn't expose pricing inline~~
- ~~Pricing audit 2026-05-10: added Grok 4.3 (AA score 53, ctx 1M); xAI cut Grok 4.20 and Grok 4.20 Multi-Agent prices (input $2.00→$1.25, output $6.00→$2.50, batch and cache scaled accordingly)~~
- ~~Pricing audit 2026-05-13: Gemini 2.5 Flash and Flash-Lite free search tiers flipped back to 500/day shared (from 1.5K/day shared); marked Grok 4.1 Fast deprecated (xAI page announces 2026-05-15 retirement)~~
- ~~Pricing audit 2026-05-16: marked Claude Haiku 3.5 deprecated (Anthropic pricing page now labels it "retired, except on Bedrock and Vertex AI")~~
- ~~Pricing audit 2026-05-25: added Gemini 3.5 Flash (AA score 55, $1.50/$9.00) and Grok Build 0.1 ($1/$2, 256K, score null); cut Grok 4.20 and Grok 4.20 Multi-Agent context window 2M→1M (second observation); Gemini 2.5 Flash + Flash-Lite free search tier flipped back to 1.5K/day shared (from 500/day shared)~~
- ~~Pricing audit 2026-05-28: renamed Gemini 3.1 Flash-Lite Preview → Gemini 3.1 Flash-Lite (now GA on Google's pricing page, pricing and score unchanged); flagged Claude Haiku 3 for manual review (no longer listed on Anthropic's pricing table)~~
