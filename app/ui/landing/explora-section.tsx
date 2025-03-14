"use client";

import { montserrat, openSans } from "@/app/ui/fonts";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ExploraSection() {
  return (
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
  );
} 