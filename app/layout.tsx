import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Secret Santa 2025 🎅 | Christmas Gift Exchange Game",
  description: "The most magical way to organize your Secret Santa! Choose your character, spin the wheel, and discover who you're gifting to this Christmas!",
  keywords: ["secret santa", "christmas", "gift exchange", "holiday game", "christmas 2025"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
