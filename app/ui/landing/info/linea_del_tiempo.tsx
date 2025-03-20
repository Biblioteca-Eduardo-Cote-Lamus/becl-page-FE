"use client";

import React, { useEffect, useState } from 'react';
import { getHitos } from '@/app/actions/hitos';
import type { Hito } from '@/app/lib/definitions';
import Image from 'next/image';

const LineaDelTiempo = () => {
  const [hitos, setHitos] = useState<Hito[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHitos();
        setHitos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching hitos:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondaries_red-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-12 bg-gray-50" id="historia">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-secondaries_red-900 mb-8 md:mb-12">
          Nuestra Historia
        </h2>
        <div className="relative">
          {/* Línea vertical central - oculta en móvil */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondaries_red-200"></div>
          
          <div className="space-y-8 md:space-y-16">
            {hitos.map((hito, index) => (
              <div
                key={hito.id}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } relative`}
              >
                {/* Punto en la línea del tiempo - oculto en móvil */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondaries_red-900 rounded-full"></div>
                
                {/* Contenido */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} px-4`}>
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                    {hito.imagen && (
                      <div className="relative h-40 md:h-48 mb-4">
                        <Image
                          src={`/Imagenes_biblioteca/hitos/${hito.imagen}`}
                          alt={`Hito del año ${hito.anio}`}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <h3 className="text-lg md:text-xl font-semibold text-secondaries_red-900 mb-2">
                      {`Año ${hito.anio}`}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700">{hito.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineaDelTiempo;
