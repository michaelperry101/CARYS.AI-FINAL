"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserBadge() {
  const res = useSession();
  const data = res?.data;
  const status = res?.status;

  if (status === "loading") return null;

  return data?.user ? (
    <div className="flex items-center gap-3 text-sm">
      <span>Hello, {data.user.name || "User"}</span>
      <button className="underline" onClick={() => signOut()}>Sign out</button>
    </div>
  ) : (
    <button className="underline text-sm" onClick={() => signIn()}>Sign in</button>
  );
}
