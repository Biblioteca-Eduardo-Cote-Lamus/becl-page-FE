import { Noticias } from '@/app/lib/definitions';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface NoticiaCardProps {
  noticia: Noticias;
}

export function NoticiaCard({ noticia }: NoticiaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {noticia.imagen && (
        <div className="relative w-full h-48">
          <Image
            src={noticia.imagen}
            alt={noticia.titular}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {noticia.titular}
          </h3>
          {noticia.importante && (
            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              Importante
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{noticia.descripcion}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>Publicado el {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
} 