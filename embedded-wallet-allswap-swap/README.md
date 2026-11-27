# Crossmint Embedded Wallet + AllSwap Cross-Chain Swap

## What it does
Integrates Crossmint Embedded Wallets with [AllSwap Partner API v2](https://allswap.io/docs) to fetch cross-chain swap quotes and execute non-custodial single-use deposit routing across 40+ blockchains (Bitcoin, Solana, TRON, TON, EVM) without centralized custody lockups.

## Prereqs
- Node.js 18+
- Crossmint API Key (`CROSSMINT_API_KEY`)

## Setup
```bash
export CROSSMINT_API_KEY="your_crossmint_api_key"
```

## Run
```bash
npx tsx index.ts
```
