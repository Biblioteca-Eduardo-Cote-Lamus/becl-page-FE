import { Metadata } from "next";
import Estadisticas from "app/ui/landing/estadisticas";

export const metadata: Metadata = {
  title: "Estadísticas | Biblioteca Eduardo Cote Lamus",
  description: "Conoce las estadísticas de uso de la Biblioteca Eduardo Cote Lamus, incluyendo visitas físicas y virtuales.",
};

export default function EstadisticasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondaries_red-900 relative">
              Estadísticas de la Biblioteca
              <span className="block text-3xl md:text-4xl mt-2 text-gray-700">
                Eduardo Cote Lamus
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Descubre el impacto y la actividad de nuestra biblioteca a través de datos actualizados sobre visitas físicas y virtuales.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in-up animation-delay-600">
            <Estadisticas />
          </div>
        </section>
      </div>
    </main>
  );
}
