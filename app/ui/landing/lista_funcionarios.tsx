"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Funcionario {
  id: string;
  nombre: string;
  cargo: string;
  imagen: string;
}

const ListaFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/personal');
        const data = await response.json();
        setFuncionarios(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching funcionarios:', error);
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
    <div className="w-full py-12" id="funcionarios">
      <h2 className="text-3xl font-bold text-center text-secondaries_red-900 mb-8">
        Nuestro Equipo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {funcionarios.map((funcionario) => (
          <div
            key={funcionario.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-72 w-full flex items-center justify-center bg-gray-100 overflow-hidden">
              <div className="relative h-full w-full transition-transform duration-300 hover:scale-105">
                <Image
                  src={funcionario.imagen ? `/uploads/funcionarios/${funcionario.imagen}` : '/placeholder-person.jpg'}
                  alt={funcionario.nombre}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={parseInt(funcionario.id) <= 3}
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondaries_red-900 mb-2">
                {funcionario.nombre}
              </h3>
              <p className="text-gray-600 font-medium">{funcionario.cargo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaFuncionarios; 