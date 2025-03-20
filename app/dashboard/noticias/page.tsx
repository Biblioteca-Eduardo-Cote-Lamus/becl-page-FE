import { Metadata } from 'next';
import NoticiasList from '@/app/ui/dashboard/NoticiasList';
 
export const metadata: Metadata = {
  title: 'Noticias',
};

export default function NoticiasPage() {
  return (
    <div>
      <NoticiasList />
    </div>
  );
}
