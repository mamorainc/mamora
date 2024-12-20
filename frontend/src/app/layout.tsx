import "@/globals.css";
import { AppWalletProvider } from "@/providers/app-wallet";
import { ThemeProvider } from "@/providers/theme";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

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
          <AppWalletProvider>{children}</AppWalletProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
