"use client";

import { montserrat, openSans } from "@/app/ui/fonts";
import { Computer, Book, ArrowLeft, BookOpen, Newspaper, Layout, Database, MonitorCheck } from "lucide-react";
import Image from "next/image";
import ActionButton from "@/app/ui/landing/action_button";

export default function ServiciosPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Sección de Introducción */}
      <section className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-8 text-center text-secondaries_red-900 animate-fade-in-up animation-delay-200">
          Servicios de la Biblioteca Eduardo Cote Lamus
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center animate-fade-in-up animation-delay-400">
          A la disposición de la Comunidad Estudiantil, Docentes y Administrativos
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
          En esta sección encontrarás todos los servicios que la Biblioteca
          Eduardo Cote Lamus ofrece a la comunidad estudiantil, docentes y
          administrativos pertenecientes a nuestra alma mater.
        </p>
      </section>

      {/* Sección de Servicios Digitales */}
      <section className="md:px-16 bg-gray-100 py-10 animate-fade-in-up animation-delay-800">
        <h2 className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}>
          Servicios Digitales
        </h2>
        <div className="flex flex-col-reverse items-center">
          <div className="md:flex flex-row justify-center items-center">
            <Image
              className="transform transition-transform hover:-translate-x-2 animate-fade-in-up animation-delay-1000"
              width={450}
              height={377}
              alt="Catálogo en línea"
              src="/Imagenes_biblioteca/catalogo-en-linea.png"
            />
            <div className="text-center md:text-left animate-fade-in-up animation-delay-1200">
              <h3 className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 ${openSans.className}`}>
                Biblioteca Digital
              </h3>
              <p className="text-xl">
                Son aquellos portales web que recopilan y almacenan información
                de carácter científico. Ingresa y explora lo que cada{" "}
                <b>biblioteca</b> tiene para ofrecer.
              </p>
              <div className="flex justify-around mt-6">
                <ActionButton
                  onClick={() =>
                    window.open(
                      "https://login.bdbiblioteca.ufps.edu.co/public/menu.htm",
                      "_blank"
                    )
                  }
                >
                  Explorar bibliotecas
                </ActionButton>
                <ActionButton
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1OPoatvMTayezkF6NEsOXddojKLUy_Otz/view?usp=sharing",
                      "_blank"
                    )
                  }
                  icon="eye"
                >
                  Ver tutorial
                </ActionButton>
              </div>
            </div>
          </div>
          <div className="md:flex flex-row-reverse justify-center items-center mt-12">
            <Image
              className="transform transition-transform hover:translate-x-2 animate-fade-in-up animation-delay-1400"
              width={450}
              height={377}
              alt="Biblioteca digital"
              src="/Imagenes_biblioteca/biblioteca-digital.png"
            />
            <div className="text-center md:text-left animate-fade-in-up animation-delay-1600">
              <h3 className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 ${openSans.className}`}>
                Catálogo en línea
              </h3>
              <p className="text-xl">
                Diseñado para consultar y ubicar el material bibliográfico con
                el que la <b>Biblioteca Eduardo Cote Lamus</b> dispone en sus
                instalaciones. Ingresa una palabra clave, el nombre de libro,
                autor, etc. En la barra de búsqueda y disfrute de su lectura.
              </p>
              <div className="flex justify-around mt-6">
                <ActionButton
                  onClick={() =>
                    window.open(
                      "https://catalogobiblioteca.ufps.edu.co/",
                      "_blank"
                    )
                  }
                >
                  Explorar catálogo
                </ActionButton>
                <ActionButton
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1OLinVYvaPDodtG77RJqivANUlznvKkE2/view?usp=sharing",
                      "_blank"
                    )
                  }
                  icon="eye"
                >
                  Ver tutorial
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Presenciales */}
      <section className="md:px-16 py-10 animate-fade-in-up animation-delay-1800">
        <h2 className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}>
          Servicios Presenciales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
          <div className="pt-4 flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-x-2 hover:shadow-xl">
            <div className="flex justify-center w-full mb-4">
              <Computer className="text-5xl text-secondaries_red-900" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center w-full">Sala de cómputo</h4>
            <p className="text-gray-700 text-left w-full">
              Ingresa a la sala de cómputo en biblioteca segundo piso. Presente
              el carnet estudiantil y el funcionario encargado de la sala le
              indicará que computador podrá usar.
            </p>
          </div>
          <div className="pt-4 flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:translate-x-2 hover:shadow-xl">
            <div className="flex justify-center w-full mb-4">
              <Book className="text-5xl text-secondaries_red-900" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center w-full">Préstamo de material bibliográfico</h4>
            <p className="text-gray-700 text-left w-full">
              Acérquese a la sección de <b>circulación y préstamo</b> en la
              biblioteca. Presente el carnet estudiantil y firme la ficha de
              prestación. Disfrute del libro y recuerde devolverlo en el tiempo
              indicado.
            </p>
          </div>
          <div className="pt-4 flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-x-2 hover:shadow-xl">
            <div className="flex justify-center w-full mb-4">
              <ArrowLeft className="text-5xl text-secondaries_red-900" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center w-full">Devolución de material bibliográfico</h4>
            <p className="text-gray-700 text-left w-full">
              Acérquese a la sección de devolución de material bibliográfico
              ubicada en la salida de la biblioteca.{" "}
              <a
                href="https://www.instagram.com/reel/DAT5qMqPhNO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                ¿Cómo devolver un libro?
              </a>
            </p>
          </div>
          <div className="pt-4 flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:translate-x-2 hover:shadow-xl">
            <div className="flex justify-center w-full mb-4">
              <BookOpen className="text-5xl text-secondaries_red-900" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center w-full">Salas de lectura</h4>
            <p className="text-gray-700 text-left w-full">
              Ingresa a la biblioteca, busca el libro que necesita para estudiar
              (recuerde apoyarse en el catálogo virtual) y ubíquese de manera
              libre en una de las 14 salas de lectura disponibles.
            </p>
          </div>
          <div className="pt-4 flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-x-2 hover:shadow-xl">
            <div className="flex justify-center w-full mb-4">
              <Newspaper className="text-5xl text-secondaries_red-900" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center w-full">Hemeroteca</h4>
            <p className="text-gray-700 text-left w-full">
              Ingresa a la biblioteca, busca el libro que necesita para estudiar
              (recuerde apoyarse en el catálogo virtual) y ubíquese de manera
              libre en una de las 14 salas de lectura disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Especiales */}
      <section className="md:px-16 bg-gray-100 py-10 animate-fade-in-up animation-delay-2000">
        <h2 className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}>
          Servicios Especiales
        </h2>
        <div className="flex flex-col md:flex-row gap-6 my-5">
          <div className="pt-4 text-center flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-y-2 hover:shadow-xl">
            <Layout className="text-5xl text-secondaries_red-900 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Auditorio Eduardo Cote Lamus</h4>
            <p className="text-gray-700">
              Solicita a través del correo{" "}
              <a
                href="mailto:biblioteca@ufps.edu.co?subject=Prestamo%20Auditorio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                biblioteca@ufps.edu.co
              </a>{" "}
              el préstamo del auditorio Eduardo Cote Lamus para la realización
              de un evento.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-y-2 hover:shadow-xl">
            <MonitorCheck className="text-5xl text-secondaries_red-900 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Préstamo Sala de Semilleros</h4>
            <p className="text-gray-700">
              Solicita a través del correo{" "}
              <a
                href="mailto:biblioteca@ufps.edu.co?subject=Prestamo%20sala%20de%20%20semilleros"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                biblioteca@ufps.edu.co
              </a>{" "}
              el préstamo de la sala de semilleros en el segundo piso de la
              Biblioteca.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-y-2 hover:shadow-xl">
            <Database className="text-5xl text-secondaries_red-900 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Capacitaciones de Bases de Datos</h4>
            <p className="text-gray-700">
              Solicita a través del correo{" "}
              <a
                href="mailto:biblioteca@ufps.edu.co?subject=Capacitaciones%20de%20Bases%20de%20Datos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                biblioteca@ufps.edu.co
              </a>{" "}
              una capacitación en las bibliotecas digitales de convenio con la
              biblioteca.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
