"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Noticias } from '@/app/lib/definitions';
import ImageUploader from "@/app/ui/dashboard/imageUploader";
import { useRouter } from 'next/navigation';
import { CustomToast, toastConfig } from "@/app/ui/components/CustomToast";
import { createNoticia } from '@/app/actions/noticias';

export default function CreateNoticiaPage() {
  const [noticia, setNoticia] = useState<Partial<Noticias>>({
    titular: '',
    descripcion: '',
    imagen: '',
    importante: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!noticia.imagen) {
      toast.error('Por favor selecciona una imagen', toastConfig.error);
      return;
    }

    setIsLoading(true);
    try {
      const result = await createNoticia(noticia as Omit<Noticias, 'id'>);
      
      if (!result.success) {
        throw new Error(result.error || 'Error al crear la noticia');
      }

      toast.success('Noticia creada exitosamente', toastConfig.success);
      router.push('/dashboard/noticias');
    } catch (error) {
      console.error('Error creating noticia:', error);
      toast.error(error instanceof Error ? error.message : 'Error al crear la noticia', toastConfig.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Noticia</h1>
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
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creando...' : 'Crear Noticia'}
      </button>
      <CustomToast />
    </form>
  );
}