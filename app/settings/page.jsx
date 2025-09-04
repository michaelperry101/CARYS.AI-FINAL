import dynamic from "next/dynamic";

export const metadata = { title: "Settings" };
const SettingsClient = dynamic(() => import("@/components/SettingsClient"), { ssr: false });

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <SettingsClient />
    </div>
  );
}
