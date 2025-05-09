import { openSans } from "@/app/ui/fonts";
import { Suspense } from "react";
import { InvoiceSkeleton } from "@/app/ui/skeletons";
import NoticiasList from "@/app/ui/dashboard/NoticiasList";
import Stats from "@/app/ui/dashboard/Stats";
import QuickLinks from "@/app/ui/dashboard/QuickLinks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className={`${openSans.className} text-2xl md:text-3xl font-bold text-gray-900`}>
          Panel de Administración
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenido al panel de administración. Aquí podrás gestionar todos los aspectos del sistema.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <Stats />
        </section>

        <section>
          <QuickLinks />
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Noticias</h2>
          <Suspense fallback={<InvoiceSkeleton />}>
            <NoticiasList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
