import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  keywords: ["frontend engineer", "creative developer", "Next.js", "React", "TypeScript", "portfolio"],
  authors: [{ name: SITE_CONFIG.fullName }],
  openGraph: {
    type: "website",
    title: `${SITE_CONFIG.name} — Creative Developer`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Creative Developer`,
    description: SITE_CONFIG.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.className} bg-[#080808] text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
