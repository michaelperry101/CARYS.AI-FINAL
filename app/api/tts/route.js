export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { text, voiceId } = await req.json();
    const key = process.env.ELEVENLABS_API_KEY;
    const vid = voiceId || process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

    if (!key) {
      return new Response("Missing ELEVENLABS_API_KEY", { status: 400 });
    }

    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${vid}`, {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.7 }
      })
    });

    if (!r.ok) {
      const t = await r.text();
      return new Response(t, { status: 502 });
    }

    const buf = await r.arrayBuffer();
    return new Response(Buffer.from(buf), {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" }
    });
  } catch (e) {
    return new Response("TTS error", { status: 500 });
  }
}
