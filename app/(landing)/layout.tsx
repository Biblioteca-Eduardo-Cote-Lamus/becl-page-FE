"use client";

import Footer from "../ui/landing/footer";
import NavbarMenu from "../ui/landing/navbar";

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
    </>
  );
}
