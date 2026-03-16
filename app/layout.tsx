import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/ui/header";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Satya 2.0 - AI Fact Checker",
  description: "Combat misinformation with AI-powered fact-checking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <TooltipProvider>
              <Header />
              {children}
            </TooltipProvider>
            <Toaster />
            <Sonner />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
