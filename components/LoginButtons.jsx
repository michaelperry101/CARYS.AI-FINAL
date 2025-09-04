"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginButtons() {
  const [email, setEmail] = useState("");
  return (
    <div className="space-y-3">
      <button
        onClick={() => signIn("google")}
        className="w-full rounded-xl px-4 py-2 border hover:bg-slate-50"
      >
        Continue with Google
      </button>
      <div className="space-y-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        />
        <button
          onClick={() => signIn("email", { email })}
          className="w-full rounded-xl px-4 py-2 bg-slate-900 text-white"
        >
          Send magic link
        </button>
      </div>
      <p className="text-xs text-slate-500">We’ll email you a secure sign-in link.</p>
    </div>
  );
}
