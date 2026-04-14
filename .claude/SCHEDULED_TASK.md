# Scheduled pricing audit

This repo ships with a `/check-pricing` slash command that audits every source URL in `data/sources.md` against `data/pricing.json`. It's designed to run as a Claude Code cloud scheduled task.

## Setup (one-time)

1. Go to [claude.ai/code](https://claude.ai/code) and open this repository.
2. Create a new **Scheduled task** with:
   - **Schedule:** every 3 days. Cron equivalent: `0 14 */3 * *` (2pm UTC every third day — pick any hour that suits you).
   - **Prompt:**
     ```
     /check-pricing --apply
     ```
   - **Branch:** `main` (the slash command handles branching itself: it commits no-change README bumps straight to `main` and opens a PR from `claude/pricing-audit-YYYYMMDD` when pricing actually changes).

3. Confirm the GitHub MCP is enabled for the task so it can open PRs and comment on issues.

That's it. Nothing to configure in this repo — the schedule lives in Anthropic's UI, the logic lives in `.claude/commands/check-pricing.md`.

## What each run does

- **No changes found:** commits a README "Last audited" date bump directly to `main`. No PR, no issue.
- **Price drift or new models found:** opens a PR titled `Pricing audit YYYY-MM-DD` with the audit report as the body and the updated `pricing.json` + `README.md` in the diff. Review and merge.
- **One or more sources unreachable:** commits the README bump to `main` and comments on (or opens) a rolling issue titled `Pricing audit: fetch failures`. No PR spam for transient network blips.

## Cost / token usage

Every scheduled-task run page on claude.ai/code shows the exact input/output tokens consumed and the dollar cost. The audit also appends an approximate token-usage note to each PR body as a quick eyeball check.

At 3-day cadence this is roughly ten runs a month. Each run fetches six source pages and does one pass of diffing — it should be cheap. If it isn't, bump the cron to weekly.

## Running manually

From any Claude Code session on this repo:

```
/check-pricing              # dry run — prints report, touches nothing
/check-pricing --apply      # does the commit/PR flow described above
```
