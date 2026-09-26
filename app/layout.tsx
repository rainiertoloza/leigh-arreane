import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartHydration } from "@/components/cart/CartHydration";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { author } from "@/lib/author";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${author.name} — author of Dreams We Once Lost`,
    template: `%s · ${author.name}`,
  },
  description: author.bio,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: author.name,
    title: `${author.name} — ${author.tagline}`,
    description: author.bio,
    images: ["/images/books/dreams-we-once-lost.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <CartHydration />
        <PromoBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <NewsletterCTA />
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
