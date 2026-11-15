import { Host_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";

export const fontDisplay = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Host Grotesk and Inter have no kana, so this only ever renders the
// Japanese glyphs. It sits at the end of both font stacks in globals.css.
export const fontKana = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-noto-jp",
  preload: false,
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontKana.variable}`;
