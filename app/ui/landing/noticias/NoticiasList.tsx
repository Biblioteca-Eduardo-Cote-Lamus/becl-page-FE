import { getNoticias } from '@/app/actions/noticias';
import { NoticiaCard } from './NoticiaCard';

export async function NoticiasList() {
  const noticias = await getNoticias();

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