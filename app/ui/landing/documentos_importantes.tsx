"use client";
import React, { useEffect, useState } from "react";
import { fetchDocumentosImportancia } from "@/app/lib/data";
import { FileText } from "lucide-react"; // Importamos el ícono de documento

interface Documento {
  id: string;
  descripcion: string;
  url: string;
}

const DocumentosImportantes = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchDocumentosImportancia()
      .then((data) => {
        setDocumentos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondaries_red-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full" id="documentos">
      <h2 className="mb-8 text-3xl font-bold text-center text-secondaries_red-900">
        Documentos de Importancia
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {documentos.map((documento) => (
          <a
            key={documento.id}
            href={documento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg 
                     transition-all duration-300 border border-gray-100 
                     hover:border-secondaries_red-200 hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FileText 
                  className="w-6 h-6 text-secondaries_red-900 group-hover:text-secondaries_red-700 
                           transition-colors duration-300" 
                />
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-800 group-hover:text-secondaries_red-900 
                          transition-colors duration-300 line-clamp-2">
                  {documento.descripcion}
                </p>
                <p className="mt-1 text-sm text-gray-500 group-hover:text-secondaries_red-700">
                  Click para ver documento
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {documentos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay documentos disponibles en este momento.
        </div>
      )}
    </div>
  );
};

export default DocumentosImportantes;