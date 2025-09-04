import "./globals.css";

export const metadata = {
  title: "Carys",
  description: "Conversational Assistant Responsive Yielding Solutions",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/carys-192.png",
  },
  manifest: "/manifest.json",
};

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light"> {/* default to light theme */}
      <body className="bg-white text-neutral-900 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 md:ml-0 md:pl-0 md:pr-0" style={{ marginLeft: "0" }}>
            <div className="md:ml-72"> {/* push content to the right of the fixed sidebar on md+ */}
              <Header />
              <main className="px-6 py-6">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
