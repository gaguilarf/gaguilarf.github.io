import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feliz mesario amor",
  description:
    "Juego para emparejar cards y divertirte un poco viendo nuestras fotos",
  keywords: [
    "Mesario card game",
    "romantic proposal game",
    "photo card challenge",
    "Mesario Day surprise",
    "couples game",
    "Mesario day game",
    "proposal game",
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
