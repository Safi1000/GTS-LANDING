import type { Metadata } from "next";
import { Archivo, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CrosshairCursor } from "@/components/CrosshairCursor";
import { Footer } from "@/components/Footer";
import { RouteWatcher } from "@/components/RouteWatcher";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { SiteHeader } from "@/components/SiteHeader";
import { ToastProvider } from "@/components/Toast";
import { SITE } from "@/lib/site";

/* Exposed as --f-disp / --f-crest / --f-mono so the ported CSS works unchanged. */
const disp = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800", "900"],
  variable: "--f-disp",
  display: "swap",
});
const crest = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  variable: "--f-crest",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--f-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${disp.variable} ${crest.variable} ${mono.variable}`}>
      <body>
        <ToastProvider>
          <div className="field" aria-hidden="true" />
          <div className="noise" aria-hidden="true" />
          <ScrollProgressBar />
          <CrosshairCursor />
          <AnnouncementBar />
          <SiteHeader />
          <main id="app">{children}</main>
          <Footer />
          <RouteWatcher />
        </ToastProvider>
      </body>
    </html>
  );
}
