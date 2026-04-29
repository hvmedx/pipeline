#!/usr/bin/env bash
# Runs unit + integration tests with coverage. Used by Jenkins and locally.
set -euo pipefail

export DB_NAME="${DB_NAME:-incident_db}"
export DB_USER="${DB_USER:-root}"
export DB_PASSWORD="${DB_PASSWORD:-root}"
export DB_HOST="${DB_HOST:-127.0.0.1}"
export DB_PORT="${DB_PORT:-3307}"

echo "==> Unit tests"
npm test -- --coverage --testPathPatterns=incident.routes.test.js --ci

echo "==> Integration tests"
npm test -- --testPathPatterns=technicien.integration.test.js --ci
