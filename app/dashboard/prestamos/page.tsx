import { Suspense } from 'react';
import { PrestamosTable } from '@/app/ui/dashboard/prestamos/prestamos-table';
import { fetchPrestamos } from '@/app/lib/data';
import { PrestamosTableSkeleton } from '@/app/ui/dashboard/prestamos/skeletons';

// Indicar a Next.js que esta página no debe ser cacheada
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PrestamosPage() {
  const prestamos = await fetchPrestamos();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Préstamos</h1>
      </div>
      <div className="mt-6">
        <Suspense fallback={<PrestamosTableSkeleton />}>
          <PrestamosTable prestamos={prestamos} />
        </Suspense>
      </div>
    </div>
  );
}
