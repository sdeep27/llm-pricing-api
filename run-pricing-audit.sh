#!/usr/bin/env bash
# Self-update wrapper for the LLM pricing audit.
# Runs the headless Claude Code audit and sends a Telegram alert on failure,
# so an auth expiry (or any silent failure) surfaces in days, not a month.
#
# Auth:      CLAUDE_CODE_OAUTH_TOKEN, sourced from .audit.env (chmod 600, gitignored).
#            Regenerate with `claude setup-token` when it eventually expires (~1yr).
# Alerting:  TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID, reused from the wf-redux .env.
set -uo pipefail

APP_DIR="/home/deep/apps/llm-pricing-api"
CLAUDE_BIN="/home/deep/.local/bin/claude"
LOG="$APP_DIR/logs/pricing-check_$(date +%F).log"
cd "$APP_DIR" || exit 1

# --- credentials -----------------------------------------------------------
# Long-lived OAuth token for headless auth.
[ -f "$APP_DIR/.audit.env" ] && set -a && . "$APP_DIR/.audit.env" && set +a
# Telegram creds (reused from the daily-status cron's env).
if [ -f /home/deep/apps/wf-redux/consumers/.env ]; then
  TELEGRAM_BOT_TOKEN=$(grep -E '^TELEGRAM_BOT_TOKEN=' /home/deep/apps/wf-redux/consumers/.env | cut -d= -f2-)
  TELEGRAM_CHAT_ID=$(grep -E '^TELEGRAM_CHAT_ID=' /home/deep/apps/wf-redux/consumers/.env | cut -d= -f2-)
fi

alert() {
  local msg="$1"
  if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
    curl -s -m 20 "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
      --data-urlencode "text=${msg}" >/dev/null 2>&1
  fi
}

# --- run the audit ---------------------------------------------------------
# Force OAuth-token auth; never let a stray API key take precedence.
unset ANTHROPIC_API_KEY
OUT=$("$CLAUDE_BIN" -p "/check-pricing --apply" \
  --allowedTools "Read,Write,Edit,Grep,Glob,Bash,WebFetch" \
  --max-turns 60 --no-session-persistence 2>&1)
CODE=$?
printf '%s\n' "$OUT" >> "$LOG"

# --- detect failure --------------------------------------------------------
# Fail if the CLI errored, auth broke, or output is suspiciously tiny
# (real audit reports are hundreds of bytes; a 401 is ~74).
FAILED=""
if [ "$CODE" -ne 0 ]; then
  FAILED="claude exited $CODE"
elif printf '%s' "$OUT" | grep -qiE 'invalid authentication|failed to authenticate|API Error|401|Unauthorized|Credit balance|rate limit'; then
  FAILED="auth/API error in output"
elif [ "${#OUT}" -lt 200 ]; then
  FAILED="output too short (${#OUT} bytes) — likely aborted before running"
fi

if [ -n "$FAILED" ]; then
  alert "⚠️ LLM pricing self-update FAILED ($(date +%F %T) UTC): ${FAILED}. Last lines: $(printf '%s' "$OUT" | tail -c 300)"
  exit 1
fi
exit 0
