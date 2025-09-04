import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";

export const metadata = { title: "Chat" };

const ChatClient = dynamic(() => import("@/components/ChatClient"), { ssr: false });

export default function ChatPage() {
  return (
    <div className="grid md:grid-cols-[18rem,1fr] gap-6">
      <Sidebar />
      <div className="rounded-2xl border bg-white shadow-soft min-h-[60vh]">
        <ChatClient />
      </div>
    </div>
  );
}
