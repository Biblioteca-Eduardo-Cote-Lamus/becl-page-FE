import { Metadata } from 'next';
import { NoticiasList } from '@/app/ui/landing/noticias/NoticiasList';

export const metadata: Metadata = {
  title: 'Noticias | Bienestar Universitario',
  description: 'Mantente informado sobre las últimas noticias y eventos de Bienestar Universitario.',
};

export default function NoticiasPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-secondaries_red-900 mb-8 text-center">
          Noticias y Eventos
        </h1>
        <NoticiasList />
      </div>
    </main>
  );
}
