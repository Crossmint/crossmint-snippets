import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const serverApiKey = process.env.CROSSMINT_SERVER_API_KEY;
    if (!serverApiKey) {
        return res.status(500).json({
            error: "Missing env var CROSSMINT_SERVER_API_KEY",
        });
    }

    const wallet = String(req.body?.wallet ?? "");
    const email = String(req.body?.email ?? "");
    const amount = String(req.body?.amount ?? "1");

    if (!wallet || !email) {
        return res.status(400).json({ error: "Missing wallet or email" });
    }

    const baseUrl = process.env.CROSSMINT_BASE_URL ?? "https://staging.crossmint.com";

    const response = await fetch(`${baseUrl}/api/2022-06-09/orders`, {
        method: "POST",
        headers: {
            "x-api-key": serverApiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lineItems: [{
                tokenLocator: "solana:7EivYFyNfgGj8xbUymR7J4LuxUHLKRzpLaERHLvi7Dgu",
                executionParameters: {
                    mode: "exact-in",
                    amount,
                    maxSlippageBps: "500",
                },
            }],
            payment: {
                method: "card",
                receiptEmail: email,
            },
            recipient: {
                walletAddress: wallet,
            },
        }),
    });

    const raw = await response.text();
    try {
        return res.status(response.status).json(JSON.parse(raw));
    } catch {
        return res.status(response.status).json({ raw });
    }
}
