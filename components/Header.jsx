"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/70 shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Carys" width={28} height={28} />
            <span className="font-semibold tracking-tight text-lg">Carys</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm text-slate-600">
            <Link href="/chat" className="hover:text-carys-blue">Chat</Link>
            <Link href="/about" className="hover:text-carys-blue">About</Link>
            <Link href="/reviews" className="hover:text-carys-blue">Reviews</Link>
            <Link href="/privacy" className="hover:text-carys-blue">Privacy</Link>
            <Link href="/terms" className="hover:text-carys-blue">Terms</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full px-3 py-1.5 text-sm border bg-white hover:bg-slate-50"
            title="Toggle theme"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>
          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-full px-3 py-1.5 text-sm bg-slate-900 text-white hover:bg-slate-800"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="rounded-full px-3 py-1.5 text-sm bg-carys-blue text-white hover:opacity-90"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
