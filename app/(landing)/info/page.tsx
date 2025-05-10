import LineaDelTiempo from "@/app/ui/landing/info/linea_del_tiempo";
import MisionVision from "@/app/ui/landing/info/mision_vision";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Información - Biblioteca Eduardo Cote Lamus",
  description: "Conoce la historia, misión y visión de la Biblioteca Eduardo Cote Lamus, un espacio dedicado al conocimiento y la cultura.",
};

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-secondaries_red-700 text-white py-20">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Biblioteca Eduardo Cote Lamus
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-up animation-delay-200">
              Un espacio dedicado al conocimiento y la cultura desde 1972
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Historia Section */}
        <section id="historia" className="mb-24 animate-fade-in-up animation-delay-200">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <h2 className="text-4xl font-bold mb-8 text-secondaries_red-900 text-center">
                Nuestra Historia
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="leading-relaxed">
                  La Biblioteca Eduardo Cote Lamus inicia su funcionamiento el 14 de
                  enero de 1972 con la dirección de Alfredo Osorio Jacome. A lo largo
                  de su historia, ha crecido significativamente, expandiendo sus
                  instalaciones hasta alcanzar un total de 821.39 metros cuadrados.
                </p>
                <p className="mt-4 leading-relaxed">
                  En la actualidad, contamos con múltiples salas de lectura, sala de
                  cómputo, hemeroteca, servicio de préstamos y devoluciones de
                  material bibliográfico, auditorio y un amplio recurso de bases de
                  datos digitales, ofreciendo un espacio completo para el aprendizaje
                  y la investigación.
                </p>
              </div>
            </div>

            {/* Línea del tiempo */}
            <div className="mt-16 animate-fade-in-up animation-delay-400">
              <h3 className="text-3xl font-bold text-center mb-12 text-secondaries_red-900">
                Línea de Tiempo
              </h3>
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <LineaDelTiempo />
              </div>
            </div>

            {/* Línea de tiempo directores */}
            <div className="mt-16 animate-fade-in-up animation-delay-600">
              <h3 className="text-3xl font-bold text-center mb-12 text-secondaries_red-900">
                Nuestros Directores
              </h3>
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex justify-center">
                  <Image
                    width={856}
                    height={642}
                    alt="Línea de tiempo de directores de la Biblioteca Eduardo Cote Lamus"
                    src="/Imagenes_biblioteca/linea-del-tiempo-directores.jpg"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión Section */}
        <section id="mision-vision" className="mb-16 animate-fade-in-up animation-delay-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <h2 className="text-4xl font-bold mb-12 text-secondaries_red-900 text-center">
                Misión y Visión
              </h2>
              <MisionVision />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
