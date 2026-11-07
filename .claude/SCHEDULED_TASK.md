# Scheduled pricing audit

The `/check-pricing` command audits every source in `data/sources.md` against `data/pricing.json`. It runs automatically via system cron on the VPS.

## Cron entry

```
CRON_TZ=UTC
# claude's install dir must be on cron's PATH (run-pricing-audit.sh uses `command -v claude`)
PATH=<claude install dir>:/usr/local/bin:/usr/bin:/bin
# LLM Pricing API - audit pricing sources every 3 days at 2pm UTC
0 14 */3 * * <repo>/run-pricing-audit.sh
```

`run-pricing-audit.sh` loads secrets from `.audit.env` (chmod 600, gitignored), runs `claude -p "/check-pricing --apply"` headless, appends output to `logs/pricing-check_YYYY-MM-DD.log`, and sends a Telegram alert if the run fails. `.audit.env` holds:

- `CLAUDE_CODE_OAUTH_TOKEN` (subscription auth, from `claude setup-token`)
- `ARTIFICIAL_ANALYSIS_KEY` (intelligence scores)
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (failure alerts)

## What each run does

- Fetches the provider pricing pages and the Artificial Analysis API, diffs against `pricing.json`
- Bumps `last_updated` in `pricing.json` and "Last audited" in `README.md`
- Commits and pushes to `main`
- The post-commit git hook auto-restarts the service, deploying changes immediately
- The site header shows "Pricing last verified: YYYY-MM-DD" so you can confirm it ran

## Checking logs

```bash
ls -la logs/pricing-check_*.log
tail -50 logs/pricing-check_$(date +%F).log
```

## Running manually

From any Claude Code session on this repo:

```
/check-pricing              # dry run — prints report, touches nothing
/check-pricing --apply      # commits and pushes changes
```

Or exactly as cron does, from the repo root:

```bash
./run-pricing-audit.sh
```
