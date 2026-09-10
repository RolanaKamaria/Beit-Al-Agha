import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lato, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});
const body = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});
const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Beit Al Agha | A Table Set in Homs",
  description:
    "Enter Beit Al Agha in Homs for Syrian hospitality, old-world flavors, and stories shared around the table.",
  generator: "Hnndes - Eng.Rolana Kamaria",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#100c08",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${arabic.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
