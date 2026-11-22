import { GridOverlay } from "@/components/grid-overlay";
import { fontVariables } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kana quiz",
  description:
    "Pick some rows of hiragana and type the romaji. First answer counts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="fixed top-2 left-2 z-50 -translate-y-[calc(100%+1rem)] bg-accent px-3 py-2 text-sm font-medium transition-transform duration-150 focus:translate-y-0 motion-reduce:transition-none"
        >
          Skip to content
        </a>
        {children}
        {process.env.NODE_ENV === "development" && <GridOverlay />}
      </body>
    </html>
  );
}
