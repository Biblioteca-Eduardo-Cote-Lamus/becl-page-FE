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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {employees.map((employee) => (
        <div
          key={employee.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            width: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={employee.imagen}
            alt={employee.nombre}
            width={100}
            height={100}
            style={{ borderRadius: "5%" }}
          />
          <h2 style={{ fontSize: "1.2em", margin: "10px 0" }} className="text-secondaries_red-950">{employee.nombre}</h2>
          <p style={{ color: "#555" }}>{employee.cargo}</p>
        </div>
      ))}
    </div>
      );
};

export default ListaFuncionarios;
