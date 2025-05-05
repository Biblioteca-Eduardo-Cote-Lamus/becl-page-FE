// Componente de esqueleto para la tabla de préstamos
export function PrestamosTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="bg-white p-4">
              <div className="mb-4 h-8 w-36 animate-pulse rounded-md bg-gray-200" />
              <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="col-span-1">
                    <div className="h-8 animate-pulse rounded-md bg-gray-200" />
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-8 gap-4">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className="col-span-1 h-8 animate-pulse rounded-md bg-gray-200" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
