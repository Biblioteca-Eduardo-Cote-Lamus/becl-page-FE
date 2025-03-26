import LineaDelTiempo from "@/app/ui/landing/info/linea_del_tiempo";
import MisionVision from "@/app/ui/landing/info/mision_vision";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Información",
};

export default function InfoPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="animate-fade-in-up">
        <h1 className="text-5xl font-bold mb-12 text-center text-secondaries_red-900 relative">
          Información de la Biblioteca
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondaries_red-900 rounded-full"></div>
        </h1>
      </div>

      {/* Sección de Historia */}
      <section id="historia" className="mb-16 animate-fade-in-up animation-delay-200">
        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-6 text-secondaries_red-900">
            Historia de la Biblioteca
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            La Biblioteca Eduardo Cote Lamus inicia su funcionamiento el 14 de
            enero de 1972 con la dirección de Alfredo Osorio Jacome, la línea de
            tiempo de la biblioteca se encuentra después de este texto así mismo
            como la de los directores, al paso del tiempo se le fue concedido el
            uso completo de la infraestructura donde se encontraba para
            posteriormente ser ampliada por lo cual en la actualidad cuenta con un
            total de 821.39 metros cuadrados, contando con: Múltiples salas de
            lectura, sala de cómputo, hemeroteca, préstamos y devoluciones de
            material bibliográfico, auditorio y un amplio recurso de bases de
            datos digitales.
          </p>
        </div>

        {/* Línea del tiempo */}
        <div className="mt-12 animate-fade-in-up animation-delay-400">
          <h3 className="text-2xl text-center font-semibold mb-8 text-secondaries_red-900">
            Línea de tiempo Biblioteca
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <LineaDelTiempo />
          </div>
        </div>

        {/* Línea de tiempo directores */}
        <div className="mt-12 animate-fade-in-up animation-delay-600 ">
          <h3 className="text-2xl text-center font-semibold mb-8 text-secondaries_red-900">
            Línea de tiempo directores
          </h3>
          <div className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <Image
              width={856}
              height={642}
              alt={"Línea de tiempo directores"}
              src={"/Imagenes_biblioteca/linea-del-tiempo-directores.jpg"}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Sección de Misión y Visión */}
      <section id="mision-vision" className="mb-16 animate-fade-in-up animation-delay-800">
        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-8 text-secondaries_red-900">
            Misión y Visión de la BECL
          </h2>
          <MisionVision />
        </div>
      </section>
    </main>
  );
}
