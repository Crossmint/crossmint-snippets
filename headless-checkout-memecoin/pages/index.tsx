import { useState } from "react";
import { CrossmintEmbeddedCheckout, CrossmintProvider } from "@crossmint/client-sdk-react-ui";

type OrderResponse = {
    clientSecret: string;
    order: { orderId: string };
};

export default function Home() {
    const clientApiKey = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_API_KEY;
    const [wallet, setWallet] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("1");
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const createOrder = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wallet, email, amount }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(JSON.stringify(data, null, 2));
                return;
            }

            setOrder(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!clientApiKey) {
        return (
            <div style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
                <h1>Headless Checkout — Memecoin</h1>
                <p>
                    Missing <code>NEXT_PUBLIC_CROSSMINT_CLIENT_API_KEY</code>.
                </p>
                <p>
                    Create <code>.env.local</code> and restart <code>pnpm dev</code>.
                </p>
            </div>
        );
    }

    if (order) {
        return (
            <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
                <h1>Checkout</h1>
                <CrossmintProvider apiKey={clientApiKey}>
                    <CrossmintEmbeddedCheckout
                        recipient={{ walletAddress: wallet }}
                        clientSecret={order.clientSecret}
                        orderId={order.order.orderId}
                        payment={{
                            crypto: { enabled: false },
                            fiat: { enabled: true },
                            defaultMethod: "fiat",
                            receiptEmail: email,
                        }}
                        appearance={{
                            rules: {
                                DestinationInput: { display: "hidden" },
                                ReceiptEmailInput: { display: "hidden" },
                            },
                        }}
                    />
                </CrossmintProvider>
                <button onClick={() => setOrder(null)} style={{ marginTop: 20 }}>Start Over</button>
            </div>
        );
    }

    return (
        <div style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
            <h1>Headless Checkout — Memecoin</h1>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 5 }}>Solana Wallet</label>
                <input
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="BuWmGweapdysxU5VuUdi1RGoc4ibDG7TNirWjRtqF995"
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 5 }}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="test@example.com"
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 5 }}>Amount</label>
                <input
                    type="number"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <button
                onClick={createOrder}
                disabled={!wallet || !email || loading}
                style={{ padding: "10px 20px", cursor: "pointer" }}
            >
                {loading ? "Creating..." : "Create Order"}
            </button>

            {error && <pre style={{ color: "red", marginTop: 20 }}>{error}</pre>}
        </div>
    );
}
