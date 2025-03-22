"use client";

import { montserrat } from "@/app/ui/fonts";
import { Monitor, Book, RotateCcw, BookOpen, ArrowRight } from 'lucide-react';

export default function ServiciosSection() {
  return (
    <section className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pb-10 animate-fade-in">
      <h2
        className={`mt-12 sm:mt-16 md:mt-20 text-center text-3xl sm:text-4xl md:text-5xl text-secondaries_red-900 font-semibold ${montserrat.className} animate-slide-up`}
      >
        Servicios
      </h2>
      <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-center max-w-2xl animate-slide-up">
        Accede a los demás servicios que ofrece la{" "}
        <b>Biblioteca Eduardo Cote Lamus</b>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-8 w-full">
        <div className="p-6 text-center flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
          <Monitor
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-all duration-300 hover:-translate-y-2 hover:scale-110"
          />
          <h4 className="text-xl font-semibold mb-3">Sala de cómputo</h4>
          <p className="text-gray-600">
            Accede a un computador para realizar tus actividades de manera
            libre.
          </p>
        </div>
        <div className="p-6 text-center flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
          <Book
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-all duration-300 hover:-translate-y-2 hover:scale-110"
          />
          <h4 className="text-xl font-semibold mb-3">Préstamo de libros</h4>
          <p className="text-gray-600">
            ¿Sabías que puedes realizar el préstamo de un libro a la
            biblioteca?
          </p>
        </div>
        <div className="p-6 text-center flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
          <RotateCcw
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-all duration-300 hover:-translate-y-2 hover:scale-110"
          />
          <h4 className="text-xl font-semibold mb-3">Devolución de libros</h4>
          <p className="text-gray-600">
            Devolver el material bibliográfico en el tiempo estipulado para
            no generar multas.
          </p>
        </div>
        <div className="p-6 text-center flex flex-col items-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
          <BookOpen
            size={62.74}
            color="#a51f22"
            className="mb-6 transform transition-all duration-300 hover:-translate-y-2 hover:scale-110"
          />
          <h4 className="text-xl font-semibold mb-3">Salas de lectura</h4>
          <p className="text-gray-600">
            Use las salas de lecturas disponibles para estudiar, leer o
            realizar sus actividades.
          </p>
        </div>
      </div>
      <button
        className="bg-secondaries_red-800 text-white rounded-lg py-3 px-6 flex items-center gap-2 hover:bg-secondaries_red-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
        type="button"
        onClick={() => (window.location.href = "/servicios")}
      >
        Ver más
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </section>
  );
} 