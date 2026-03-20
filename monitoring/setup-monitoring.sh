#!/bin/bash
# Setup script — run once on the VPS to install monitoring cron jobs and log rotation
# Usage: bash /var/www/khoshasystems/monitoring/setup-monitoring.sh

MONITOR_DIR="/var/www/khoshasystems/monitoring"
LOG_DIR="/root/Production/logs/monitoring"

set -e

echo "=== Setting up production monitoring ==="

# Create log directory
mkdir -p "$LOG_DIR"

# Make scripts executable
chmod +x "$MONITOR_DIR/health-check.sh"
chmod +x "$MONITOR_DIR/ssl-check.sh"
chmod +x "$MONITOR_DIR/disk-check.sh"
chmod +x "$MONITOR_DIR/pm2-check.sh"

# Install logrotate config for nginx
cp "$MONITOR_DIR/nginx-logrotate.conf" /etc/logrotate.d/khosha-nginx
echo "  Nginx logrotate config installed"

# Install cron jobs (idempotent — removes old entries first)
CRON_TAG="# khosha-monitoring"
(crontab -l 2>/dev/null | grep -v "$CRON_TAG") | crontab -

# Add monitoring cron jobs
(crontab -l 2>/dev/null; cat <<EOF
*/5 * * * * $MONITOR_DIR/health-check.sh $CRON_TAG
*/5 * * * * $MONITOR_DIR/pm2-check.sh $CRON_TAG
0 6 * * * $MONITOR_DIR/ssl-check.sh $CRON_TAG
0 7 * * * $MONITOR_DIR/disk-check.sh $CRON_TAG
EOF
) | crontab -

echo "  Cron jobs installed:"
echo "    - Health check: every 5 minutes"
echo "    - PM2 check: every 5 minutes"
echo "    - SSL expiry check: daily at 6:00 AM"
echo "    - Disk usage check: daily at 7:00 AM"

# Verify
echo ""
echo "=== Current monitoring cron entries ==="
crontab -l | grep "$CRON_TAG"

echo ""
echo "=== Logs directory ==="
ls -la "$LOG_DIR" 2>/dev/null || echo "  (empty — will populate on first run)"

echo ""
echo "Setup complete! Monitoring is now active."
echo "View logs: tail -f $LOG_DIR/health-check.log"
echo "View alerts: cat $LOG_DIR/alerts.log"
