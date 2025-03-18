"use client";

import React, { useEffect, useState } from "react";
import { Noticias } from "@/app/lib/definitions";
import Link from "next/link";
import { PlusSquare, PenSquare, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { getNoticias, deleteNoticia } from "@/app/actions/noticias";

const NoticiasList: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticias[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNoticias();
        setNoticias(data);
      } catch (error) {
        console.error('Error fetching noticias:', error);
        toast.error('Error al cargar las noticias');
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
            <p className="text-sm md:text-base text-gray-500">
              {noticia.descripcion.length > 100
                ? `${noticia.descripcion.substring(0, 100)}...`
                : noticia.descripcion}
            </p>
            <button
              onClick={() =>
                (window.location.href = `/dashboard/noticias/${noticia.id}/edit`)
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <PenSquare className="mr-1" />
              Editar
            </button>
            <button
              onClick={() => handleDelete(noticia.id)}
              className="bg-secondaries_red-700 hover:bg-secondaries_red-900 text-white font-bold py-2 px-4 rounded ml-2"
            >
              <Trash2 className="mr-1" />
              Eliminar
            </button>
            <ToastContainer />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticiasList;
