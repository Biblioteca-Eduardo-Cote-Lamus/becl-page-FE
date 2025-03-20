import "@/app/ui/global.css";
import { openSans } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Biblioteca UFPS - %s",
    default: "Biblioteca UFPS",
  },
  description:
    "Portal de la División de Biblioteca de la Universidad Francisco de Paula Santander - Cúcuta, Norte de Santander",
  metadataBase: new URL("https://biblioteca.ufps.edu.co"),
  applicationName: "Biblioteca UFPS",
  authors: [
    { name: "División de Biblioteca UFPS" },
    { name: "Biblioteca Eduardo Cote Lamus" },
    { name: "Programa de Ingeniería de Sistemas UFPS" },
    { name: "Marcos David Mejía Gómez" },
    { name: "Anderson David Patiño Caicedo" },
  ],
  keywords:
    "ufps, biblioteca, universidad, francisco de paula santander, cucuta, colombia, norte de santander, préstamos, catálogo, recursos bibliográficos, servicios bibliotecarios, paz y salvo, biblioteca eduardo cote lamus, bases de datos",
  openGraph: {
    title: "Biblioteca UFPS",
    type: "website",
    url: "https://biblioteca.ufps.edu.co",
    description:
      "Portal de la División de Biblioteca de la Universidad Francisco de Paula Santander - Cúcuta, Norte de Santander",
    siteName: "Biblioteca UFPS",
  },
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${openSans.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
