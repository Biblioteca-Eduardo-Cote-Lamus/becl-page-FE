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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${openSans.className} antialiased min-h-screen w-full overflow-x-hidden`} suppressHydrationWarning>
        <NavbarMenu />
        <div className="mt-16 md:mt-32 w-full">{children}</div>
        <Footer />
        <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
      </body>
    </html>
  );
}
