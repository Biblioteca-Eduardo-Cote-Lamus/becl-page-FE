import { Prestamo } from '@/app/lib/definitions';

export function PrestamosTable({ prestamos }: { prestamos: Prestamo[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <table className="min-w-full divide-y divide-gray-200 text-gray-900">
              <thead className="bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Docente
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Código
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Correo
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Actividad
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Encargado
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Asistentes
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Ext.
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Mensaje
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-900">
                {prestamos.length > 0 ? (
                  prestamos.map((prestamo) => (
                    <tr key={prestamo.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        {prestamo.id}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.nombre_docente}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.codigo_docente}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.correo_docente}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.nombre_actividad}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.encargado_actividad}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.numero_asistentes}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.personas_externas ? 'Sí' : 'No'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {prestamo.mensaje || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-4 text-center text-gray-500">
                      No hay préstamos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
