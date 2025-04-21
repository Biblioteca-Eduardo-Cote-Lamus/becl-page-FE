import { Metadata } from "next";
import Estadisticas from "app/ui/landing/estadisticas";

export const metadata: Metadata = {
  title: "Estadísticas",
};

export default function EstadisticasPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="animate-fade-in-up">
        <div className="">
          <h1 className="text-5xl font-bold mb-12 text-secondaries_red-900 relative">
            Estadísticas de la Biblioteca Eduardo Cote Lamus
          </h1>
          <p className="text-lg text-gray-700 animate-fade-in-up animation-delay-400 pb-10">
            Conoce las estadísticas
          </p>
        </div>
        <section
          id="seccion-estadisticas"
          className="flex flex-col items-center justify-center bg-gray-100"
        >
          <Estadisticas />
        </section>
      </section>
    </main>
  );
}
