"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ImageUploader from "@/app/ui/dashboard/imageUploader"; 
import { CustomToast, toastConfig } from "@/app/ui/components/CustomToast";

const CreateNoticia: React.FC = () => {
  const [titular, setTitular] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [importante, setImportante] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagen) {
      toast.error('Por favor selecciona una imagen', toastConfig.error);
      return;
    }
    
    setIsLoading(true);

    try {
      const noticia = { titular, descripcion, imagen, importante };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/noticias`,
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.API_KEY || "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticia),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create noticia: ${response.status} ${errorText}`
        );
      }

      toast.success('Noticia creada exitosamente', toastConfig.success);
    } catch (error) {
      console.error("Error creating noticia:", error);
      toast.error('Error al crear la noticia', toastConfig.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl font-bold mb-4">Crear Noticia</h1>
      <label className="block mb-2">
        Titular:
        <input
          type="text"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </label>
      
      <div className="mb-4">
        <label className="block mb-2">Imagen:</label>
        <ImageUploader
          onImageSelect={setImagen}
          currentImage={imagen}
          className="w-full"
        />
      </div>

      <label className="block mb-4">
        Importante:
        <input
          type="checkbox"
          checked={importante}
          onChange={(e) => setImportante(e.target.checked)}
          className="ml-2"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Creando...' : 'Crear'}
      </button>
      <CustomToast />
    </form>
  );
};

export default CreateNoticia;