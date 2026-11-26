import type { Metadata, Viewport } from "next";

import { publicPath } from "@/lib/public-path";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Phish or Legit?",
    template: "%s · Phish or Legit?",
  },
  description:
    "Interactive digital companion for the Phish or Legit physical board game.",
  applicationName: "Phish or Legit?",
  icons: {
    icon: [
      {
        url: publicPath("/brand/phish-or-legit-logo.svg"),
        type: "image/svg+xml",
      },
    ],
    shortcut: publicPath("/brand/phish-or-legit-logo.svg"),
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Phish or Legit?",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
