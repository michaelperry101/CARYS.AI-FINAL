export const metadata = { title: "Login — Carys" };

export default function LoginPage() {
  return (
    <main className="page-wrap p-6 md:p-10">
      <h1 className="text-3xl font-semibold mb-6">Login / Create Account</h1>
      <p className="mb-4 text-neutral-600">
        Choose a method below to continue.
      </p>
      <div className="flex flex-col gap-3 max-w-sm">
        <a href="/api/auth/signin/google" className="rounded-xl border px-4 py-2 hover:bg-neutral-50">
          Continue with Google
        </a>
        <a href="/api/auth/signin/email" className="rounded-xl border px-4 py-2 hover:bg-neutral-50">
          Continue with Email
        </a>
      </div>
    </main>
  );
}
