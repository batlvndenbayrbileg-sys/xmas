#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# X-MAS sneaker store — one-time backend bootstrap.
# Creates a SEPARATE Medusa database (xmas_store) and seeds the sneaker catalog,
# so this project never touches the beauty store's `vexo_store` database.
#
# Prereqs: Postgres running on 127.0.0.1:5433 (user vexo), Redis on :6379.
# createdb/psql must be on PATH — or set PG to your Postgres bin dir, e.g.
#   PG="/c/Program Files/PostgreSQL/16/bin" bash scripts/setup-xmas.sh
# Run from the project root:  bash scripts/setup-xmas.sh
# ---------------------------------------------------------------------------
set -euo pipefail

PGHOST="${PGHOST:-127.0.0.1}"
PGPORT="${PGPORT:-5433}"
PGUSER="${PGUSER:-vexo}"
DB="${DB:-xmas_store}"
CREATEDB="createdb"; PSQL="psql"
[ -n "${PG:-}" ] && CREATEDB="$PG/createdb" && PSQL="$PG/psql"

echo "==> Creating database $DB on $PGHOST:$PGPORT (ignore error if it exists)"
"$CREATEDB" -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" "$DB" || true

cd "$(dirname "$0")/../medusa-backend/apps/backend"

echo "==> Running migrations"
npx medusa db:migrate

echo "==> Seeding (region → shipping → MNT → brands → sneakers → inventory)"
npx medusa exec ./src/scripts/seed-region.ts
npx medusa exec ./src/scripts/seed-shipping.ts
npx medusa exec ./src/scripts/seed-mnt.ts
npx medusa exec ./src/scripts/seed-categories.ts
npx medusa exec ./src/scripts/seed-naran.ts        # X-MAS sneaker catalog
npx medusa exec ./src/scripts/seed-inventory.ts
# Optional extras (uncomment if you use them):
# npx medusa exec ./src/scripts/seed-free-shipping.ts
# npx medusa exec ./src/scripts/seed-return-shipping.ts
# npx medusa exec ./src/scripts/seed-promotions.ts

echo ""
echo "==> Copy these into web/.env.local (PK + region) and api/.env (PK):"
"$PSQL" -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$DB" \
  -c "select token as NEXT_PUBLIC_MEDUSA_PK from api_key where type='publishable';" \
  -c "select id as NEXT_PUBLIC_MEDUSA_REGION, name, currency_code from region;"

echo ""
echo "Done. Start the stack (own ports 9001 / 3002 / 4001):"
echo "  1) Medusa : cd medusa-backend && npm run backend:dev"
echo "  2) app    : npm run dev   (from project root — api :4001 + web :3002)"
echo "  Open http://localhost:3002"
