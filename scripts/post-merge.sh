#!/bin/bash
set -e
echo "[post-merge] Syncing dependencies..."
npm install --no-audit --no-fund
echo "[post-merge] Done."
