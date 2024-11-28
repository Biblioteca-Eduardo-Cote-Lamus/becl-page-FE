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
    <html lang="es" suppressHydrationWarning>
      <body className={`${openSans.className} antialiased`} suppressHydrationWarning>
        <NavbarMenu />
        <div className="mt-32">{children}</div>
        <Footer />
        <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
      </body>
    </html>
  );
}
