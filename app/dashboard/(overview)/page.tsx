import { openSans } from "@/app/ui/fonts";
import { Suspense } from "react";
import { InvoiceSkeleton } from "@/app/ui/skeletons";
import NoticiasList from "@/app/ui/dashboard/NoticiasList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function Page() {
  return (
    <main>
      <h1 className={`${openSans.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <section>
        <Suspense fallback={<InvoiceSkeleton />}>
          <NoticiasList />
        </Suspense>
      </section>
    </main>
  );
}
