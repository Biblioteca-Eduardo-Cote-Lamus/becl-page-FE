"use client";

import "@/app/ui/global.css";
import dynamic from "next/dynamic";
import Footer from "../ui/landing/footer";
import NavbarMenu from "../ui/landing/navbar";

// Importar el componente de manera dinámica para evitar problemas de hidratación
const SocialButtons = dynamic(() => import("../components/SocialButtons"), {
  ssr: false,
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarMenu />
      <div className="mt-16 md:mt-32 w-full">{children}</div>
      <Footer />
      <SocialButtons />
      <script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        defer
      ></script>
    </>
  );
}
