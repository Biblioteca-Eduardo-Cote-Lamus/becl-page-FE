"use client";

import React, { useEffect, useState } from "react";
import { Funcionario } from "@/app/lib/definitions";
import { fetchEmployees } from "@/app/lib/data";
import Image from "next/image";

const ListaFuncionarios: React.FC = () => {
  const [employees, setEmployees] = useState<Funcionario[]>([]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };

    getEmployees();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="border border-gray-300 rounded-lg p-4 text-center w-48 flex flex-col items-center"
        >
          <div className="transform transition-transform duration-300 hover:scale-150">
            <Image
              src={employee.imagen}
              alt={employee.nombre}
              width={100}
              height={100}
              className="rounded-[5%]"
            />
          </div>
          <h2 className="text-lg my-2 text-secondaries_red-950">{employee.nombre}</h2>
          <p className="text-gray-600">{employee.cargo}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaFuncionarios; 