"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Start Chatting" },
  { href: "/settings", label: "Settings" },
  { href: "/reviews", label: "Reviews" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/login", label: "Login / Create Account" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      {/* Hamburger (mobile + desktop if you want) */}
      <button
        className="fixed left-4 top-4 z-[60] inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white shadow-sm hover:bg-neutral-50 md:hidden"
        onClick={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="carys-sidebar"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Optional desktop button */}
      <button
        className="hidden md:flex fixed left-4 top-4 z-[40] h-10 w-10 items-center justify-center rounded-xl border bg-white shadow-sm hover:bg-neutral-50"
        onClick={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="carys-sidebar"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        id="carys-sidebar"
        ref={panelRef}
        className={[
          "fixed z-50 md:z-40 md:static md:translate-x-0",
          "left-0 top-0 h-full w-72 border-r bg-white",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "flex flex-col",
        ].join(" ")}
        role="navigation"
        aria-label="Primary"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <Image
            src="/logo.png"        // make sure this exists: /public/logo.png
            alt="Carys"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl font-semibold">Carys</span>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-neutral-100",
                    ].join(" ")}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="mt-6 px-1">
            <Link
              href="/chat"
              className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-700 hover:bg-blue-500/15 border border-blue-200"
              onClick={close}
            >
              Start Chatting
            </Link>
          </div>
        </nav>

        <div className="border-t p-3 text-xs text-neutral-500">
          © {new Date().getFullYear()} Carys
        </div>
      </aside>

      {/* Push main content to the right of the sidebar on desktop */}
      <style jsx global>{`
        @media (min-width: 768px) {
          main, header, .page-wrap { margin-left: 18rem; } /* 72 * 0.25rem */
        }
      `}</style>
    </>
  );
}
