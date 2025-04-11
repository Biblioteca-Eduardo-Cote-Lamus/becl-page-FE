"use client";

import React, { useEffect, useState } from "react";
import { Noticias } from "@/app/lib/definitions";
import Link from "next/link";
import { PlusSquare, PenSquare, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { getNoticias, deleteNoticia } from "@/app/actions/noticias";

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
        await deleteNoticia(id);
        toast.success("Noticia eliminada exitosamente");
        setNoticias(noticias.filter((n) => n.id !== id));
      } catch (error) {
        console.error("Error deleting noticia:", error);
        toast.error("Error al eliminar la noticia");
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
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <PlusSquare className="mr-1 inline-block" />
          Crear Noticia
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
        Noticias
      </h2>
      <Link
        href="/dashboard/noticias/create"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <PlusSquare className="mr-1" />
        Crear Noticia
      </Link>
      <ul className="mt-4 md:mt-8 space-y-4 md:space-y-8">
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            <h3 className="text-lg md:text-xl font-semibold">
              {noticia.titular}
            </h3>
            <p className="text-gray-600">{noticia.descripcion}</p>
            <div className="flex justify-end space-x-2 mt-2">
              <Link
                href={`/dashboard/noticias/${noticia.id}/edit`}
                className="text-blue-500 hover:text-blue-700"
              >
                <PenSquare className="inline-block" />
              </Link>
              <button
                onClick={() => handleDelete(noticia.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="inline-block" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default NoticiasList;
