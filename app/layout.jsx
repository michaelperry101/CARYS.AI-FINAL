import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata = {
  title: {
    template: "%s — Carys",
    default: "Carys"
  },
  description: "Conversational Assistant Responsive Yielding Solutions",
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png"
  },
  manifest: "/manifest.json",
  themeColor: "#3DA2FF"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        <Providers>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
