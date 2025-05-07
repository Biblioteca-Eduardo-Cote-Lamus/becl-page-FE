'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Espacio } from '@/app/lib/definitions';
import CalendarioReservas from './calendario-reservas';

// Definir tipo para los eventos reservados
interface EventoReservado {
  title: string;
  extendedProps: {
    tipo: string;
    hora_inicio: string;
    hora_fin: string;
    source?: string;
  };
}

interface ReservaEspacioProps {
  onReservaChange: (reserva: {
    espacioId: number;
    espacioNombre: string;
    fechaReserva: string;
    horaInicio: string;
    horaFin: string;
  } | null) => void;
}

export default function ReservaEspacio({ onReservaChange }: ReservaEspacioProps) {
  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<number | ''>('');
  const [fechaReserva, setFechaReserva] = useState<string>('');
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [horaFin, setHoraFin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [disponibilidad, setDisponibilidad] = useState<boolean | null>(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState<{inicio: string, fin: string}[]>([]);
  // Estado para almacenar los horarios ocupados
  const [horariosOcupados, setHorariosOcupados] = useState<{[key: string]: boolean}>({});
  const lastReserva = useRef<string | null>(null);

  // Mueve las declaraciones de useCallback antes de los useEffect que las usan
  const cargarHorariosOcupados = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/calendario/eventos?espacioId=${espacioSeleccionado}&fecha=${fechaReserva}`);
      if (!response.ok) {
        throw new Error('Error al cargar eventos');
      }
      const data = await response.json();
      const ocupados: {[key: string]: boolean} = {};
      const eventosReservados = data.filter((evento: EventoReservado) => evento.extendedProps?.tipo === 'reservado');
      console.log('Eventos reservados encontrados:', eventosReservados.length);
      eventosReservados.forEach((evento: EventoReservado) => {
        const horaInicio = evento.extendedProps.hora_inicio;
        const horaFin = evento.extendedProps.hora_fin;
        const horaInicioNum = parseInt(horaInicio.split(':')[0]);
        const horaFinNum = parseInt(horaFin.split(':')[0]);
        console.log(`Evento reservado: ${evento.title} de ${horaInicio} a ${horaFin} (fuente: ${evento.extendedProps.source || 'database'})`);
        for (let hora = horaInicioNum; hora < horaFinNum; hora++) {
          const horaStr = hora.toString().padStart(2, '0') + ':00';
          ocupados[horaStr] = true;
          console.log(`Marcando hora ocupada: ${horaStr}`);
        }
      });
      setHorariosOcupados(ocupados);
      console.log('Mapa de horarios ocupados:', ocupados);
      if (horaInicio && horaFin) {
        const horaInicioNum = parseInt(horaInicio.split(':')[0]);
        const horaFinNum = parseInt(horaFin.split(':')[0]);
        let conflicto = false;
        for (let h = horaInicioNum; h < horaFinNum; h++) {
          const horaStr = h.toString().padStart(2, '0') + ':00';
          if (ocupados[horaStr]) {
            conflicto = true;
            break;
          }
        }
        if (conflicto) {
          setError('El horario seleccionado tiene conflicto con reservas existentes');
          setDisponibilidad(false);
        }
      }
    } catch (error) {
      console.error('Error al cargar horarios ocupados:', error);
      setError('Error al cargar la disponibilidad de horarios');
    } finally {
      setLoading(false);
    }
  }, [espacioSeleccionado, fechaReserva, horaInicio, horaFin]);

  const verificarDisponibilidad = useCallback(async () => {
    if (!espacioSeleccionado || !fechaReserva || !horaInicio || !horaFin) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const horaInicioNum = parseInt(horaInicio);
      const horaFinNum = parseInt(horaFin);
      let conflictoLocal = false;
      for (let h = horaInicioNum; h < horaFinNum; h++) {
        const horaStr = h.toString().padStart(2, '0') + ':00';
        if (horariosOcupados[horaStr]) {
          conflictoLocal = true;
          break;
        }
      }
      if (conflictoLocal) {
        console.log('Conflicto detectado localmente con horarios ocupados');
        setDisponibilidad(false);
        setError('El espacio ya está reservado en el horario seleccionado');
        return;
      }
      const response = await fetch('/api/calendario/disponibilidad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          espacioId: Number(espacioSeleccionado),
          fechaReserva,
          horaInicio,
          horaFin
        }),
      });
      if (!response.ok) {
        throw new Error('Error al verificar disponibilidad');
      }
      const data = await response.json();
      console.log('Respuesta de disponibilidad de la API:', data);
      setDisponibilidad(data.available);
      if (!data.available) {
        setError('El espacio no está disponible en el horario seleccionado');
        await cargarHorariosOcupados();
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al verificar disponibilidad');
      setDisponibilidad(null);
    } finally {
      setLoading(false);
    }
  }, [espacioSeleccionado, fechaReserva, horaInicio, horaFin, horariosOcupados, cargarHorariosOcupados]);

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

  // Generar horarios disponibles (8:00 AM - 6:00 PM, intervalos de 1 hora)
  useEffect(() => {
    const horarios = [];
    for (let hora = 6; hora < 22; hora++) {
      const horaFormateada = hora.toString().padStart(2, '0') + ':00';
      const horaFinFormateada = (hora + 1).toString().padStart(2, '0') + ':00';
      horarios.push({ inicio: horaFormateada, fin: horaFinFormateada });
    }
    setHorariosDisponibles(horarios);
  }, []);

  // useEffect para cargar horarios ocupados solo cuando cambian espacio o fecha
  useEffect(() => {
    if (espacioSeleccionado && fechaReserva) {
      cargarHorariosOcupados();
    } else {
      setHorariosOcupados({});
    }
  }, [espacioSeleccionado, fechaReserva, cargarHorariosOcupados]);

  // useEffect para verificar disponibilidad solo cuando todos los campos están completos o cambian los horarios ocupados
  useEffect(() => {
    if (espacioSeleccionado && fechaReserva && horaInicio && horaFin) {
      verificarDisponibilidad();
    } else {
      setDisponibilidad(null);
    }
  }, [espacioSeleccionado, fechaReserva, horaInicio, horaFin, horariosOcupados, verificarDisponibilidad]);

  // Obtener fecha mínima (hoy)
  const fechaMinima = new Date().toISOString().split('T')[0];

  // Notificar al padre cuando los datos estén completos
  useEffect(() => {
    if (espacioSeleccionado && fechaReserva && horaInicio && horaFin) {
      const espacioNombre = espacios.find(e => e.id === Number(espacioSeleccionado))?.nombre || '';
      const reservaStr = JSON.stringify({
        espacioId: Number(espacioSeleccionado),
        espacioNombre,
        fechaReserva,
        horaInicio,
        horaFin
      });
      if (lastReserva.current !== reservaStr) {
        lastReserva.current = reservaStr;
        onReservaChange({
          espacioId: Number(espacioSeleccionado),
          espacioNombre,
          fechaReserva,
          horaInicio,
          horaFin
        });
      }
    } else {
      if (lastReserva.current !== null) {
        lastReserva.current = null;
        onReservaChange(null);
      }
    }
  }, [espacioSeleccionado, fechaReserva, horaInicio, horaFin, espacios, onReservaChange]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium">Reserva de Espacio</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selección de espacio */}
        <div>
          <label htmlFor="espacio" className="block text-sm font-medium text-gray-700 mb-1">
            Espacio
          </label>
          <select
            id="espacio"
            value={espacioSeleccionado}
            onChange={(e) => setEspacioSeleccionado(e.target.value ? Number(e.target.value) : '')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar espacio</option>
            {espacios.map((espacio) => (
              <option key={espacio.id} value={espacio.id}>
                {espacio.nombre} (Cap. {espacio.capacidad})
              </option>
            ))}
          </select>
        </div>
        
        {/* Selección de fecha */}
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            value={fechaReserva}
            onChange={(e) => setFechaReserva(e.target.value)}
            min={fechaMinima}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        {/* Selección de hora inicio */}
        <div>
          <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">
            Hora de inicio
          </label>
          <select
            id="horaInicio"
            value={horaInicio}
            onChange={(e) => {
              setHoraInicio(e.target.value);
              // Si se selecciona hora de inicio, sugerir hora de fin (1 hora después)
              if (e.target.value) {
                const indice = horariosDisponibles.findIndex(h => h.inicio === e.target.value);
                if (indice >= 0 && indice < horariosDisponibles.length - 1) {
                  setHoraFin(horariosDisponibles[indice + 1].inicio);
                }
              }
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar hora de inicio</option>
            {horariosDisponibles.map((horario) => (
              <option 
                key={horario.inicio} 
                value={horario.inicio}
                disabled={horariosOcupados[horario.inicio]}
                className={horariosOcupados[horario.inicio] ? 'bg-blue-100 text-blue-800' : ''}
              >
                {horario.inicio} {horariosOcupados[horario.inicio] ? '(Reservado)' : ''}
              </option>
            ))}
          </select>
        </div>
        
        {/* Selección de hora fin */}
        <div>
          <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-1">
            Hora de fin
          </label>
          <select
            id="horaFin"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!horaInicio}
          >
            <option value="">Seleccionar hora de fin</option>
            {horariosDisponibles
              .filter(horario => horario.inicio > horaInicio)
              .map((horario) => {
                // Verificar si hay alguna hora ocupada entre la hora de inicio y esta hora de fin
                let hayHorasOcupadasEntre = false;
                for (let h = parseInt(horaInicio); h < parseInt(horario.inicio); h++) {
                  const horaStr = h.toString().padStart(2, '0') + ':00';
                  if (horariosOcupados[horaStr]) {
                    hayHorasOcupadasEntre = true;
                    break;
                  }
                }
                
                return (
                  <option 
                    key={horario.inicio} 
                    value={horario.inicio}
                    disabled={hayHorasOcupadasEntre || horariosOcupados[horario.inicio]}
                    className={horariosOcupados[horario.inicio] ? 'bg-blue-100 text-blue-800' : ''}
                  >
                    {horario.inicio} {hayHorasOcupadasEntre ? '(Conflicto)' : horariosOcupados[horario.inicio] ? '(Reservado)' : ''}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      
      {/* Leyenda de colores */}
      <div className="mt-4 col-span-1 md:col-span-2 p-3 bg-gray-50 rounded-md">
        <h4 className="font-medium text-gray-700 mb-2">Leyenda de colores:</h4>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2"></div>
            <span className="text-sm">Horario disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span className="text-sm">Horario reservado</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Los horarios en azul ya están reservados y no pueden seleccionarse.</p>
      </div>
      
      {/* Calendario de disponibilidad */}
      <div className="mt-4 col-span-1 md:col-span-2">
        <CalendarioReservas 
          espacioId={espacioSeleccionado ? Number(espacioSeleccionado) : null}
          fechaSeleccionada={fechaReserva}
          onDateSelect={(fecha) => setFechaReserva(fecha)}
          onTimeSelect={(inicio, fin) => {
            setHoraInicio(inicio);
            setHoraFin(fin);
          }}
        />
      </div>
      
      {/* Mostrar estado de disponibilidad */}
      {loading && (
        <div className="mt-2 text-sm text-gray-500">
          Verificando disponibilidad...
        </div>
      )}
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {disponibilidad === true && (
        <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md text-sm">
          ¡Espacio disponible en el horario seleccionado!
        </div>
      )}
      
      {/* Resumen de la reserva */}
      {espacioSeleccionado && fechaReserva && horaInicio && horaFin && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800">Resumen de reserva:</h4>
          <p className="text-sm text-blue-700">
            <strong>Espacio:</strong> {espacios.find(e => e.id === Number(espacioSeleccionado))?.nombre}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Fecha:</strong> {format(new Date(fechaReserva), 'PPPP', { locale: es })}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Horario:</strong> {horaInicio} - {horaFin}
          </p>
        </div>
      )}
    </div>
  );
}
