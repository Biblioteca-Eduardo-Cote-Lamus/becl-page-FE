import React, { useEffect, useState } from "react";
import { openSans } from "../fonts";
// import clsx from 'clsx';

export async function fetchDocumentosImportancia() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/documentos_importancia`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "", // Asegúrate de que la API key no sea undefined
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch documentos data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch documentos data.");
  }
}

interface Documento {
  id: string;
  descripcion: string;
  url: string;
}

const DocumentosImportantes = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  useEffect(() => {
    fetchDocumentosImportancia()
      .then((data) => setDocumentos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mt-4 flex w-full flex-col md:col-span-4" id="documentos">
      <h2
        className={`mb-4 text-4xl md:text-4xl text-center text-secondaries_red-900 italic ${openSans.className}`}
      >
        Documentos de importancia
      </h2>
      <div className="bg-white md:px-44">
        {documentos.map((documento) => (
          <div
            key={documento.id}
            className="flex flex-row items-center justify-between py-1"
          >
            <div className="flex items-center">
              <div className="min-w-0">
                <ul>
                  <li className="list-disc">
                    <a
                      rel="noopener"
                      target="_blank"
                      href={documento.url}
                      className="text-black underline"
                    >
                      <span className="text-xl italic">{documento.descripcion}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentosImportantes;
