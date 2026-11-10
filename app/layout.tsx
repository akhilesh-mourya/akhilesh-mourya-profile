import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/data/site";
import { profile } from "@/data/portfolio";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "../public/fonts/geist-regular.ttf", weight: "400" },
    { path: "../public/fonts/geist-medium.ttf", weight: "500" },
    { path: "../public/fonts/geist-semibold.ttf", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
const interTight = localFont({
  src: [
    { path: "../public/fonts/inter-tight-regular.ttf", weight: "400" },
    { path: "../public/fonts/inter-tight-medium.ttf", weight: "500" },
  ],
  variable: "--font-heading",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
const mono = localFont({
  src: "../public/fonts/geist-mono.ttf",
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Akhilesh Mourya" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Akhilesh Mourya — Mobile lead & full-stack engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${interTight.variable} ${mono.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${site.url}/#person`,
                  name: profile.name,
                  url: site.url,
                  image: new URL(profile.portrait, site.url).href,
                  jobTitle: profile.role,
                  sameAs: [profile.linkedin, profile.github, profile.upwork],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Indore",
                    addressRegion: "Madhya Pradesh",
                    addressCountry: "IN",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${site.url}/#website`,
                  url: site.url,
                  name: site.title,
                  description: site.description,
                  author: { "@id": `${site.url}/#person` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
