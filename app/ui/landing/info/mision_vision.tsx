"use client";
import { fetchInfoMisionVision } from "@/app/lib/data";
import React, { useEffect, useState } from "react";

interface MisionVisionData {
  id: string;
  nombre: string;
  descripcion: string;
}
const MisionVision = () => {
  const [mision_vision, setMisionVision] = useState<MisionVisionData[]>([]);

  useEffect(() => {
    fetchInfoMisionVision()
      .then((data) => setMisionVision(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {mision_vision.map((item) => (
      <div className="bg-white shadow-md rounded-lg p-4 mb-2" key={item.id}>
        <h3 className="text-2xl font-semibold mb-4">{item.nombre}</h3>
        <p>{item.descripcion}</p>
      </div>
      ))}
    </div>
  );
};

export default MisionVision;
