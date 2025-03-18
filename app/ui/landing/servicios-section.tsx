"use client";

import { montserrat } from "@/app/ui/fonts";
import { Monitor, Book, RotateCcw, BookOpen, ArrowRight } from 'lucide-react';

export default function ServiciosSection() {
  return (
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
          <Monitor
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <h4 className="text-xl font-semibold">Sala de cómputo</h4>
          <p>
            Accede a un computador para realizar tus actividades de manera
            libre.
          </p>
        </div>
        <div className="pt-4 text-center flex flex-col items-center px-1">
          <Book
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <h4 className="text-xl font-semibold">Préstamo de libros</h4>
          <p>
            ¿Sabías que puedes realizar el préstamo de un libro a la
            biblioteca?
          </p>
        </div>
        <div className="pt-4 text-center flex flex-col items-center px-1">
          <RotateCcw
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-transform hover:-translate-y-2"
          />
          <h4 className="text-xl font-semibold">Devolución de libros</h4>
          <p>
            Devolver el material bibliográfico en el tiempo estipulado para
            no generar multas.
          </p>
        </div>
        <div className="pt-4 text-center flex flex-col items-center px-1">
          <BookOpen
            size={62.74}
            color="#a51f22"
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
        <ArrowRight className="ml-2" />
      </button>
    </section>
  );
} 