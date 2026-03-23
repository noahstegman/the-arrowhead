import type { Metadata } from "next";
import { Noto_Serif, Work_Sans } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Arrowhead | Lake Arrowhead Mountain Guide",
  description:
    "Discover Lake Arrowhead — a hidden alpine retreat in the San Bernardino Mountains. Explore local businesses, events, and the magic of mountain living.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${workSans.variable} antialiased`}
    >
      <body>
        {children}
        {/* Film grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
