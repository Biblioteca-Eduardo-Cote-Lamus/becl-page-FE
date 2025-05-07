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

  // Manejar cambios en la reserva de espacio
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Formulario de Préstamos</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre Docente */}
          <div>
            <label htmlFor="nombre_docente" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Docente *
            </label>
            <input
              type="text"
              id="nombre_docente"
              name="nombre_docente"
              value={formData.nombre_docente}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Código Docente */}
          <div>
            <label htmlFor="codigo_docente" className="block text-sm font-medium text-gray-700 mb-1">
              Código del Docente *
            </label>
            <input
              type="number"
              id="codigo_docente"
              name="codigo_docente"
              value={formData.codigo_docente}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Correo Docente */}
          <div>
            <label htmlFor="correo_docente" className="block text-sm font-medium text-gray-700 mb-1">
              Correo del Docente *
            </label>
            <input
              type="email"
              id="correo_docente"
              name="correo_docente"
              value={formData.correo_docente}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Nombre Actividad */}
          <div>
            <label htmlFor="nombre_actividad" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Actividad *
            </label>
            <input
              type="text"
              id="nombre_actividad"
              name="nombre_actividad"
              value={formData.nombre_actividad}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Encargado Actividad */}
          <div>
            <label htmlFor="encargado_actividad" className="block text-sm font-medium text-gray-700 mb-1">
              Encargado de la Actividad *
            </label>
            <input
              type="text"
              id="encargado_actividad"
              name="encargado_actividad"
              value={formData.encargado_actividad}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Número Asistentes */}
          <div>
            <label htmlFor="numero_asistentes" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Personas Externas (Checkbox) */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="personas_externas"
            name="personas_externas"
            checked={formData.personas_externas}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="personas_externas" className="ml-2 block text-sm text-gray-700">
            ¿Incluye personas externas?
          </label>
        </div>
        
        {/* Foto Carné */}
        <div>
          <label htmlFor="foto_carne" className="block text-sm font-medium text-gray-700 mb-1">
            Foto del Carné *
          </label>
          <input
            type="file"
            id="foto_carne"
            name="foto_carne"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Suba una imagen clara de su carné institucional</p>
        </div>
        
        {/* Mensaje */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Componente de Reserva de Espacio */}
        <div className="col-span-1 md:col-span-2 mt-6">
          <ReservaEspacio onReservaChange={handleReservaChange} />
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}
