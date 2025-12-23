import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promptify - Transform Your Ideas Into Perfect Prompts",
  description: "AI-powered prompt enhancement tool that transforms your rough ideas into clear, detailed prompts any AI can understand and build. Perfect for portfolio websites, e-commerce stores, startup landing pages, and more.",
  keywords: ["AI prompt", "prompt engineering", "prompt enhancement", "AI tools", "website builder", "AI assistant"],
  authors: [{ name: "Promptify" }],
  creator: "Promptify",
  openGraph: {
    title: "Promptify - Transform Your Ideas Into Perfect Prompts",
    description: "AI-powered prompt enhancement tool that transforms your rough ideas into clear, detailed prompts.",
    type: "website",
    locale: "en_US",
    siteName: "Promptify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptify - Transform Your Ideas Into Perfect Prompts",
    description: "AI-powered prompt enhancement tool that transforms your rough ideas into clear, detailed prompts.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
