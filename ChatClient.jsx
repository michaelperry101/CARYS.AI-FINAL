"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatClient() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m Carys. How can I help today?" }
  ]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voiceId, setVoiceId] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const next = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      const ai = data?.content || "Hmm, I couldn’t respond right now.";
      setMessages((m) => [...m, { role: "assistant", content: ai }]);

      if (speaking && ai) {
        try {
          const ttsRes = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: ai, voiceId: voiceId || undefined })
          });
          if (ttsRes.ok) {
            const blob = await ttsRes.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
          }
        } catch {}
      }
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Error reaching the server." }]);
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-2xl ${m.role === "user" ? "ml-auto" : ""}`}>
            <div className={`rounded-2xl px-4 py-3 shadow-soft border
              ${m.role === "user" ? "bg-white" : "bg-carys-soft"}`}>
              <div className="text-sm whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="border-t bg-white">
        <form onSubmit={sendMessage} className="mx-auto max-w-3xl p-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            placeholder="Type a message..."
            className="flex-1 resize-none rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-carys-blue"
          />
          <button
            type="submit"
            className="rounded-2xl px-4 py-3 bg-carys-blue text-white font-medium hover:opacity-90"
          >
            Send
          </button>
        </form>
        <div className="mx-auto max-w-3xl pb-4 px-3 flex items-center gap-3 text-sm text-slate-600">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={speaking}
              onChange={(e) => setSpeaking(e.target.checked)}
            />
            <span>Speak replies (ElevenLabs)</span>
          </label>
          {speaking && (
            <input
              className="border rounded px-2 py-1"
              placeholder="Voice ID (optional)"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
