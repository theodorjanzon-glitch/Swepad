# Swepad

A Next.js e-commerce application backed by Supabase (PostgreSQL) and Stripe.

---

## ✅ What You Need To Do

Follow these steps in order to get the project running.

### Step 1 — Create a Supabase project

1. Sign up / log in at [https://supabase.com](https://supabase.com).
2. Click **New project** and give it a name.
3. Wait for provisioning to finish (~1 min).

---

### Step 2 — Copy your connection strings

1. In your Supabase dashboard go to **Settings → Database**.
2. Scroll to **Connection string → URI**.
3. Copy the **Transaction mode** URL (port `6543`) → this is your `DATABASE_URL`.
4. Copy the **Session mode** URL (port `5432`) → this is your `DIRECT_URL`.

---

### Step 3 — Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in every value:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase → Settings → Database → Transaction mode (port 6543) |
| `DIRECT_URL` | Supabase → Settings → Database → Session mode (port 5432) |
| `STRIPE_SECRET_KEY` | [Stripe dashboard](https://dashboard.stripe.com/apikeys) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` for local dev |
| `JWT_SECRET` | Any long random string |

Also copy the same `DATABASE_URL` and `DIRECT_URL` into `prisma/.env` (used by the Prisma CLI).

---

### Step 4 — Install dependencies & push the database schema

```bash
npm install          # installs packages and auto-generates the Prisma client
npm run db:push      # creates all tables in Supabase
```

---

### Step 5 — Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Step 6 — Deploy to Vercel

1. Push this repo to GitHub (if not already done).
2. Import the project in [https://vercel.com/new](https://vercel.com/new).
3. Add every variable from `.env.local` under **Settings → Environment Variables**.
4. Deploy — the `postinstall` script will generate the Prisma client automatically.

> For the full Supabase setup guide see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

---

## Useful Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:migrate` | Run pending migrations (production) |
| `npm run db:studio` | Open Prisma Studio to browse data |
