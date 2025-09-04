"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState([
    { id: "1", title: "Welcome to Carys" },
    { id: "2", title: "Product Ideas" },
    { id: "3", title: "Marketing Plan" },
    { id: "4", title: "Bug triage" },
    { id: "5", title: "Travel tips" },
    { id: "6", title: "Sales email" }
  ]);

  const contentRef = useRef(null);

  // slide open/close via height animation
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const h = el.scrollHeight;
    if (open) {
      el.style.height = h + "px";
      const handle = () => { el.style.height = "auto"; };
      el.addEventListener("transitionend", handle, { once: true });
    } else {
      el.style.height = h + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    }
  }, [open]);

  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="rounded-2xl border bg-white shadow-soft">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold">Conversations</div>
          <button
            onClick={() => setOpen(o => !o)}
            className="text-sm px-2 py-1 rounded border hover:bg-slate-50"
            aria-expanded={open}
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>

        <div
          ref={contentRef}
          className="overflow-y-auto transition-[height] duration-300 ease-in-out will-change-[height]"
          style={{ height: "auto", maxHeight: "60vh" }}
        >
          <ul className="p-2 space-y-1">
            {items.map((it) => (
              <li key={it.id}>
                <Link
                  href={`/chat?c=${it.id}`}
                  className="block rounded-lg px-3 py-2 hover:bg-slate-50 text-sm"
                >
                  {it.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 border-t">
          <Link
            href="/chat?new=1"
            className="block text-center rounded-xl px-3 py-2 bg-carys-blue text-white font-medium hover:opacity-90"
          >
            + New Chat
          </Link>
        </div>
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed z-50 left-4 top-4 rounded-xl border px-3 py-2 bg-white shadow-sm"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        Menu
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed z-50 md:z-0 md:static md:translate-x-0",
          "left-0 top-0 h-full w-72 border-r bg-white dark:bg-neutral-900",
          "transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "flex flex-col",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <Image
            src="/logo.png" // put your logo at /public/logo.png
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
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    ].join(" ")}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA button */}
          <div className="mt-6 px-1">
            <Link
              href="/chat"
              className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-700 hover:bg-blue-500/15 border border-blue-200"
              onClick={() => setOpen(false)}
            >
              Start Chatting
            </Link>
          </div>
        </nav>

        {/* Footer area / profile / legal */}
        <div className="border-t p-3 text-xs text-neutral-500">
          © {new Date().getFullYear()} Carys
        </div>
      </aside>
    </>
  );
}
