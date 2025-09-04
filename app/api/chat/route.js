export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body?.messages || [];
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ content: "Model key missing. Add OPENAI_API_KEY." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      return new Response(JSON.stringify({ content: `Upstream error: ${txt}` }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || "No reply";
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ content: "Server error." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}
