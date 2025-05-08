'use client';

import { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Espacio } from '@/app/lib/definitions';
import { EventApi } from '@fullcalendar/core';

interface CalendarioReservasProps {
  espacioId: number | null;
  fechaSeleccionada: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (start: string, end: string) => void;
}

interface EventoFullCalendar {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  extendedProps?: Record<string, unknown>;
  classNames?: string;
}

export default function CalendarioReservas({ 
  espacioId, 
  fechaSeleccionada, 
  onDateSelect, 
  onTimeSelect 
}: CalendarioReservasProps) {
  const [eventos, setEventos] = useState<EventoFullCalendar[]>([]);
  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<Espacio | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Cargar espacios disponibles
  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const response = await fetch('/api/espacios');
        if (!response.ok) {
          throw new Error('Error al cargar espacios');
        }
        const data = await response.json();
        setEspacios(data);
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudieron cargar los espacios disponibles');
      }
    };

    fetchEspacios();
  }, []);

  // Actualizar espacio seleccionado cuando cambia el espacioId
  useEffect(() => {
    if (espacioId && espacios.length > 0) {
      const espacio = espacios.find(e => e.id === espacioId);
      setEspacioSeleccionado(espacio || null);
    } else {
      setEspacioSeleccionado(null);
    }
  }, [espacioId, espacios]);

  // Generar eventos disponibles para demostración
  const generarEventosDisponibles = useCallback(() => {
    if (!fechaSeleccionada) return;
    const eventosDisponibles: EventoFullCalendar[] = [];
    const horaInicio = 8; // 8:00 AM
    const horaFin = 18; // 6:00 PM
    for (let hora = horaInicio; hora < horaFin; hora++) {
      const horaFormateada = hora.toString().padStart(2, '0');
      const siguienteHora = (hora + 1).toString().padStart(2, '0');
      eventosDisponibles.push({
        id: `disponible-${hora}`,
        title: 'Disponible',
        start: `${fechaSeleccionada}T${horaFormateada}:00:00`,
        end: `${fechaSeleccionada}T${siguienteHora}:00:00`,
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
      });
    }
    setEventos(eventosDisponibles);
  }, [fechaSeleccionada]);

  // Cargar eventos cuando cambia el espacio o la fecha
  useEffect(() => {
    if (!fechaSeleccionada) return;
    if (!espacioId) return;
    const fetchEventos = async () => {
      setCargando(true);
      setError('');
      
      try {
        // Obtener eventos existentes para este espacio y fecha
        const fechaInicio = new Date(fechaSeleccionada);
        fechaInicio.setHours(0, 0, 0, 0);
        
        const fechaFin = new Date(fechaSeleccionada);
        fechaFin.setHours(23, 59, 59, 999);
        
        // Simular eventos existentes (en producción, esto vendría de la API)
        // Aquí deberías hacer una llamada a tu API para obtener los eventos reales
        const response = await fetch(`/api/calendario/eventos?espacioId=${espacioId}&fecha=${fechaSeleccionada}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar eventos');
        }
        
        const data = await response.json();
        console.log('Eventos recibidos del servidor:', data.length);
        
        // Verificar si hay eventos reservados
        const eventosReservados = data.filter((evento: EventoFullCalendar) => evento.extendedProps?.tipo === 'reservado');
        console.log(`Eventos reservados: ${eventosReservados.length}`);
        if (eventosReservados.length > 0) {
          console.log('Detalles de eventos reservados:', eventosReservados);
        }
        
        // Convertir los eventos al formato de FullCalendar
        const eventosFormateados = data.map((evento: EventoFullCalendar) => ({
          id: evento.id,
          title: evento.extendedProps?.tipo === 'disponible' ? 'Disponible' : `${evento.title} (Reservado)`,
          start: evento.start,
          end: evento.end,
          backgroundColor: evento.extendedProps?.tipo === 'disponible' ? '#4CAF50' : '#b92d37', // Verde para disponible, Rojo para reservado
          borderColor: evento.extendedProps?.tipo === 'disponible' ? '#4CAF50' : '#b92d37',
          textColor: evento.extendedProps?.tipo === 'disponible' ? 'white' : 'white',
          extendedProps: evento.extendedProps,
          classNames: evento.extendedProps?.tipo === 'disponible' ? 'evento-disponible' : 'evento-reservado'
        }));
        
        setEventos(eventosFormateados);
      } catch (error) {
        console.error('Error:', error);
        // Si hay un error, usamos eventos de ejemplo para demostración
        // En producción, deberías manejar el error de manera adecuada
        generarEventosDisponibles();
      } finally {
        setCargando(false);
      }
    };
    
    fetchEventos();
  }, [espacioId, fechaSeleccionada, generarEventosDisponibles]);

  // Manejar clic en un evento (selección de horario)
  const handleEventClick = (info: { event: EventApi }) => {
    const evento = info.event;
    const inicio = evento.start ? new Date(evento.start) : new Date();
    const fin = evento.end ? new Date(evento.end) : new Date();
    
    // Extraer solo la hora en formato HH:MM
    const horaInicio = `${inicio.getHours().toString().padStart(2, '0')}:${inicio.getMinutes().toString().padStart(2, '0')}`;
    const horaFin = `${fin.getHours().toString().padStart(2, '0')}:${fin.getMinutes().toString().padStart(2, '0')}`;
    
    onTimeSelect(horaInicio, horaFin);
  };

  // Manejar clic en una fecha
  const handleDateClick = (info: { dateStr: string }) => {
    const fecha = info.dateStr.split('T')[0];
    onDateSelect(fecha);
  };

  // Renderizar el contenido del evento con tooltip
  function renderEventContent(eventInfo: { event: EventApi }) {
    return (
      <div title={eventInfo.event.title} style={{ width: '100%' }}>
        <span className="fc-event-title">{eventInfo.event.title}</span>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">
        {espacioSeleccionado 
          ? `Horarios disponibles para ${espacioSeleccionado.nombre}` 
          : 'Selecciona un espacio para ver los horarios disponibles'}
      </h3>
      {!fechaSeleccionada ? (
        <div className="text-center py-4 text-gray-500">
          Selecciona una fecha para ver los horarios disponibles.
        </div>
      ) : (
        <>
          {cargando && (
            <div className="text-center py-4">
              <p className="text-gray-500">Cargando horarios disponibles...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {espacioSeleccionado && (
            <div className="bg-white rounded-lg shadow overflow-x-auto" style={{ minHeight: 700 }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale="es"
                height="auto"
                allDaySlot={false}
                slotMinTime="06:00:00"
                slotMaxTime="22:00:00"
                events={eventos}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                initialDate={fechaSeleccionada || undefined}
                slotDuration="01:00:00"
                slotLabelFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }}
                eventContent={renderEventContent}
                dayMaxEventRows={10}
                dayMaxEvents={10}
                eventMaxStack={10}
                eventOrderStrict={true}
                eventOrder="start"
                slotEventOverlap={false}
                eventOverlap={false}
                contentHeight={700}
              />
              <style jsx global>{`
                .fc .fc-timegrid-slot {
                  min-height: 48px !important;
                  height: 48px !important;
                }
                .fc-event {
                  font-size: 0.85rem !important;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  padding: 2px 4px;
                  border-radius: 4px;
                  cursor: pointer;
                  max-width: 100% !important;
                  width: 100% !important;
                  left: 0 !important;
                  right: 0 !important;
                }
                .fc-event-title {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  display: block;
                  width: 100%;
                }
                .fc-timegrid-event-harness {
                  max-height: 44px;
                  overflow-y: auto;
                  width: 100% !important;
                  left: 0 !important;
                  right: 0 !important;
                }
              `}</style>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-600">
            <p>* Haz clic en un horario disponible para seleccionarlo</p>
            <p>* Los horarios en verde están disponibles para reserva</p>
            <p>* Los horarios en azul ya están reservados</p>
          </div>
        </>
      )}
    </div>
  );
}
