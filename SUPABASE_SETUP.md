# Supabase Setup Guide

This guide explains how to set up Supabase as the database for Swepad.

## Prerequisites

- A [Supabase](https://supabase.com) account
- Node.js 18+ installed

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New project** and fill in the project details.
3. Wait for the project to finish provisioning.

---

## 2. Get Connection Strings

1. In your Supabase dashboard, go to **Settings → Database**.
2. Scroll to **Connection string** and select the **URI** tab.
3. Copy the **Transaction mode** connection string (port `6543`) — this is your `DATABASE_URL` (used by the app via PgBouncer connection pooling).
4. Copy the **Session mode** connection string (port `5432`) — this is your `DIRECT_URL` (used by Prisma for migrations).

Your connection strings will look like:

```
# DATABASE_URL (pooled, port 6543 — used by the app)
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# DIRECT_URL (direct, port 5432 — used by Prisma migrations)
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

---

## 3. Configure Environment Variables

Copy `.env.example` to `.env.local` (for local development) and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
JWT_SECRET="your-secret-key-here"
```

Also update `prisma/.env` with the same `DATABASE_URL` and `DIRECT_URL` values (used by Prisma CLI).

---

## 4. Install Dependencies

```bash
npm install
```

---

## 5. Run Database Migrations

Generate the Prisma client and push the schema to Supabase:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase (creates tables)
npm run db:push
```

Or, to use proper migrations:

```bash
npx prisma migrate dev --name init
```

---

## 6. Verify the Setup

Open Prisma Studio to browse your database:

```bash
npm run db:studio
```

Or check your Supabase dashboard under **Table Editor** to confirm the tables were created.

---

## 7. Deploy to Vercel

### Add Environment Variables

1. Go to your Vercel project → **Settings → Environment Variables**.
2. Add the following variables for **Production**, **Preview**, and **Development**:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_BASE_URL`
   - `JWT_SECRET`

### Add Prisma Generate to Build

Vercel needs to generate the Prisma client during the build. Add a `postinstall` script to `package.json`:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Deploy

Push your code to GitHub and Vercel will automatically build and deploy.

---

## Models

The database schema includes the following models:

| Model       | Description                            |
|-------------|----------------------------------------|
| `Product`   | Store products with name, price, etc.  |
| `Order`     | Customer orders                        |
| `OrderItem` | Individual line items within an order  |
| `Admin`     | Admin user accounts                    |
| `Inventory` | Stock levels per product               |

---

## Troubleshooting

### Connection timeout
- Ensure you are using the **pooled** connection string (port `6543`) for `DATABASE_URL`.
- Make sure `?pgbouncer=true` is appended to the pooled URL.

### Migration errors
- Use the **direct** connection string (port `5432`) for `DIRECT_URL` when running migrations.

### `@prisma/client` not found
- Run `npm run db:generate` to generate the Prisma client after installing dependencies.
