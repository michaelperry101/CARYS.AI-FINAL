import { getStripe } from "@/lib/stripe";

export async function POST(req) {
  const stripe = getStripe();
  if (!stripe) {
    return new Response(JSON.stringify({ error: "Stripe not configured" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  const { priceId } = await req.json();
  const pid = priceId || process.env.STRIPE_PRICE_ID;
  if (!pid) {
    return new Response(JSON.stringify({ error: "Missing price id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: pid, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=1`
  });
  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
