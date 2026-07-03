import type { Metadata } from "next";
import { Inter, Lexend_Exa, Geist_Mono, Fraunces, Rozha_One } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexendExa = Lexend_Exa({
  variable: "--font-lexend-exa",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const rozhaOne = Rozha_One({
  weight: "400",
  variable: "--font-rozha-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinTrac AI",
  description: "Behavior-aware budgeting. Some habits take time.",
};

import { Viewport } from "next";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import GlobalMouseTracker from "@/components/GlobalMouseTracker";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lexendExa.variable} ${geistMono.variable} ${fraunces.variable} ${rozhaOne.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-clip">
        <ClerkProvider>
          <GlobalMouseTracker />
          <NoiseOverlay />
          <ScrollProgress />
          <SmoothScrollProvider>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScrollProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
