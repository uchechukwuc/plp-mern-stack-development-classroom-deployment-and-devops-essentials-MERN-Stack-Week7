#!/bin/bash

# Database backup script for MERN application
# Usage: ./backup.sh [database_name] [backup_dir]

set -e

DB_NAME=${1:-"mern-todo"}
BACKUP_DIR=${2:-"./backups"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="${DB_NAME}_${TIMESTAMP}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Starting database backup..."
echo "Database: $DB_NAME"
echo "Backup location: $BACKUP_DIR/$BACKUP_NAME"

# Create backup using mongodump
if command -v mongodump &> /dev/null; then
    mongodump --db "$DB_NAME" --out "$BACKUP_DIR/$BACKUP_NAME"

    # Compress the backup
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" -C "$BACKUP_DIR" "$BACKUP_NAME"

    # Remove uncompressed backup
    rm -rf "$BACKUP_DIR/$BACKUP_NAME"

    echo "Backup completed successfully: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"

    # List backup files
    echo "Recent backups:"
    ls -la "$BACKUP_DIR"/*.tar.gz | tail -5
else
    echo "Error: mongodump not found. Please install MongoDB tools."
    exit 1
fi

# Clean up old backups (keep last 10)
echo "Cleaning up old backups..."
cd "$BACKUP_DIR"
ls -t *.tar.gz | tail -n +11 | xargs -r rm -f

echo "Backup script completed."