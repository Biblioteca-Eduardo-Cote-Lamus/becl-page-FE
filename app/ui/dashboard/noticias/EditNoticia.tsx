"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Noticias } from '@/app/lib/definitions';
import { getNoticiaById } from '@/app/actions/noticias';
import ImageUploader from "@/app/ui/dashboard/imageUploader";
import { useRouter } from 'next/navigation';
import { CustomToast, toastConfig } from "@/app/ui/components/CustomToast";

interface EditNoticiaProps {
  params: {
    id: string;
  };
}

export default function EditNoticia({ params }: EditNoticiaProps) {
  const [noticia, setNoticia] = useState<Noticias | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const data = await getNoticiaById(params.id);
        setNoticia(data);
      } catch (error) {
        console.error('Error fetching noticia:', error);
        toast.error('Error al cargar la noticia', toastConfig.error);
        router.push('/dashboard/noticias');
      }
    };

    fetchNoticia();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!noticia) return;
    
    if (!noticia.imagen) {
      toast.error('Por favor selecciona una imagen', toastConfig.error);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/noticias/${params.id}`, {
        method: 'PUT',
        headers: {
          "x-api-key": process.env.API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticia),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update noticia: ${response.status} ${errorText}`);
      }
      toast.success('Noticia actualizada exitosamente', toastConfig.success);
      router.push('/dashboard/noticias');
    } catch (error) {
      console.error('Error updating noticia:', error);
      toast.error('Error al actualizar la noticia', toastConfig.error);
    }
  };

  if (!noticia) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl font-bold mb-4">Editar Noticia</h1>
      <label className="block mb-2">
        Titular:
        <input
          type="text"
          value={noticia.titular}
          onChange={(e) => setNoticia({ ...noticia, titular: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        Descripción:
        <textarea
          value={noticia.descripcion}
          onChange={(e) => setNoticia({ ...noticia, descripcion: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      
      <div className="mb-4">
        <label className="block mb-2">Imagen:</label>
        <ImageUploader
          onImageSelect={(url) => setNoticia({ ...noticia, imagen: url })}
          currentImage={noticia.imagen}
          className="w-full"
        />
      </div>

      <label className="block mb-4">
        Importante:
        <input
          type="checkbox"
          checked={noticia.importante}
          onChange={(e) => setNoticia({ ...noticia, importante: e.target.checked })}
          className="ml-2"
        />
      </label>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Guardar Cambios
      </button>
      <CustomToast />
    </form>
  );
} 