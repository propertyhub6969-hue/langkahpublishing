#!/usr/bin/env bash
# Build & redeploy Langkah Pulang Publishing (Next.js) ke container edge.
# Pakai flag yang sama setiap kali supaya volume data & kredensial admin konsisten.
set -euo pipefail
cd "$(dirname "$0")"

# Muat kredensial (SESSION_SECRET, ADMIN_USERNAME, ADMIN_BOOTSTRAP_PASSWORD)
if [ -f .env.deploy ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.deploy
  set +a
else
  echo "⚠️  .env.deploy tidak ditemukan — panel admin tidak akan bisa login pertama kali." >&2
fi

echo "→ Build image…"
docker build -t langkahpublishing-landing:latest .

echo "→ Ganti container…"
docker rm -f langkahpublishing_frontend >/dev/null 2>&1 || true
docker run -d --name langkahpublishing_frontend \
  --network edge \
  --restart unless-stopped \
  -v langkahpublishing_data:/app/data \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e HOSTNAME=0.0.0.0 \
  -e SESSION_SECRET="${SESSION_SECRET:-}" \
  -e ADMIN_USERNAME="${ADMIN_USERNAME:-admin}" \
  -e ADMIN_BOOTSTRAP_PASSWORD="${ADMIN_BOOTSTRAP_PASSWORD:-}" \
  langkahpublishing-landing:latest

echo "→ Selesai. Cek: https://langkahpublishing.my.id"
