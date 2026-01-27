import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const serverApiKey = process.env.CROSSMINT_SERVER_API_KEY;
    if (!serverApiKey) {
        return res.status(500).json({
            error: "Missing env var CROSSMINT_SERVER_API_KEY",
        });
    }

    const orderId = String(req.query?.orderId ?? "");
    if (!orderId) {
        return res.status(400).json({ error: "Missing orderId" });
    }

    const baseUrl = process.env.CROSSMINT_BASE_URL ?? "https://staging.crossmint.com";

    const response = await fetch(`${baseUrl}/api/2022-06-09/orders/${orderId}`, {
        method: "GET",
        headers: {
            "x-api-key": serverApiKey,
        },
    });

    const raw = await response.text();
    try {
        return res.status(response.status).json(JSON.parse(raw));
    } catch {
        return res.status(response.status).json({ raw });
    }
}
