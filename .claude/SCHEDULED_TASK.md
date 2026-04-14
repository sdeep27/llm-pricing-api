# Scheduled pricing audit

The `/check-pricing` command audits every source URL in `data/sources.md` against `data/pricing.json`. It runs automatically via system cron on the VPS.

## Cron entry

```
# LLM Pricing API - audit pricing sources every 3 days at 2pm UTC
0 14 */3 * * cd /home/deep/apps/llm-pricing-api && /home/deep/.local/bin/claude -p "/check-pricing --apply" --allowedTools "Read,Write,Edit,Grep,Glob,Bash,WebFetch" --max-turns 30 --no-session-persistence >> ./logs/pricing-check_$(date +\%F).log 2>&1
```

## What each run does

- Fetches all 6 source pages, diffs against `pricing.json`
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

Or non-interactively:

```bash
cd /home/deep/apps/llm-pricing-api
claude -p "/check-pricing --apply" --allowedTools "Read,Write,Edit,Grep,Glob,Bash,WebFetch" --max-turns 30
```
