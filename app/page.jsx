import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Home" };

export default function HomePage() {
  return (
    <div className="grid md:grid-cols-[1fr,420px] gap-10 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">
          Meet <span className="text-carys-blue">Carys</span> — your everyday AI Copilot
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Ask questions, generate ideas, and get things done. Clean, fast, and built for real work.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="rounded-2xl px-6 py-3 bg-carys-blue text-white font-medium shadow-soft hover:opacity-90"
          >
            Start chatting
          </Link>
          <Link href="/about" className="rounded-2xl px-6 py-3 border hover:bg-slate-50">
            Learn more
          </Link>
        </div>
        <div className="pt-6 text-slate-500 text-sm">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline">Terms</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy</Link>.
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <Image src="/logo.svg" alt="Carys" width={28} height={28} />
          <div className="font-semibold">Looks familiar?</div>
        </div>
        <div className="rounded-2xl border bg-carys-soft p-4">
          <div className="text-sm text-slate-700">This is the clean starting point you asked for — light, airy, real.</div>
        </div>
      </div>
    </div>
  );
}
