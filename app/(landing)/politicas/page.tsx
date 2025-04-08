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
      <section className="px-4 md:px-0 flex flex-col md:flex-row md:justify-evenly items-center text-left bg-secondaries_red-900 py-20 animate-fade-in-up">
        <div className="text-white md:pr-11 md:w-1/2">
          <p className={`${montserrat.className} md:mb-4 text-yellow-400 font-extrabold animate-fade-in-up animation-delay-200`}>
            #BibliotecaEduardoCoteLamus
          </p>
          <p className="text-6xl md:mb-4 font-bold animate-fade-in-up animation-delay-400">
            Conoce más acerca de la Biblioteca Eduardo Cote Lamus
          </p>
        </div>
        <Image
          className="py-10 animate-fade-in-up animation-delay-800"
          src="/Imagenes_biblioteca/leyendo.png"
          alt="Historia"
          width={414}
          height={412}
        />
      </section>

      <section id="Politicas de Calidad" className="mt-10 animate-fade-in-up animation-delay-1000">
        <h2 className="text-4xl font-semibold p-2 text-center text-secondaries_red-900">
          Políticas de Calidad
        </h2>
        <div className="w-fit mx-auto mb-10 flex space-x-2">
          <div className="h-2 w-2 bg-secondaries_red-800 rounded-full"></div>
          <div className="h-2 w-32 bg-secondaries_red-800 rounded-full"></div>
          <div className="h-2 w-2 bg-secondaries_red-800 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-10">
          <p className="text-gray-700 leading-relaxed">
            La Biblioteca Eduardo Cote Lamus procura recopilar, clasificar y poner
            a disposición de la comunidad universitaria y regional el conocimiento
            de punta y toda la información posible de las diferentes áreas del
            conocimiento, mediante el uso de nuevas tecnologías de la información
            que permitan conectarse con el mundo científico y cultural, buscando
            la excelencia en el servicio basado en los requisitos de la norma NTGP
            1000, el cumplimiento de los objetivos de calidad y la mejora continua
            en todos sus procesos.
          </p>
        </div>
        <h3 className="text-center text-2xl font-semibold mb-10 text-secondaries_red-900">
          Objetivos de Calidad
        </h3>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
        <div className="flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1200">
          <RefreshCw
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Renovar y actualizar permanentemente los recursos bibliográficos y
            sistemas de información
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1400">
          <Monitor
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Posibilitar el acceso a los recursos que presta la Biblioteca
            mediante tecnologías avanzadas.
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1600">
          <UserCheck
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Aumentar la satisfacción de los usuarios internos y externos,
            mediante la adecuada prestación de los servicios.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 mt-6">
        <div className="flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-1800">
          <Users
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Establecer y mantener estrategias y medios de comunicación efectivas
            con los usuarios y funcionarios.
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-2000">
          <Ruler
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Ofertar permanentemente programas de capacitación que posibiliten
            mejorar las competencias de funcionarios de la biblioteca y sus
            usuarios.
          </p>
        </div>
        <div className="flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-2200">
          <Globe
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Participar activamente en programas y redes de cooperación
            interinstitucionales regionales, nacionales e internacionales para
            potenciar recursos y servicios.
          </p>
        </div>
      </section>

      <section className="flex justify-center px-4 md:px-8 mt-6 py-5">
        <div className="w-full md:w-1/3 flex flex-col items-center md:text-left bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-2400">
          <Server
            size={48}
            color="#a51f22"
            className="mb-4 transform transition-transform hover:-translate-y-2"
          />
          <p className="text-center md:text-left text-gray-700">
            Renovar y actualizar permanentemente los recursos bibliográficos y
            sistemas de información
          </p>
        </div>
      </section>
    </>
  );
}
