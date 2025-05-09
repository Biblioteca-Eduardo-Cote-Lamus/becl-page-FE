'use client';

import { Prestamo } from '@/app/lib/definitions';
import { useState } from 'react';
import Image from 'next/image';

// Componente para cada fila desplegable
function PrestamoAccordionItem({ prestamo, onStatusChange }: { prestamo: Prestamo, onStatusChange: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [razonDenegacion, setRazonDenegacion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Determinar el color de fondo según el estado
  const getBgColor = () => {
    if (!prestamo.estado || prestamo.estado === 'pendiente') return 'bg-white';
    if (prestamo.estado === 'aprobado') return 'bg-green-50';
    if (prestamo.estado === 'denegado') return 'bg-red-50';
    return 'bg-white';
  };

  // Función para aprobar el préstamo
  const handleApprove = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await fetch(`/api/prestamos/${prestamo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estado: 'aprobado',
          respondido_por: 'Admin' // Aquí podrías usar el nombre del usuario actual
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al aprobar el préstamo');
      }
      
      // Actualizar la UI
      onStatusChange();
      
    } catch (err: unknown) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error al aprobar el préstamo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para denegar el préstamo
  const handleDeny = async () => {
    if (isSubmitting || !razonDenegacion.trim()) return;
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await fetch(`/api/prestamos/${prestamo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estado: 'denegado',
          razon_denegacion: razonDenegacion,
          respondido_por: 'Admin' // Aquí podrías usar el nombre del usuario actual
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al denegar el préstamo');
      }
      
      // Cerrar el modal y actualizar la UI
      setShowDenyModal(false);
      setRazonDenegacion('');
      onStatusChange();
      
    } catch (err: unknown) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error al denegar el préstamo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar el estado del préstamo
  const renderEstado = () => {
    if (!prestamo.estado || prestamo.estado === 'pendiente') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>;
    }
    if (prestamo.estado === 'aprobado') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Aprobado</span>;
    }
    if (prestamo.estado === 'denegado') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Denegado</span>;
    }
    return null;
  };

  return (
    <div className={`mb-4 overflow-hidden rounded-lg border border-gray-200 ${getBgColor()}`}>
      {/* Cabecera del acordeón - siempre visible */}
      <button
        className={`flex w-full items-center justify-between px-6 py-4 text-left transition ${isOpen ? 'bg-blue-50' : getBgColor()}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {prestamo.id}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900">{prestamo.nombre_docente}</h3>
              {renderEstado()}
            </div>
            <p className="text-sm text-gray-500">{prestamo.correo_docente}</p>
          </div>
        </div>
        <svg
          className={`h-6 w-6 transform text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Contenido desplegable */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Código Docente</h4>
              <p className="text-base">{prestamo.codigo_docente}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Actividad</h4>
              <p className="text-base">{prestamo.nombre_actividad}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Encargado</h4>
              <p className="text-base">{prestamo.encargado_actividad}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Número de Asistentes</h4>
              <p className="text-base">{prestamo.numero_asistentes}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Personas Externas</h4>
              <p className="text-base">{prestamo.personas_externas ? 'Sí' : 'No'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Foto Carné</h4>
              {prestamo.foto_carne ? (
                <div className="mt-2">
                  <div 
                    className="relative w-44 h-32 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => setShowImageModal(true)}
                  >
                    <Image
                      src={prestamo.foto_carne}
                      alt={`Imagen de ${prestamo.nombre_docente}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain bg-gray-50 rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-200 flex items-center justify-center">
                      <svg 
                        className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-base text-gray-500">No hay imagen</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Mensaje</h4>
            <p className="text-base whitespace-pre-wrap">{prestamo.mensaje || '-'}</p>
          </div>
          
          {/* Información de respuesta si ya fue respondido */}
          {prestamo.estado && prestamo.estado !== 'pendiente' && (
            <div className="mt-4 p-4 rounded-lg bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700">Información de respuesta</h4>
              <div className="mt-2">
                <p className="text-sm"><span className="font-medium">Estado:</span> {prestamo.estado === 'aprobado' ? 'Aprobado' : 'Denegado'}</p>
                <p className="text-sm"><span className="font-medium">Fecha:</span> {new Date(prestamo.fecha_respuesta || '').toLocaleString()}</p>
                <p className="text-sm"><span className="font-medium">Respondido por:</span> {prestamo.respondido_por || '-'}</p>
                {prestamo.estado === 'denegado' && prestamo.razon_denegacion && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Razón de denegación:</p>
                    <p className="text-sm mt-1 whitespace-pre-wrap">{prestamo.razon_denegacion}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Botones de acción si está pendiente */}
          {(!prestamo.estado || prestamo.estado === 'pendiente') && (
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Procesando...' : 'Aprobar Préstamo'}
              </button>
              <button
                onClick={() => setShowDenyModal(true)}
                disabled={isSubmitting}
                style={{ backgroundColor: '#dc2626', color: 'white' }} 
                className="px-4 py-2 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Denegar Préstamo
              </button>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal para denegar préstamo */}
      {showDenyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Razón para denegar el préstamo</h3>
            <textarea
              value={razonDenegacion}
              onChange={(e) => setRazonDenegacion(e.target.value)}
              placeholder="Explique por qué se deniega este préstamo..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
            {error && (
              <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDenyModal(false);
                  setRazonDenegacion('');
                  setError('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeny}
                disabled={isSubmitting || !razonDenegacion.trim()}
                style={{ backgroundColor: '#dc2626', color: 'white' }} 
                className="px-4 py-2 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Procesando...' : 'Denegar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver imagen */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={prestamo.foto_carne}
              alt={`Imagen de ${prestamo.nombre_docente}`}
              width={40}
              height={40}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function PrestamosTable({ prestamos: initialPrestamos }: { prestamos: Prestamo[] }) {
  // Usamos directamente initialPrestamos en lugar de mantener un estado local
  const prestamos = initialPrestamos;
  const [activeTab, setActiveTab] = useState<'todos' | 'pendientes' | 'aprobados' | 'denegados'>('todos');
  // Función para actualizar la lista de préstamos después de un cambio de estado
  const handleStatusChange = () => {
    // Usar window.location.reload() para recargar la página y obtener datos actualizados
    window.location.reload();
  };

  // Filtrar préstamos según la pestaña activa
  const filteredPrestamos = prestamos.filter(prestamo => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'pendientes') return !prestamo.estado || prestamo.estado === 'pendiente';
    if (activeTab === 'aprobados') return prestamo.estado === 'aprobado';
    if (activeTab === 'denegados') return prestamo.estado === 'denegado';
    return false;
  });

  // Contar préstamos por estado para mostrar en las pestañas
  const counts = {
    todos: prestamos.length,
    pendientes: prestamos.filter(p => !p.estado || p.estado === 'pendiente').length,
    aprobados: prestamos.filter(p => p.estado === 'aprobado').length,
    denegados: prestamos.filter(p => p.estado === 'denegado').length
  };
  
  return (
    <div className="mt-6 flow-root">
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4">Préstamos Registrados</h2>
        
        {/* Pestañas de navegación */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('todos')}
              className={`${activeTab === 'todos' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Todos
              <span className={`${activeTab === 'todos' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                {counts.todos}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('pendientes')}
              className={`${activeTab === 'pendientes' 
                ? 'border-yellow-500 text-yellow-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Pendientes
              <span className={`${activeTab === 'pendientes' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                {counts.pendientes}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('aprobados')}
              className={`${activeTab === 'aprobados' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Aprobados
              <span className={`${activeTab === 'aprobados' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                {counts.aprobados}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('denegados')}
              className={`${activeTab === 'denegados' 
                ? 'border-red-500 text-red-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Denegados
              <span className={`${activeTab === 'denegados' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                {counts.denegados}
              </span>
            </button>
          </nav>
        </div>
        
        {filteredPrestamos.length > 0 ? (
          <div className="space-y-2">
            {filteredPrestamos.map((prestamo) => (
              <PrestamoAccordionItem 
                key={prestamo.id} 
                prestamo={prestamo} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
            No hay préstamos {activeTab !== 'todos' ? activeTab : ''} registrados.
          </div>
        )}
      </div>
    </div>
  );
}