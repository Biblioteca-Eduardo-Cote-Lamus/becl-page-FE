import { montserrat } from "@/app/ui/fonts";
import { Metadata } from "next";
import Image from "next/image";
import { RefreshCw, Monitor, UserCheck, Users, Ruler, Globe, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: "Políticas",
};

export default function PoliticasPage() {
  return (
    <>
      <section className="flex flex-col md:flex-row md:justify-evenly items-center text-left bg-secondaries_red-900">
        <div className="text-white md:pr-11 md:w-1/2">
          <p
            className={`${montserrat.className} md:mb-4 text-white font-extrabold   `}
          >
            #BibliotecaEduardoCoteLamus
          </p>
          <p className="text-6xl md:mb-4 font-bold">
            Conoce más acerca de la Biblioteca Eduardo Cote Lamus
          </p>
          <p className="md:mb-10 font-bold">
            Infórmate de nuestra historia, políticas de calidad, funcionarios y
            sobre nuestra misión y visión
          </p>
        </div>
        <Image
          className="py-20"
          src={
            "/Imagenes_biblioteca/leyendo.png"
          }
          alt="Historia"
          width={414}
          height={412}
        />
      </section>

      <section id="Politicas de Calidad" className="mt-10">
        <h2 className="text-4xl font-semibold p-2 text-center">
          Políticas de Calidad
        </h2>
        <div className="w-fit mx-auto mb-10 flex space-x-2">
          <div className="h-2 w-2 bg-secondaries_red-800 rounded-full"></div>
          <div className="h-2 w-32 bg-secondaries_red-800 rounded-full"></div>
          <div className="h-2 w-2 bg-secondaries_red-800 rounded-full"></div>
        </div>

        <p className="mb-10 mx-5">
          La Biblioteca Eduardo Cote Lamus procura recopilar, clasificar y poner
          a disposición de la comunidad universitaria y regional el conocimiento
          de punta y toda la información posible de las diferentes áreas del
          conocimiento, mediante el uso de nuevas tecnologías de la información
          que permitan conectarse con el mundo científico y cultural, buscando
          la excelencia en el servicio basado en los requisitos de la norma NTGP
          1000, el cumplimiento de los objetivos de calidad y la mejora continua
          en todos sus procesos.
        </p>
        <h3 className="text-center text-2xl font-semibold mb-10">
          Objetivos de Calidad
        </h3>
      </section>

      <section className="flex flex-col md:flex-row md:justify-between md:space-x-4 place-content-around">
        <div className="flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <RefreshCw
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Renovar y actualizar permanentemente los recursos bibliográficos y
            sistemas de información
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <Monitor
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Posibilitar el acceso a los recursos que presta la Biblioteca
            mediante tecnologías avanzadas.
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <UserCheck
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Aumentar la satisfacción de los usuarios internos y externos,
            mediante la adecuada prestación de los servicios.
          </p>
        </div>
      </section>
      <section className="flex flex-col md:flex-row md:justify-between md:space-x-4 place-content-around">
        <div className="flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <Users
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Establecer y mantener estrategias y medios de comunicación efectivas
            con los usuarios y funcionarios.
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <Ruler
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Ofertar permanentemente programas de capacitación que posibiliten
            mejorar las competencias de funcionarios de la biblioteca y sus
            usuarios.
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <Globe
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Participar activamente en programas y redes de cooperación
            interinstitucionales regionales, nacionales e internacionales para
            potenciar recursos y servicios.
          </p>
        </div>
      </section>
      <section className="flex justify-around flex-col md:flex-row md:justify-between md:space-x-4 place-content-around">
        <div className="hidden md:flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4"></div>{" "}
        {/* Div izquierdo vacío, oculto en móviles */}
        <div className="flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4">
          <Server
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left">
            Renovar y actualizar permanentemente los recursos bibliográficos y
            sistemas de información
          </p>
        </div>
        <div className="hidden md:flex flex-col items-center md:text-left mb-6 md:mb-0 w-full h-48 md:h-64 bg-white rounded-lg p-4"></div>{" "}
        {/* Div derecho vacío, oculto en móviles */}
      </section>
    </>
  );
}
