#!/bin/bash
# PM2 process monitoring — runs every 5 minutes via cron
# Verifies khosha-api is online, logs memory/CPU, auto-restarts if needed

LOG_DIR="/root/Production/logs/monitoring"
LOG_FILE="$LOG_DIR/pm2-check.log"
ALERT_LOG="$LOG_DIR/alerts.log"
PM2_APP="khosha-api"
MEMORY_WARN_MB=512

mkdir -p "$LOG_DIR"

NOW=$(date '+%Y-%m-%d %H:%M:%S')

# Get PM2 process info as JSON
PM2_INFO=$(pm2 jlist 2>/dev/null)

if [ -z "$PM2_INFO" ] || [ "$PM2_INFO" = "[]" ]; then
    echo "$NOW | ERROR | PM2 returned no processes" >> "$LOG_FILE"
    echo "$NOW | ALERT | PM2 daemon may be down — no processes found" >> "$ALERT_LOG"
    # Attempt to start the app
    if [ -f /var/www/khoshasystems/ecosystem.config.cjs ]; then
        cd /var/www/khoshasystems && pm2 start ecosystem.config.cjs 2>/dev/null
        echo "$NOW | Auto-start attempted from ecosystem.config.cjs" >> "$LOG_FILE"
    fi
    exit 1
fi

# Parse process info
read -r STATUS MEMORY CPU RESTARTS UPTIME <<< $(echo "$PM2_INFO" | python3 -c "
import sys, json
try:
    procs = json.load(sys.stdin)
    for p in procs:
        if p.get('name') == '$PM2_APP':
            env = p.get('pm2_env', {})
            monit = p.get('monit', {})
            mem_mb = round(monit.get('memory', 0) / 1024 / 1024, 1)
            cpu = monit.get('cpu', 0)
            restarts = env.get('restart_time', 0)
            uptime = env.get('pm_uptime', 0)
            print(f\"{env.get('status', 'unknown')} {mem_mb} {cpu} {restarts} {uptime}\")
            sys.exit(0)
    print('not_found 0 0 0 0')
except:
    print('error 0 0 0 0')
" 2>/dev/null)

echo "$NOW | $PM2_APP | status=$STATUS | mem=${MEMORY}MB | cpu=${CPU}% | restarts=$RESTARTS" >> "$LOG_FILE"

# Alert if not online
if [ "$STATUS" != "online" ]; then
    echo "$NOW | ALERT | $PM2_APP is $STATUS — restarting" >> "$ALERT_LOG"
    pm2 restart "$PM2_APP" 2>/dev/null
    echo "$NOW | Auto-restart triggered for $PM2_APP" >> "$LOG_FILE"
fi

# Warn on high memory
MEM_INT=${MEMORY%.*}
if [ "${MEM_INT:-0}" -gt "$MEMORY_WARN_MB" ]; then
    echo "$NOW | ALERT | $PM2_APP memory usage ${MEMORY}MB exceeds ${MEMORY_WARN_MB}MB threshold" >> "$ALERT_LOG"
fi
