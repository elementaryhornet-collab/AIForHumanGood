import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AI For Human Good | Nonprofit Technology for Everyone",
    template: "%s | AI For Human Good",
  },
  description:
    "We build accessible AI solutions that empower people with disabilities and underserved communities. Technology should work for everyone.",
  keywords: [
    "AI for good",
    "accessible technology",
    "nonprofit",
    "disability inclusion",
    "ethical AI",
  ],
  authors: [{ name: "AI For Human Good" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI For Human Good",
    title: "AI For Human Good | Nonprofit Technology for Everyone",
    description:
      "We build accessible AI solutions that empower people with disabilities and underserved communities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI For Human Good",
    description:
      "We build accessible AI solutions that empower people with disabilities and underserved communities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
