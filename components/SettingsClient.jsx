"use client";
import { useState } from "react";

export default function SettingsClient() {
  const [voice, setVoice] = useState("");
  const [autoplay, setAutoplay] = useState(true);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-lg mb-2">Appearance</h2>
        <p className="text-sm text-slate-600 mb-4">Light by default; use the header toggle to switch.</p>
        <ul className="text-sm text-slate-600 list-disc pl-5">
          <li>Light theme starts by default.</li>
          <li>Toggle in the header ☀️ / 🌙.</li>
        </ul>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-lg mb-4">Voice (ElevenLabs)</h2>
        <div className="flex items-center gap-3 text-sm">
          <input
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            placeholder="Default Voice ID (optional)"
            className="border rounded px-3 py-2 w-80"
          />
          <button
            className="rounded px-3 py-2 border hover:bg-slate-50"
            onClick={() => alert("This demo stores voice per session in Chat page.")}
          >
            Save
          </button>
        </div>
        <p className="text-sm text-slate-600 mt-2">
          Add <code className="px-1 rounded bg-slate-100">ELEVENLABS_API_KEY</code> and optional{" "}
          <code className="px-1 rounded bg-slate-100">ELEVENLABS_VOICE_ID</code> to your environment for full TTS.
        </p>
      </section>
    </div>
  );
}
