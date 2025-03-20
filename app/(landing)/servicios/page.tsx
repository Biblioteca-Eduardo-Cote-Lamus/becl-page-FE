"use client";
import { montserrat, openSans } from "@/app/ui/fonts";
import { ArrowRight, Eye, Computer, Book, ArrowLeft, BookOpen, Newspaper, Layout } from "lucide-react";
import Image from "next/image";

export default function ServiciosPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Sección de Introducción */}
      <section className="mb-12 ">
        <h1 className="text-4xl font-bold mb-8 text-center text-secondaries_red-900">
          Servicios de la Biblioteca Eduardo Cote Lamus
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          A la disposición de la Comunidad Estudiantil, Docentes y
          Administrativos
        </h2>
        <p className="text-gray-700">
          En esta sección encontrarás todos los servicios que la Biblioteca
          Eduardo Cote Lamus ofrece a la comunidad estudiantil, docentes y
          administrativos pertenecientes a nuestra alma mater.
        </p>
      </section>

      {/* Sección de Servicios Digitales */}
      <section className="md:px-16 bg-gray-100">
        <h2
          id="digitales"
          className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
        >
          Servicios Digitales
        </h2>
        <div className="flex flex-col-reverse items-center">
          <div className="md:flex flex-row justify-center items-center">
            <Image
              className="transform transition-transform hover:-translate-x-2"
              width={450}
              height={377}
              alt={"Catálogo en línea"}
              src={
                "https://becl-imagenes.s3.us-east-1.amazonaws.com/catalogo-en-linea.jpeg"
              }
            />
            <div>
              <h3
                className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 ${openSans.className}`}
              >
                Biblioteca Digital
              </h3>
              <p className="text-xl">
                Son aquellos portales web que recopilan y almacenan información
                de carácter científico. Ingresa y explora lo que cada{" "}
                <b>biblioteca</b> tiene para ofrecer.
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-2 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://login.bdbiblioteca.ufps.edu.co/public/menu.htm",
                      "_blank"
                    )
                  }
                >
                  Explorar bibliotecas
                  <ArrowRight className="ml-2" />
                </button>
                <button
                  className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-2 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1OPoatvMTayezkF6NEsOXddojKLUy_Otz/view?usp=sharing",
                      "_blank"
                    )
                  }
                >
                  Ver tutorial
                  <Eye className="ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex flex-row-reverse justify-center items-center">
            <Image
              className="transform transition-transform hover:translate-x-2"
              width={450}
              height={377}
              alt={"Biblioteca digital"}
              src={
                "https://becl-imagenes.s3.us-east-1.amazonaws.com/biblioteca-digital.jpeg"
              }
            />
            <div>
              <h3
                className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 ${openSans.className}`}
              >
                Catálogo en línea
              </h3>
              <p className="text-xl">
                Diseñado para consultar y ubicar el material bibliográfico con
                el que la <b>Biblioteca Eduardo Cote Lamus</b> dispone en sus
                instalaciones. Ingresa una palabra clave, el nombre de libro,
                autor, etc. En la barra de búsqueda y disfrute de su lectura.
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-2 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://catalogobiblioteca.ufps.edu.co/",
                      "_blank"
                    )
                  }
                >
                  Explorar catálogo
                  <ArrowRight className="ml-2" />
                </button>
                <button
                  className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-2 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1OLinVYvaPDodtG77RJqivANUlznvKkE2/view?usp=sharing",
                      "_blank"
                    )
                  }
                >
                  Ver tutorial
                  <Eye className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Presenciales */}
      <section className="md:px-16">
        <h2
          id="presenciales"
          className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
        >
          Servicios Presenciales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="pt-4 text-center flex flex-col items-center md:items-start bg-white shadow-md rounded-md p-4 transform transition-transform hover:-translate-x-2">
            <Computer className="text-5xl text-red" />
            <h4 className="md:text-left text-xl font-semibold">
              Sala de cómputo
            </h4>
            <p className="md:text-left">
              Ingresa a la sala de cómputo en biblioteca segundo piso. Presente
              el carnet estudiantil y el funcionario encargado de la sala le
              indicará que computador podrá usar.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center md:items-start bg-white shadow-md rounded-md p-4 transform transition-transform hover:translate-x-2">
            <Book className="text-5xl text-red" />
            <h4 className="md:text-left text-xl font-semibold">
              Préstamo de material bibliográfico
            </h4>
            <p className="md:text-left">
              Acérquese a la sección de <b>circulación y préstamo</b> en la
              biblioteca. Presente el carnet estudiantil y firme la ficha de
              prestación. Disfrute del libro y recuerde devolverlo en el tiempo
              indicado.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center md:items-start bg-white shadow-md rounded-md p-4 transform transition-transform hover:-translate-x-2">
            <ArrowLeft className="text-5xl text-red" />
            <h4 className="md:text-left text-xl font-semibold">
              Devolución de material bibliográfico
            </h4>
            <p className="md:text-left">
              Acérquese a la sección de devolución de material bibliográfico
              ubicada en la salida de la biblioteca.{" "}
              <a
                href="https://www.instagram.com/reel/DAT5qMqPhNO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                ¿Cómo devolver un libro?
              </a>
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center md:items-start bg-white shadow-md rounded-md p-4 transform transition-transform hover:translate-x-2">
            <BookOpen className="text-5xl text-red" />
            <h4 className="md:text-left text-xl font-semibold">
              Salas de lectura
            </h4>
            <p className="md:text-left">
              Ingresa a la biblioteca, busca el libro que necesita para estudiar
              (recuerde apoyarse en el catálogo virtual) y ubíquese de manera
              libre en una de las 14 salas de lectura disponibles.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center md:items-start bg-white shadow-md rounded-md p-4 transform transition-transform hover:-translate-x-2">
            <Newspaper className="text-5xl text-red" />
            <h4 className="md:text-left text-xl font-semibold">Hemeroteca</h4>
            <p className="md:text-left">
              Ingresa a la biblioteca, busca el libro que necesita para estudiar
              (recuerde apoyarse en el catálogo virtual) y ubíquese de manera
              libre en una de las 14 salas de lectura disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Especiales */}
      <section className="md:px-16 bg-gray-100 py-10">
        <h2
          id="especiales"
          className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
        >
          Servicios Especiales
        </h2>
        <div className="flex flex-col md:flex-row my-5">
          <div className="pt-4 text-center flex flex-col items-center bg-white shadow-md rounded-md p-4 transform transition-transform hover:-translate-y-2">
            <Layout className="text-5xl text-red" />
            <h4 className="md:text-left text-xl font-semibold">
              Auditorio Eduardo Cote Lamus
            </h4>
            <p className="">
              Solicita a través del correo{" "}
              <a
                href="mailto:biblioteca@ufps.edu.co?subject=Prestamo%20Auditorio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                biblioteca@ufps.edu.co
              </a>{" "}
              el préstamo del auditorio Eduardo Cote Lamus para la realización
              de un evento.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center bg-white shadow-md rounded-md p-4 transform transition-transform hover:-translate-y-2">
            <h4 className="md:text-left text-xl font-semibold">
              Préstamo Sala de Semilleros
            </h4>
            <p className="">
              Solicita a través del correo{" "}
              <a
                href="mailto:biblioteca@ufps.edu.co?subject=Prestamo%20sala%20de%20%20semilleros"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                biblioteca@ufps.edu.co
              </a>{" "}
              el préstamo de la sala de semilleros en el segundo piso de la
              Biblioteca.
            </p>
          </div>
          <div className="pt-4 text-center flex flex-col items-center bg-white shadow-md rounded-md p-4 transform transition-transform hover:-translate-y-2">
            <h4 className="md:text-left text-xl font-semibold">
              Capacitaciones de Bases de Datos
            </h4>
            <p className="">
              Solicita a través del correo{" "}
              <a
                href="mailto:biblioteca@ufps.edu.co?subject=Capacitaciones%20de%20Bases%20de%20Datos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
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
