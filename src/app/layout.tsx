import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/useLanguage";
import { MotionProvider } from "@/hooks/useMotionPrefs";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionNav from "@/components/layout/SectionNav";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import MouseGlow from "@/components/effects/MouseGlow";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import MobileScrollArrow from "@/components/ui/MobileScrollArrow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://komron.inovaauto.com"),
  title: "Komron Sharifov | Full-Stack Web Developer",
  description:
    "Premium developer portfolio of Komron Sharifov — Full-Stack Web Developer crafting modern web platforms.",
  keywords: ["Komron Sharifov", "Developer", "Portfolio", "Full-Stack", "React", "Next.js"],
  authors: [{ name: "Komron Sharifov" }],
  openGraph: {
    title: "Komron Sharifov | Full-Stack Web Developer",
    description: "Premium developer portfolio — modern web platforms with clean code and reliable security.",
    type: "website",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#050508] text-white">
        <LanguageProvider>
          <Preloader />
          <MotionProvider>
          <SmoothScroll>
            <AnimatedBackground />
            <MouseGlow />
            <Navbar />
            <SectionNav />
            <main className="relative space-y-2 pb-20 sm:space-y-4 sm:pb-0">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <MobileScrollArrow />
          </SmoothScroll>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
