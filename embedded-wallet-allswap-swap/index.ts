/**
 * Crossmint Embedded Wallet + AllSwap Partner API v2 Cross-Chain Swap Snippet
 * Docs: https://allswap.io/docs
 */
const CROSSMINT_API_KEY = process.env.CROSSMINT_API_KEY || "";
const ALLSWAP_API_BASE = "https://api.allswap.io/v2";

async function run() {
  // 1. Fetch non-custodial cross-chain quote (e.g. Base USDC -> Native Solana SOL)
  const quoteUrl = new URL(`${ALLSWAP_API_BASE}/quote`);
  quoteUrl.searchParams.set("fromChain", "base");
  quoteUrl.searchParams.set("toChain", "solana");
  quoteUrl.searchParams.set("fromToken", "USDC");
  quoteUrl.searchParams.set("toToken", "SOL");
  quoteUrl.searchParams.set("amount", "50");

  const res = await fetch(quoteUrl.toString(), {
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error(`AllSwap quote failed: ${res.status}`);
  const quote = await res.json();
  console.log("AllSwap Cross-Chain Quote:", quote);
}

run().catch(console.error);
