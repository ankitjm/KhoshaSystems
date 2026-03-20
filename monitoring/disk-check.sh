#!/bin/bash
# Disk usage monitoring — runs daily via cron
# Alerts if any partition exceeds 80% usage

LOG_DIR="/root/Production/logs/monitoring"
LOG_FILE="$LOG_DIR/disk-check.log"
ALERT_LOG="$LOG_DIR/alerts.log"
THRESHOLD=80

mkdir -p "$LOG_DIR"

NOW=$(date '+%Y-%m-%d %H:%M:%S')

# Check each mounted filesystem (skip tmpfs, devtmpfs)
ALERT=0
while IFS= read -r line; do
    USAGE=$(echo "$line" | awk '{print $5}' | tr -d '%')
    MOUNT=$(echo "$line" | awk '{print $6}')
    SIZE=$(echo "$line" | awk '{print $2}')
    AVAIL=$(echo "$line" | awk '{print $4}')

    echo "$NOW | $MOUNT | usage=${USAGE}% | size=$SIZE | avail=$AVAIL" >> "$LOG_FILE"

    if [ "$USAGE" -gt "$THRESHOLD" ]; then
        echo "$NOW | ALERT | Disk usage on $MOUNT is ${USAGE}% (threshold: ${THRESHOLD}%)" >> "$ALERT_LOG"
        ALERT=1
    fi
done < <(df -h --type=ext4 --type=xfs --type=btrfs 2>/dev/null | tail -n +2)

if [ "$ALERT" -eq 0 ]; then
    echo "$NOW | All partitions below ${THRESHOLD}% threshold" >> "$LOG_FILE"
fi
