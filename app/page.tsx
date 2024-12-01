"use client";

import { montserrat, openSans } from "./ui/fonts";
import Footer from "./ui/landing/footer";
import NavbarMenu from "./ui/landing/navbar";
import DocumentosImportantes from "./ui/landing/documentos_importantes";
import Carrusel from "./ui/landing/carrusel_imagenes";
import Experiencia from "./ui/landing/experiencia";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBook,
  faBookOpen,
  faDesktop,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  RiComputerLine,
  RiBookLine,
  RiArrowGoBackLine,
  RiBookOpenLine,
} from "react-icons/ri";
import { Suspense } from "react";
import { InvoiceSkeleton } from "./ui/skeletons";
import AlertaNoticia from "./ui/landing/alerta_noticia";
import EventosComponent from "./ui/landing/eventos";

export default function Page() {
  return (
    <>
      <NavbarMenu />
      <main className="flex min-h-screen flex-col p-6">
        {/* Alerta de noticia importante */}
        <AlertaNoticia />
        {/* Sección de novedades */}
        <section className="mt-32">
          <h2
            className={`pb-10 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
          >
            Novedades
          </h2>
          <main>{/* Componente de eventos*/}</main>

          {/*<EventosComponent />*/}
          <div>
            <div className="md:pt-9">
              <Suspense>
                <Carrusel />
              </Suspense>
            </div>
          </div>
        </section>
        {/* Sección de explora */}
        <section className="flex flex-col items-center md:px-16 bg-gray-100">
          <h2
            className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
          >
            Explora
          </h2>
          <div className="md:flex flex-row justify-center items-center ">
            <Image
              className="transform transition-transform hover:-translate-x-2"
              width={450}
              height={377}
              alt={"Biblioteca digital"}
              src={
                "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/11/bibliotecas-virtuales-removebg.png"
              }
            />
            <div>
              <h3
                className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 ${openSans.className}`}
              >
                Biblioteca Digital
              </h3>
              <p className="text-xl">
                Ingresa a la biblioteca digital Eduardo Cote Lamus y obtenga
                información de calidad como base de datos, artículos
                científicos, libros digitales y demás información de su interés.
              </p>
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
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
          <div className="md:flex flex-row-reverse justify-center items-center ">
            <Image
              className="transform transition-transform hover:translate-x-2"
              width={450}
              height={377}
              alt={"Biblioteca digital"}
              src={
                "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/11/catalogo-en-linea-removebg-preview.png"
              }
            />
            <div>
              <h3
                className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 ${openSans.className}`}
              >
                Catálogo en línea
              </h3>
              <p className="text-xl">
                Ubique en el catálogo en línea el libro físico de su interés
                usando nuestro sistema Koha y disfrute en cualquiera de las
                salas disponibles su lectura
              </p>
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
                Explorar Cátalogo
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Sección de servicios */}
        <section className="flex flex-col items-center md:px-16 pb-10">
          <h2
            className={`mt-20 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
          >
            Servicios
          </h2>
          <p className="mt-6 text-xl">
            Accede a los demás servicios que ofrece la{" "}
            <b>Biblioteca Eduardo Cote Lamus</b>
          </p>
          <div className="md:flex md:flex-row my-5 items-start px-1 ">
            <div className="pt-4 text-center flex flex-col items-center">
              <FontAwesomeIcon
                icon={faDesktop}
                style={{
                  width: "62.74px",
                  height: "62.74px",
                  color: "#a51f22",
                }}
                className="mb-6 transform transition-transform hover:-translate-y-2"
              />
              <h4 className="text-xl font-semibold">Sala de cómputo</h4>
              <p>
                Accede a un computador para realizar tus actividades de manera
                libre.
              </p>
            </div>
            <div className="pt-4 text-center flex flex-col items-center px-1">
              <FontAwesomeIcon
                icon={faBook}
                style={{
                  width: "62.74px",
                  height: "62.74px",
                  color: "#a51f22",
                }}
                className="mb-6 transform transition-transform hover:-translate-y-2"
              />
              <h4 className="text-xl font-semibold">Préstamo de libros</h4>
              <p>
                ¿Sabías que puedes realizar el préstamo de un libro a la
                biblioteca?
              </p>
            </div>
            <div className="pt-4 text-center flex flex-col items-center px-1">
              <FontAwesomeIcon
                icon={faRotateLeft}
                style={{
                  width: "62.74px",
                  height: "62.74px",
                  color: "#a51f22",
                }}
                className="mb-6 transform transition-transform hover:-translate-y-2"
              />
              <h4 className="text-xl font-semibold">Devolución de libros</h4>
              <p>
                Devolver el material bibliográfico en el tiempo estipulado para
                no generar multas.
              </p>
            </div>
            <div className="pt-4 text-center flex flex-col items-center px-1">
              <FontAwesomeIcon
                icon={faBookOpen}
                style={{
                  width: "62.74px",
                  height: "62.74px",
                  color: "#a51f22",
                }}
                className="mb-6 transform transition-transform hover:-translate-y-2"
              />
              <h4 className="text-xl font-semibold">Salas de lectura</h4>
              <p>
                Use las salas de lecturas disponibles para estudiar, leer o
                realizar sus actividades.
              </p>
            </div>
          </div>
          <button
            className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-2 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
            type="button"
            onClick={() => (window.location.href = "/servicios")}
          >
            Ver más
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </section>
        {/* Sección de experiencia */}
        <section className="bg-gray-100">
          <Experiencia />
        </section>
      </main>
      <Footer />
      <script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        defer
      ></script>
    </>
  );
}
