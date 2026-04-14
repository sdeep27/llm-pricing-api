---
description: Audit every source in data/sources.md against data/pricing.json. With --apply, commits and pushes changes directly to main.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, WebFetch
---

# Pricing & Model Freshness Audit

Audit this project's pricing data for staleness against provider source pages.

## What to detect

1. **Price drift** — a value in `data/pricing.json` no longer matches the provider's published price.
2. **Missing models** — a provider has released a model not yet in `data/pricing.json`.
3. **Schema drift** — a provider has added a new billing dimension our schema doesn't cover.
4. **Fetch failures** — a source URL is unreachable or changed structure.

## Steps

1. Read `data/sources.md` and `data/pricing.json` in full. Note `last_updated` and the scraping gotchas — they tell you what quirks to watch for (Anthropic redirects, Google's per-1K-vs-per-search units, Google's multi-tier free quotas, xAI's doc structure, etc.).

2. For **each** source URL in `data/sources.md` (Anthropic pricing, OpenAI pricing, Google pricing, xAI models, the Anthropic web-search supplementary URL, and the Artificial Analysis leaderboard), call `WebFetch`. If a fetch fails, record the failure and continue — do not abort the audit.

3. For each provider, extract `{model_name, input_price, output_price, cache_read_price, batch_input_price, batch_output_price, search_price, search_free_tier, max_output, context_window}` from the page. Convert units to match our storage (e.g. per-1K-searches → per-search by dividing by 1000).

4. Diff against `data/pricing.json`:
   - **Missing model** — on the provider page but not in `pricing.json`. Capture a full proposed row.
   - **Price mismatch** — any stored non-null field differs from the source.
   - **`null` → value** — we had no value, source now publishes one. Treat as a fill-in, not a mismatch.
   - **Removed/renamed model** — in `pricing.json` but not on the page. Flag for review; never auto-delete.

5. Build a report at `/tmp/pricing-audit.md` with:
   - Header line with today's date.
   - `## Summary` — counts per category (new models, price changes, removals, fetch failures).
   - `## New Models` — table of model, provider, proposed pricing row, source URL.
   - `## Price Changes` — table of model, field, old value, new value, source URL.
   - `## Fetch Failures / Manual Review` — anything unverifiable.
   - `## Approx token usage` — a short note like "~N input tokens of source pages fetched; see scheduled-task run page for exact usage."

6. Always update `README.md` to set the "Last audited" line to today's date, regardless of whether anything changed. If the line does not exist yet, add a `## Data freshness` section after the API section containing it.

7. Branch on outcome:

   **If no pricing changes** (only the README was touched):
   - Commit on `main` with message `chore: pricing audit YYYY-MM-DD (no changes)`.
   - `git push origin main`.

   **If pricing.json changed** (and `--apply` was passed):
   - Also bump `last_updated` in `pricing.json` to today's date.
   - Commit all changed files on `main` with message `chore: pricing audit YYYY-MM-DD`.
   - `git push origin main`.

   **If `--apply` was NOT passed:**
   - Skip all git/PR steps. Leave files untouched except printing the report to stdout.

   **If there were fetch failures only** (no content changes found, but some sources unreachable):
   - Still do the no-change path (commit README freshness to main, push).

8. Also keep `to_do.md` in sync: if pricing changed, append a one-line completed entry describing the audit date.

9. Print the report to stdout at the end.

## Guidance

- Be conservative. Ambiguous page layout → "Manual Review", not a guess.
- Respect the gotchas in `data/sources.md`.
- Use exact provider-published model names.
- Do not touch `last_updated` in `pricing.json` unless pricing actually changed.
- Keep the report terse — it becomes a PR body.

Arguments passed to this command: $ARGUMENTS
