#!/bin/bash
# SSL certificate expiry check for khoshasystems.com
# Runs daily via cron; logs warning if cert expires within 30 days

LOG_DIR="/root/Production/logs/monitoring"
LOG_FILE="$LOG_DIR/ssl-check.log"
ALERT_LOG="$LOG_DIR/alerts.log"
DOMAIN="khoshasystems.com"
WARN_DAYS=30

mkdir -p "$LOG_DIR"

NOW=$(date '+%Y-%m-%d %H:%M:%S')

# Get certificate expiry date
EXPIRY_DATE=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)

if [ -z "$EXPIRY_DATE" ]; then
    echo "$NOW | ERROR | Could not retrieve SSL certificate for $DOMAIN" >> "$LOG_FILE"
    echo "$NOW | ALERT | SSL cert check failed for $DOMAIN" >> "$ALERT_LOG"
    exit 1
fi

EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s 2>/dev/null)
NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))

echo "$NOW | $DOMAIN | expires=$EXPIRY_DATE | days_left=$DAYS_LEFT" >> "$LOG_FILE"

if [ "$DAYS_LEFT" -lt "$WARN_DAYS" ]; then
    echo "$NOW | ALERT | SSL cert for $DOMAIN expires in $DAYS_LEFT days (threshold: $WARN_DAYS)" >> "$ALERT_LOG"
fi

# Also check khosha.tech (cert covers both)
EXPIRY_DATE2=$(echo | openssl s_client -servername "khosha.tech" -connect "khosha.tech:443" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
if [ -n "$EXPIRY_DATE2" ]; then
    EXPIRY_EPOCH2=$(date -d "$EXPIRY_DATE2" +%s 2>/dev/null)
    DAYS_LEFT2=$(( (EXPIRY_EPOCH2 - NOW_EPOCH) / 86400 ))
    echo "$NOW | khosha.tech | expires=$EXPIRY_DATE2 | days_left=$DAYS_LEFT2" >> "$LOG_FILE"
    if [ "$DAYS_LEFT2" -lt "$WARN_DAYS" ]; then
        echo "$NOW | ALERT | SSL cert for khosha.tech expires in $DAYS_LEFT2 days" >> "$ALERT_LOG"
    fi
fi
