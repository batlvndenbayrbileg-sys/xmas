# X-MAS — Dokploy deploy (self-hosted, one VPS)

Dokploy runs the **whole X-MAS stack from one Docker Compose file** on your own
VPS — Postgres, Redis, MeiliSearch, Medusa (server + worker), the Express API and
the Next.js storefront, with Traefik TLS/routing built in.

- **Repo:** `github.com/batlvndenbayrbileg-sys/xmas` (branch `main`)
- **Compose file:** `infra/docker-compose.prod.yml` (validated ✓, env-driven)
- **Env template:** `infra/.env.prod.example`
- VPS sizing: ~**4 GB RAM** min (Postgres 768m + Medusa 1G + worker 640m + web
  512m + api + redis + meili). 6–8 GB comfortable.

---

## 1. Install Dokploy (once, on the VPS)
```bash
curl -sSL https://dokploy.com/install.sh | sh
```
Open `http://<vps-ip>:3000`, create the admin account.

## 2. Point a DNS A-record at the VPS
- `xmas.mn` and `www.xmas.mn` → VPS IP (storefront)
- `api.xmas.mn` → VPS IP (Medusa admin + store API)

## 3. Create a Compose project in Dokploy
1. **Create Project → Compose**.
2. **Provider: GitHub** → connect the account → repo `batlvndenbayrbileg-sys/xmas`, branch `main`.
3. **Compose Path:** `infra/docker-compose.prod.yml`.

## 4. Environment
Paste the contents of `infra/.env.prod.example` into the Compose **Environment**
tab and fill the blanks:
- `POSTGRES_PASSWORD`, `JWT_SECRET`, `COOKIE_SECRET`, `MEILISEARCH_API_KEY`
  (generate: `openssl rand -base64 32`)
- `STORE_CORS` / `ADMIN_CORS` / `AUTH_CORS` → your `https://xmas.mn` / `https://api.xmas.mn`
- `NEXT_PUBLIC_MEDUSA_URL=https://api.xmas.mn`, `PUBLIC_SITE_URL=https://xmas.mn`, `STOREFRONT_URL=https://xmas.mn`
- `BOTXON_GATEWAY_KEY` + `BOTXON_WEBHOOK_SECRET` (from Botxon `/owner/gateway`) — **required in prod**
- Leave `NEXT_PUBLIC_MEDUSA_PK` / `NEXT_PUBLIC_MEDUSA_REGION` as placeholders for now (step 7)

## 5. Domains (Dokploy → Domains)
- `web` service, container port **3000** → `xmas.mn` (enable HTTPS/Let's Encrypt)
- `medusa` service, container port **9000** → `api.xmas.mn` (HTTPS)
- `api` stays internal (no domain — `web` reaches it at `http://api:4000`)

## 6. Deploy
Hit **Deploy**. Order is automatic: `postgres`/`redis`/`meilisearch` → `medusa-migrate`
(runs `db:migrate` once) → `medusa` + `medusa-worker` → `api` → `web`.

## 7. Seed the catalog + admin (once)
Dokploy → `medusa` service → **Terminal**:
```bash
cd .medusa/server
npx medusa exec ./src/scripts/seed-region.ts
npx medusa exec ./src/scripts/seed-shipping.ts
npx medusa exec ./src/scripts/seed-mnt.ts
npx medusa exec ./src/scripts/seed-categories.ts   # Converse + New Balance
npx medusa exec ./src/scripts/seed-naran.ts        # 30 X-MAS products
npx medusa exec ./src/scripts/seed-inventory.ts
npx medusa user -e admin@xmas.mn -p '<STRONG_PASSWORD>'
```

## 8. Publishable key + region → finish the storefront
1. Open `https://api.xmas.mn/app` → **Settings → Publishable API Keys** (copy `pk_…`)
   and **Regions** (copy the MNT `reg_…`).
2. Put them in the Compose env: `NEXT_PUBLIC_MEDUSA_PK`, `NEXT_PUBLIC_MEDUSA_REGION`.
3. **Redeploy** (these bake into the web build).

## 9. Botxon webhook
Register `https://xmas.mn/api/webhooks/botxon` in Botxon `/owner/gateway`.

---

### Notes
- **Images:** container disk is ephemeral. For durable product images set the
  `S3_*` (Cloudflare R2) vars, or store images on a Dokploy volume.
- **Backups:** Dokploy can schedule Postgres backups (Database → Backups), or use
  `infra/backup/`.
- **Updates:** push to `main` → redeploy in Dokploy (enable auto-deploy webhook to
  make it automatic).
- Managed Postgres instead of on-box? Use `infra/docker-compose.managed-db.yml`
  and set the full `DATABASE_URL` (with `?sslmode=require`).
