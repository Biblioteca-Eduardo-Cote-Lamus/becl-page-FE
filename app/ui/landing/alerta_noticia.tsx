'use client';

import { useEffect, useState } from 'react';
import { Noticias } from '@/app/lib/definitions';
import { getNoticias } from '@/app/actions/noticias';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function AlertaNoticia() {
  const [visibleNoticia, setVisibleNoticia] = useState<Noticias | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  // Efecto para manejar el bloqueo del scroll
  useEffect(() => {
    if (visibleNoticia) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      // Bloquear el scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restaurar el scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [visibleNoticia]);

  const handleClose = () => {
    setVisibleNoticia(null);
  };

  if (isLoading || !visibleNoticia) {
    return null;
  }

  return (
    <div 
      className="fixed bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      style={{ 
        position: 'fixed', 
        top: '5rem', // Altura del navbar
        left: 0, 
        right: 0,
        height: 'calc(100vh - 5rem)', // Altura total menos el navbar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 transform transition-all animate-fade-in"
        style={{ 
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 10000
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
}