'use client';

import { openSans } from "../ui/fonts";
import Footer from "../ui/landing/footer";
import NavbarMenu from "../ui/landing/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${openSans.className} antialiased`}>
        <NavbarMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
