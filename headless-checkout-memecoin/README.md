# Headless Checkout — Memecoin (Next.js)

Minimal Next.js app to test a memecoin checkout flow using Crossmint Headless Checkout.

## What it does

- **Creates an order server-side** via `POST /api/create-order`
- **Renders the embedded checkout** using `CrossmintEmbeddedCheckout`

## Setup (one time)

```bash
pnpm install
```

Create `./.env.local`:

```bash
# Client (safe to expose; used in the browser)
NEXT_PUBLIC_CROSSMINT_CLIENT_API_KEY=...

# Server (keep secret; used only in the API route)
CROSSMINT_SERVER_API_KEY=...

# Optional (defaults to staging)
# CROSSMINT_BASE_URL=https://staging.crossmint.com
```

## Run

```bash
pnpm dev
```

Then open `http://localhost:3002`.

## Test

Fill in your Solana wallet + email + amount, click **Create Order**, then complete the embedded checkout.

## Files

- `pages/index.tsx` - UI + embedded checkout
- `pages/api/create-order.ts` - Creates the order (server-side)
- `package.json` - Minimal dependencies

That's it!
