import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import dynamic from "next/dynamic";

export const metadata = { title: "Sign in" };
const LoginButtons = dynamic(() => import("@/components/LoginButtons"), { ssr: false });

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="max-w-md mx-auto rounded-2xl border bg-white p-6 shadow-soft">
      <h1 className="text-xl font-semibold mb-4">Sign in to Carys</h1>
      {session ? (
        <div className="space-y-4">
          <p>You’re already signed in.</p>
          <Link href="/chat" className="rounded-xl px-4 py-2 bg-carys-blue text-white">Go to Chat</Link>
        </div>
      ) : (
        <LoginButtons />
      )}
    </div>
  );
}
