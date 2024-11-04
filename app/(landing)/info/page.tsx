import MisionVision from "@/app/ui/landing/mision_vision";
import { Metadata } from "next";

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
        <h2 className="text-2xl font-semibold mb-4">
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
      </section>

      {/* Sección de Misión y Visión */}
      <section id="mision-vision" className="mb-12">
        {/* Misión y visión */}
        <div className="mb-8">
          <MisionVision />
        </div>
      </section>

      {/* Sección de Valores y Objetivos */}
      <section id="valores-objetivos" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Valores y Objetivos</h2>

        <ul className="space-y-4">
          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">
              Compromiso con la Educación
            </h3>
            <p className="text-gray-700">
              Fomentar un entorno de aprendizaje dinámico y accesible para todos
              los usuarios, asegurando la disponibilidad de recursos
              actualizados y pertinentes.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">Innovación Tecnológica</h3>
            <p className="text-gray-700">
              Incorporar tecnologías emergentes para mejorar la experiencia del
              usuario y facilitar el acceso a recursos digitales de calidad.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">
              Inclusión y Accesibilidad
            </h3>
            <p className="text-gray-700">
              Asegurar que la biblioteca sea un espacio inclusivo y accesible
              para todos los usuarios, sin importar su condición socioeconómica
              o capacidad.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
