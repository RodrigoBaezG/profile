import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rodrigo Báez García · Full Stack Developer",
  description:
    "Portfolio website for Rodrigo Báez García – Junior Full Stack Software Developer based in Oxford, UK. Showcasing journey, experience, and future work.",
  metadataBase: new URL("https://localhost"),
  openGraph: {
    title: "Rodrigo Báez García · Full Stack Developer",
    description:
      "Junior Full Stack Software Developer focused on modern JavaScript, Angular, and Node ecosystems.",
    url: "https://localhost",
    type: "website",
    locale: "en_GB"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="gradient-orbit" />
        {children}
      </body>
    </html>
  );
}

