'use client';

import { useEffect, useState } from 'react';
import { Noticias } from '@/app/lib/definitions';
import { getNoticias } from '@/app/actions/noticias';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function AlertaNoticia() {
  const [visibleNoticia, setVisibleNoticia] = useState<Noticias | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getNoticias();
        const noticiasImportantes = data.filter(n => n.importante);
        if (noticiasImportantes.length > 0) {
          setVisibleNoticia(noticiasImportantes[0]);
        }
      } catch (error) {
        console.error('Error fetching noticias:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setVisibleNoticia(null);
  };

  if (!mounted || isLoading || !visibleNoticia) {
    return null;
  }

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 z-50"
      style={{ 
        top: '5rem',
        height: 'calc(100vh - 5rem)'
      }}
    >
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl"
        style={{ 
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div className="relative">
          {visibleNoticia.imagen && (
            <div className="relative w-full h-48">
              <Image
                src={visibleNoticia.imagen}
                alt={visibleNoticia.titular}
                fill
                className="object-cover rounded-t-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">
              {visibleNoticia.titular}
            </h3>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Importante
            </span>
          </div>
          <p className="text-gray-600 text-base leading-relaxed">
            {visibleNoticia.descripcion}
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-secondaries_red-900 text-white rounded-lg hover:bg-secondaries_red-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}