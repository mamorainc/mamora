import "@/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamora",
  description: "A chat bot to automate you Solana work flows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
