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
    <div>
      {mision_vision.map((item) => (
        <div className="mb-2" key={item.id}>
          <h2 className="text-2xl font-semibold mb-4">{item.nombre}</h2>
          <p>{item.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default MisionVision;
