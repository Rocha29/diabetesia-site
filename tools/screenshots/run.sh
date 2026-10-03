#!/bin/sh
# Captures real V2 screens with demo data and copies them into the site.
# Usage: cd tools/screenshots && npm install && npm run shots
set -eu
cd "$(dirname "$0")"
PORT=${DEMO_PORT:-5180}
npx vite --config vite.config.demo.ts --port "$PORT" --strictPort >vite.log 2>&1 &
VITE_PID=$!
trap 'kill $VITE_PID 2>/dev/null || true' EXIT INT TERM
sleep 4
DEMO_PORT=$PORT node shoot.mjs
cp out/*.png out/*.webp ../../src/assets/screens/
echo "Telas copiadas para src/assets/screens/. Revise as imagens antes do commit."
