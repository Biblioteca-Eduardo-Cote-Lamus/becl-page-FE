import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Noticias',
};

export default function NoticiasPage() {
  return (
    <div>
      <h1>Noticias</h1>
      <p>This is the customers page.</p>
    </div>
  );
}
