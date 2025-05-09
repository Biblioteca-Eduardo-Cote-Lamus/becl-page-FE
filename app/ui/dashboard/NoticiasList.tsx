"use client";

import React, { useEffect, useState } from "react";
import { Noticias } from "@/app/lib/definitions";
import Link from "next/link";
import { PlusSquare, PenSquare, Trash2, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { getNoticias, deleteNoticia } from "@/app/actions/noticias";
import Image from "next/image";

const NoticiasList: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticias[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getNoticias();
        setNoticias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching noticias:', error);
        toast.error('Error al cargar las noticias');
        setNoticias([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta noticia?"
    );
    if (confirmed) {
      try {
        const result = await deleteNoticia(id);
        
        if (!result.success) {
          throw new Error(result.error || 'Error al eliminar la noticia');
        }

        toast.success("Noticia eliminada exitosamente");
        setNoticias(noticias.filter((n) => n.id !== id));
      } catch (error) {
        console.error("Error deleting noticia:", error);
        toast.error(error instanceof Error ? error.message : 'Error al eliminar la noticia');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!noticias || noticias.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay noticias disponibles.</p>
        <Link
          href="/dashboard/noticias/create"
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusSquare className="mr-2 h-5 w-5" />
          Crear Noticia
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Noticias Recientes</h2>
        <Link
          href="/dashboard/noticias/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusSquare className="mr-2 h-5 w-5" />
          Nueva Noticia
        </Link>
      </div>
      
      <div className="space-y-4">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  {noticia.imagen && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={noticia.imagen}
                        alt={noticia.titular}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {noticia.titular}
                      {noticia.importante && (
                        <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          Importante
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 mt-1 line-clamp-2">{noticia.descripcion}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Publicado el {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <Link
                  href={`/dashboard/noticias/${noticia.id}/edit`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar noticia"
                >
                  <PenSquare className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(noticia.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar noticia"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default NoticiasList;
