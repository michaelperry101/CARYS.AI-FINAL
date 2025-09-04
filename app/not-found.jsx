import Link from "next/link";

export const metadata = { title: "Not Found" };

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-3xl font-semibold mb-3">Page not found</h1>
      <p className="text-slate-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="rounded-xl px-4 py-2 bg-carys-blue text-white">Back home</Link>
    </div>
  );
}
