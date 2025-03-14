"use client";

import React, { useEffect, useState } from 'react';
import { Hito, getHitos } from '@/app/actions/hitos';
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
    <div className="w-full py-12 bg-gray-50" id="historia">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondaries_red-900 mb-12">
          Nuestra Historia
        </h2>
        <div className="relative">
          {/* Línea vertical central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondaries_red-200"></div>
          
          <div className="space-y-16">
            {hitos.map((hito, index) => (
              <div
                key={hito.id}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } relative`}
              >
                {/* Punto en la línea del tiempo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondaries_red-900 rounded-full"></div>
                
                {/* Contenido */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    {hito.imagen && (
                      <div className="relative h-48 mb-4">
                        <Image
                          src={hito.imagen}
                          alt={hito.titulo}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-secondaries_red-900 mb-2">
                      {hito.titulo}
                    </h3>
                    <p className="text-gray-600 mb-2">{hito.fecha}</p>
                    <p className="text-gray-700">{hito.descripcion}</p>
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
