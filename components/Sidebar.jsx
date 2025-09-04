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
