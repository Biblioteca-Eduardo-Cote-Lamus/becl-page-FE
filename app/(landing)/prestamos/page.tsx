'use client';

import { useState } from 'react';
import ReservaEspacio from '@/app/ui/dashboard/prestamos/reserva-espacio';

export default function PrestamosForm() {
  const [formData, setFormData] = useState({
    nombre_docente: '',
    codigo_docente: '',
    correo_docente: '',
    nombre_actividad: '',
    encargado_actividad: '',
    numero_asistentes: '',
    personas_externas: false,
    foto_carne: '',
    mensaje: '',
    // Nuevos campos para reserva de espacios
    espacio_id: null as number | null,
    espacio_nombre: '',
    fecha_reserva: '',
    hora_inicio: '',
    hora_fin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        // For file inputs, we'll store the file name for now
        // In a real app, you would handle file upload differently
        setFormData(prev => ({ ...prev, [name]: fileInput.files![0].name }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validar si se seleccionó un espacio y horario
      if (formData.espacio_id) {
        // Primero verificar disponibilidad final
        const disponibilidadResponse = await fetch('/api/calendario/disponibilidad', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            espacioId: formData.espacio_id,
            fechaReserva: formData.fecha_reserva,
            horaInicio: formData.hora_inicio,
            horaFin: formData.hora_fin
          }),
        });
        
        const disponibilidadResult = await disponibilidadResponse.json();
        
        if (!disponibilidadResponse.ok || !disponibilidadResult.available) {
          throw new Error('El espacio ya no está disponible en el horario seleccionado');
        }
      }
      
      // Enviar los datos a nuestra API
      const response = await fetch('/api/prestamos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el formulario');
      }
      
      // Mostrar mensaje de éxito
      alert('Préstamo registrado con éxito!');
      
      // Opcional: redireccionar después del envío
      // router.push('/dashboard');
      
      // Resetear el formulario
      setFormData({
        nombre_docente: '',
        codigo_docente: '',
        correo_docente: '',
        nombre_actividad: '',
        encargado_actividad: '',
        numero_asistentes: '',
        personas_externas: false,
        foto_carne: '',
        mensaje: '',
        espacio_id: null,
        espacio_nombre: '',
        fecha_reserva: '',
        hora_inicio: '',
        hora_fin: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Hubo un error al enviar el formulario. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReservaChange = (reserva: {
    espacioId: number;
    espacioNombre: string;
    fechaReserva: string;
    horaInicio: string;
    horaFin: string;
  } | null) => {
    if (reserva) {
      setFormData(prev => ({
        ...prev,
        espacio_id: reserva.espacioId as number,
        espacio_nombre: reserva.espacioNombre,
        fecha_reserva: reserva.fechaReserva,
        hora_inicio: reserva.horaInicio,
        hora_fin: reserva.horaFin
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        espacio_id: null,
        espacio_nombre: '',
        fecha_reserva: '',
        hora_inicio: '',
        hora_fin: ''
      }));
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-secondaries_red-700 to-secondaries_red-900 px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-white">Formulario de Préstamos</h1>
            <p className="mt-2 text-center text-blue-100">Complete el formulario para solicitar un préstamo de espacio</p>
          </div>
          
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre Docente */}
                <div className="space-y-2">
                  <label htmlFor="nombre_docente" className="block text-sm font-medium text-gray-700">
                    Nombre del Docente *
                  </label>
                  <input
                    type="text"
                    id="nombre_docente"
                    name="nombre_docente"
                    value={formData.nombre_docente}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                    placeholder="Ingrese su nombre completo"
                  />
                </div>
                
                {/* Código Docente */}
                <div className="space-y-2">
                  <label htmlFor="codigo_docente" className="block text-sm font-medium text-gray-700">
                    Código del Docente *
                  </label>
                  <input
                    type="number"
                    id="codigo_docente"
                    name="codigo_docente"
                    value={formData.codigo_docente}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                    placeholder="Ingrese su código"
                  />
                </div>
                
                {/* Correo Docente */}
                <div className="space-y-2">
                  <label htmlFor="correo_docente" className="block text-sm font-medium text-gray-700">
                    Correo del Docente *
                  </label>
                  <input
                    type="email"
                    id="correo_docente"
                    name="correo_docente"
                    value={formData.correo_docente}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                
                {/* Nombre Actividad */}
                <div className="space-y-2">
                  <label htmlFor="nombre_actividad" className="block text-sm font-medium text-gray-700">
                    Nombre de la Actividad *
                  </label>
                  <input
                    type="text"
                    id="nombre_actividad"
                    name="nombre_actividad"
                    value={formData.nombre_actividad}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                    placeholder="Nombre de la actividad"
                  />
                </div>
                
                {/* Encargado Actividad */}
                <div className="space-y-2">
                  <label htmlFor="encargado_actividad" className="block text-sm font-medium text-gray-700">
                    Encargado de la Actividad *
                  </label>
                  <input
                    type="text"
                    id="encargado_actividad"
                    name="encargado_actividad"
                    value={formData.encargado_actividad}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                    placeholder="Nombre del encargado"
                  />
                </div>
                
                {/* Número Asistentes */}
                <div className="space-y-2">
                  <label htmlFor="numero_asistentes" className="block text-sm font-medium text-gray-700">
                    Número de Asistentes *
                  </label>
                  <input
                    type="number"
                    id="numero_asistentes"
                    name="numero_asistentes"
                    value={formData.numero_asistentes}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                    placeholder="Cantidad de asistentes"
                  />
                </div>
              </div>
              
              {/* Personas Externas (Checkbox) */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="personas_externas"
                  name="personas_externas"
                  checked={formData.personas_externas}
                  onChange={handleChange}
                  className="h-5 w-5 text-secondaries_red-700 focus:ring-secondaries_red-700 border-gray-300 rounded transition duration-200"
                />
                <label htmlFor="personas_externas" className="ml-3 block text-sm font-medium text-gray-700">
                  ¿Incluye personas externas?
                </label>
              </div>
              
              {/* Foto Carné */}
              <div className="space-y-2">
                <label htmlFor="foto_carne" className="block text-sm font-medium text-gray-700">
                  Foto del Carné *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-secondaries_red-700 transition duration-200">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="foto_carne" className="relative cursor-pointer bg-white rounded-md font-medium text-secondaries_red-700 hover:text-secondaries_red-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-secondaries_red-700">
                        <span>Subir archivo</span>
                        <input
                          type="file"
                          id="foto_carne"
                          name="foto_carne"
                          onChange={handleChange}
                          accept="image/*"
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
              </div>
              
              {/* Mensaje */}
              <div className="space-y-2">
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaries_red-700 focus:border-transparent transition duration-200"
                  placeholder="Escriba su mensaje aquí..."
                />
              </div>
              
              {/* Componente de Reserva de Espacio */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Reserva de Espacio</h2>
                <ReservaEspacio onReservaChange={handleReservaChange} />
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-secondaries_red-700 to-secondaries_red-900 text-white rounded-lg hover:from-secondaries_red-800 hover:to-secondaries_red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaries_red-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition duration-200 hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </div>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
