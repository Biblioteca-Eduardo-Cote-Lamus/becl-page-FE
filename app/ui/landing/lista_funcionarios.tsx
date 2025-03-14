"use client";

import React, { useEffect, useState } from "react";
import { Funcionario, getFuncionarios } from "@/app/actions/funcionarios";
import Image from "next/image";

const ListaFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFuncionarios();
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
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative h-64 w-full">
              <Image
                src={funcionario.imagen || '/placeholder-person.jpg'}
                alt={funcionario.nombre}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {funcionario.nombre}
              </h3>
              <p className="text-gray-600">{funcionario.cargo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaFuncionarios; 