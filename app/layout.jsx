import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Carys",
  description: "Your conversational assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
