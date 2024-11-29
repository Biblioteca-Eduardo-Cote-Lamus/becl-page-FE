"use client";
import { fetchHitos } from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface Hito {
  id: string;
  anio: string;
  imagen: string;
  descripcion: string;
}

const LineaDelTiempo = () => {
  const [hitos, setHitos] = useState<Hito[]>([]);

  useEffect(() => {
    fetchHitos()
      .then((data) => setHitos(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black"></div>
      {hitos.map((hito, index) => (
        <div
          key={hito.id}
          className={`relative mb-8 flex items-center ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          }`}
        >
          {/* Ícono de calendario */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md border-2 border-black w-10 h-10 flex flex-col justify-center">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>

          {/* Año */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-16 mb-3">
            <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
              {hito.anio}
            </span>
          </div>

          {/* Contenido del hito */}
          <div className="pr-4 w-5/12 transform transition-transform hover:-translate-y-2">
            <div className="bg-gray-200 shadow-md rounded-lg md:p-6 flex flex-col items-center">
              <Image
                src={hito.imagen}
                alt={hito.anio}
                width={500}
                height={256}
                className="w-auto h-56 object-cover rounded-lg "
              />
              <p className="text-sm text-center sm:text-lg sm:font-bold px-1 sm:px-0">
                {hito.descripcion}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LineaDelTiempo;
