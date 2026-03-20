#!/bin/bash
# Health check for khoshasystems.com — runs via cron every 5 minutes
# Checks site, API, and PM2 process; logs results and alerts on failure

LOG_DIR="/root/Production/logs/monitoring"
LOG_FILE="$LOG_DIR/health-check.log"
ALERT_LOG="$LOG_DIR/alerts.log"
SITE_URL="https://khoshasystems.com"
API_URL="https://khoshasystems.com/api/push/vapid-key"
PM2_APP="khosha-api"
MAX_LOG_LINES=5000

mkdir -p "$LOG_DIR"

NOW=$(date '+%Y-%m-%d %H:%M:%S')
STATUS="OK"
DETAILS=""

# 1. Site check
SITE_CODE=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL")
if [ "$SITE_CODE" != "200" ]; then
    STATUS="FAIL"
    DETAILS="$DETAILS site=$SITE_CODE"
fi

# 2. API check
API_CODE=$(curl -sk -o /dev/null -w "%{http_code}" --max-time 10 "$API_URL")
if [ "$API_CODE" != "200" ]; then
    STATUS="FAIL"
    DETAILS="$DETAILS api=$API_CODE"
fi

# 3. PM2 process check
PM2_STATUS=$(pm2 jlist 2>/dev/null | python3 -c "
import sys, json
try:
    procs = json.load(sys.stdin)
    for p in procs:
        if p.get('name') == '$PM2_APP':
            print(p.get('pm2_env', {}).get('status', 'unknown'))
            sys.exit(0)
    print('not_found')
except:
    print('error')
" 2>/dev/null)

if [ "$PM2_STATUS" != "online" ]; then
    STATUS="FAIL"
    DETAILS="$DETAILS pm2=$PM2_STATUS"
    # Attempt auto-restart if process is errored or stopped
    if [ "$PM2_STATUS" = "errored" ] || [ "$PM2_STATUS" = "stopped" ]; then
        pm2 restart "$PM2_APP" 2>/dev/null
        DETAILS="$DETAILS (auto-restart attempted)"
    fi
fi

# 4. Response time
RESPONSE_TIME=$(curl -sk -o /dev/null -w "%{time_total}" --max-time 10 "$SITE_URL")

# Log result
echo "$NOW | $STATUS | site=$SITE_CODE api=$API_CODE pm2=$PM2_STATUS time=${RESPONSE_TIME}s $DETAILS" >> "$LOG_FILE"

# Alert on failure
if [ "$STATUS" = "FAIL" ]; then
    echo "$NOW | ALERT | $DETAILS" >> "$ALERT_LOG"
fi

# Rotate log if too large
if [ -f "$LOG_FILE" ]; then
    LINE_COUNT=$(wc -l < "$LOG_FILE")
    if [ "$LINE_COUNT" -gt "$MAX_LOG_LINES" ]; then
        tail -n 3000 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
    fi
fi
