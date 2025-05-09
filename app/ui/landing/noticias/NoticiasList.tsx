'use client';

import { useEffect, useState } from 'react';
import { getNoticias } from '@/app/actions/noticias';
import { NoticiaCard } from './NoticiaCard';
import { Noticias } from '@/app/lib/definitions';

export function NoticiasList() {
  const [noticias, setNoticias] = useState<Noticias[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getNoticias();
        setNoticias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading noticias:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Configurar un intervalo para actualizar los datos cada 30 segundos
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

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
        <p className="text-gray-600">No hay noticias disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {noticias.map((noticia) => (
        <NoticiaCard key={noticia.id} noticia={noticia} />
      ))}
    </div>
  );
} 