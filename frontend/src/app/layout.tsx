import "@/globals.css";
import { ThemeProvider } from "@/providers/theme";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
