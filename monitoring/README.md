# Monitoring Configuration

This directory contains monitoring and maintenance configurations for the MERN application.

## Health Check Endpoints

### Backend Health Check
- **URL**: `GET /api/health`
- **Response**: JSON with server status, uptime, memory usage, and database connection status

### Database Health Check
- **Script**: `server/healthcheck.js`
- **Usage**: Used by Docker health checks and monitoring services

## Monitoring Services

### Recommended Services

1. **Uptime Monitoring**
   - UptimeRobot (free tier available)
   - Pingdom
   - New Relic

2. **Error Tracking**
   - Sentry
   - Rollbar
   - Bugsnag

3. **Performance Monitoring**
   - New Relic APM
   - DataDog
   - AppDynamics

4. **Log Management**
   - LogRocket
   - Papertrail
   - Loggly

## Setup Instructions

### Sentry Error Tracking

1. Create account at [sentry.io](https://sentry.io)
2. Create new project for Node.js backend
3. Install Sentry SDK:
   ```bash
   cd server
   npm install @sentry/node @sentry/tracing
   ```

4. Configure Sentry in `server/server.js`:
   ```javascript
   const Sentry = require('@sentry/node');
   const Tracing = require('@sentry/tracing');

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     integrations: [
       new Sentry.Integrations.Http({ tracing: true }),
       new Tracing.Integrations.Express({ app }),
     ],
     tracesSampleRate: 1.0,
   });
   ```

### UptimeRobot Setup

1. Create account at [uptimerobot.com](https://uptimerobot.com)
2. Add monitor for backend: `https://your-backend-url.com/api/health`
3. Add monitor for frontend: `https://your-frontend-url.com`
4. Configure alert channels (email, Slack, etc.)

## Maintenance Scripts

### Database Backup
```bash
# Manual backup
mongodump --db mern-todo --out backup/$(date +%Y%m%d_%H%M%S)

# Automated backup script
./scripts/backup.sh
```

### Log Rotation
```bash
# Rotate logs weekly
./scripts/rotate-logs.sh
```

### Deployment Rollback
```bash
# Rollback to previous version
./scripts/rollback.sh