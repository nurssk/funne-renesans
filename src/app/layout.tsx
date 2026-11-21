import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@/styles/gofunnel-ds.css";

// Sans: Geist (descriptions and UI), the free stand-in for Cartesia's ABC Diatype.
// Serif: Newsreader, the open match for conversion.ai's Family.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "GoFunnel | Ad Attribution, Dialing Infrastructure and Helios AI",
  description:
    "The operating system for profitable marketing and sales teams: every prospect tracked from ad to cash, new leads called in seconds, Helios AI on top.",
  icons: { icon: "/brand/favicon.svg" },
};

// Marks the hero intro as seen for this session before first paint, so it plays once per visit.
const introScript = `try{if(sessionStorage.getItem('gf-intro')){document.documentElement.setAttribute('data-intro-seen','')}else{sessionStorage.setItem('gf-intro','1')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable} antialiased`} suppressHydrationWarning>
      <head>
        <Script id="intro-seen" strategy="beforeInteractive">{introScript}</Script>
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
