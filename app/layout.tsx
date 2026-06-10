import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nwene Onyedika David — Software & AI/ML Engineer",
  description:
    "Portfolio of Nwene Onyedika David, a Software Engineer and AI/ML Engineer building intelligent full-stack applications at the intersection of data science and modern web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
