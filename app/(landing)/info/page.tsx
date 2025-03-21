import LineaDelTiempo from "@/app/ui/landing/info/linea_del_tiempo";
import MisionVision from "@/app/ui/landing/info/mision_vision";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Información",
};

export default function InfoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-secondaries_red-900">
        Información de la Biblioteca
      </h1>

      {/* Sección de Historia */}
      <section id="historia" className="mb-12">
        <h2 className="text-4xl font-semibold mb-4">
          Historia de la Biblioteca
        </h2>
        <p className="text-gray-700">
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
        {/* Línea del tiempo */}
        <div>
          <h3 className="text-2xl text-center font-semibold my-4">
            Línea de tiempo Biblioteca
          </h3>
          <LineaDelTiempo />
        </div>
        {/* Línea de tiempo directores */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl text-center font-semibold my-4">
            Línea de tiempo directores
          </h3>
          <Image
            width={856}
            height={642}
            alt={"Línea de tiempo directores"}
            src={
              "/Imagenes_biblioteca/linea-del-tiempo-directores.jpg"
            }
          />
        </div>
      </section>

      {/* Sección de Misión y Visión */}
      <section id="mision-vision" className="mb-12">
        {/* Misión y visión */}
        <div className="mb-8 ">
          <h2 className="text-2xl font-semibold mb-4" id="mision-vision">
            Misión y Visión de la BECL
          </h2>
          <MisionVision />
        </div>
      </section>
    </main>
  );
}
