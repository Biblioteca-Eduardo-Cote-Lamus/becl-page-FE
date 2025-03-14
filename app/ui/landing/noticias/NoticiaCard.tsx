import Image from 'next/image';
import Link from 'next/link';
import { Noticias } from '@/app/lib/definitions';

interface NoticiaCardProps {
  noticia: Noticias;
}

export function NoticiaCard({ noticia }: NoticiaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/noticias/${noticia.id}`}>
        <div className="relative h-48">
          <Image
            src={noticia.imagen || '/placeholder-image.jpg'}
            alt={noticia.titular}
            fill
            className="object-cover"
          />
          {noticia.importante && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
              Importante
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {noticia.titular}
          </h2>
          <p className="text-gray-600 line-clamp-3">
            {noticia.descripcion}
          </p>
          <div className="mt-4 text-secondaries_red-800 font-medium">
            Leer más →
          </div>
        </div>
      </Link>
    </div>
  );
} 