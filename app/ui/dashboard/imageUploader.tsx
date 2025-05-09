"use client";

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { toastConfig } from "@/app/ui/components/CustomToast";
import Image from 'next/image';

interface ImageUploaderProps {
  onImageSelect: (url: string) => void;
  currentImage?: string;
  className?: string;
  isEditMode?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  currentImage,
  className = '',
  isEditMode = false
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('El archivo seleccionado no es una imagen', toastConfig.error);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB', toastConfig.error);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const { filename } = await response.json();
      setPreviewUrl(filename);
      onImageSelect(filename);
      toast.success('Imagen subida exitosamente', toastConfig.success);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al subir la imagen', toastConfig.error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isUploading ? 'Subiendo...' : isEditMode ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Mostrar preview de la imagen actual o la nueva */}
      {(currentImage || previewUrl) && (
        <div className="mt-4">
          <Image
            src={previewUrl || currentImage || ''}
            alt="Preview"
            className="max-w-xs rounded-lg shadow-md object-cover h-48 w-full"
            width={300}
            height={192}
            onError={() => {
              toast.error('Error al previsualizar la imagen', toastConfig.error);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;