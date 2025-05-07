import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/db';
import { checkAvailability } from '@/app/lib/googleCalendar';

interface ReservaDB {
  id: number;
  nombre_actividad: string;
  nombre_docente: string;
  fecha_reserva: string;
  hora_inicio: string;
  hora_fin: string;
  espacio_id?: number;
  espacio_nombre?: string;
}

// Definir un tipo mínimo para los eventos de Google Calendar
interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

// Modificar la definición de eventos para que 'reservaId' sea opcional y nunca requerida
interface EventoFullCalendar {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  extendedProps?: {
    tipo: string;
    prestamoId?: number;
    hora_inicio?: string;
    hora_fin?: string;
    reservaId?: number | string;
    source?: string;
  };
}

// GET /api/calendario/eventos - Obtener eventos para un espacio y fecha específicos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const espacioId = searchParams.get('espacioId');
    const fecha = searchParams.get('fecha');
    
    if (!espacioId || !fecha) {
      return NextResponse.json(
        { error: 'Se requieren los parámetros espacioId y fecha' },
        { status: 400 }
      );
    }
    
    // Obtener reservas existentes para este espacio y fecha desde la base de datos
    const query = `
      SELECT p.*, e.nombre as espacio_nombre
      FROM prestamos p
      JOIN espacios e ON p.espacio_id = e.id
      WHERE p.espacio_id = ? 
      AND p.fecha_reserva = ?
      AND (p.estado = 'aprobado' OR p.estado = 'pendiente')
    `;
    
    console.log(`Buscando reservas para espacio ID: ${espacioId} en fecha: ${fecha}`);
    
    const result = await executeQuery(query, [espacioId, fecha]);
    const reservas = (result as [ReservaDB[], unknown])[0];
    
    console.log(`Se encontraron ${Array.isArray(reservas) ? reservas.length : 0} reservas en la base de datos`);
    if (Array.isArray(reservas) && reservas.length > 0) {
      console.log('Detalles de las reservas encontradas:', JSON.stringify(reservas, null, 2));
    }
    
    // Convertir las reservas a eventos para el calendario
    const eventos = Array.isArray(reservas) ? reservas.map((reserva: ReservaDB) => ({
      id: `reserva-${reserva.id}`,
      title: `${reserva.nombre_actividad} - ${reserva.nombre_docente}`,
      start: `${reserva.fecha_reserva}T${reserva.hora_inicio}:00`,
      end: `${reserva.fecha_reserva}T${reserva.hora_fin}:00`,
      backgroundColor: '#3788d8', // Azul para reservado
      borderColor: '#3788d8',
      textColor: 'white',
      extendedProps: {
        tipo: 'reservado',
        prestamoId: reserva.id
      }
    })) : [];
    
    // Ahora vamos a obtener directamente de la base de datos todas las reservas para este espacio y fecha
    // incluyendo las horas exactas
    const queryReservas = `
      SELECT id, hora_inicio, hora_fin, nombre_actividad, nombre_docente
      FROM prestamos
      WHERE espacio_id = ? 
      AND fecha_reserva = ?
      AND (estado = 'aprobado' OR estado = 'pendiente')
    `;
    
    console.log(`Consultando reservas directamente de la base de datos para espacio ID: ${espacioId} en fecha: ${fecha}`);
    
    const resultReservas = await executeQuery(queryReservas, [espacioId, fecha]);
    const reservasDirectas = (resultReservas as [ReservaDB[], unknown])[0];
    
    console.log(`Se encontraron ${Array.isArray(reservasDirectas) ? reservasDirectas.length : 0} reservas directas en la base de datos`);
    if (Array.isArray(reservasDirectas) && reservasDirectas.length > 0) {
      console.log('Reservas encontradas:', JSON.stringify(reservasDirectas, null, 2));
    }
    
    // Crear mapa de horas ocupadas basado en las reservas directas
    const horasOcupadas = new Map();
    
    if (Array.isArray(reservasDirectas)) {
      reservasDirectas.forEach((reserva: ReservaDB) => {
        // Convertir horas de inicio y fin a números (formato: "08:00" -> 8)
        const horaInicio = parseInt(reserva.hora_inicio.split(':')[0]);
        const horaFin = parseInt(reserva.hora_fin.split(':')[0]);
        
        console.log(`Reserva ID ${reserva.id}: ${horaInicio}:00 - ${horaFin}:00`);
        
        // Marcar todas las horas entre inicio y fin como ocupadas
        for (let hora = horaInicio; hora < horaFin; hora++) {
          horasOcupadas.set(hora, {
            id: reserva.id,
            actividad: reserva.nombre_actividad,
            docente: reserva.nombre_docente
          });
        }
      });
    }
    
    // Generar eventos para cada hora (6:00 AM - 10:00 PM)
    const eventosDisponibles: EventoFullCalendar[] = [];
    const inicioJornada = 6; // 6:00 AM
    const finJornada = 22;   // 10:00 PM
    
    // Crear bloques de 1 hora disponibles o reservados
    for (let hora = inicioJornada; hora < finJornada; hora++) {
      const horaFormateada = hora.toString().padStart(2, '0');
      const siguienteHora = (hora + 1).toString().padStart(2, '0');
      
      // Verificar si la hora está ocupada
      const infoReserva = horasOcupadas.get(hora);
      
      if (infoReserva) {
        // Si la hora está ocupada, mostrarla como reservada
        eventosDisponibles.push({
          id: `ocupado-${hora}-${infoReserva.id}`,
          title: `Reservado: ${infoReserva.actividad}`,
          start: `${fecha}T${horaFormateada}:00:00`,
          end: `${fecha}T${siguienteHora}:00:00`,
          backgroundColor: '#3788d8', // Azul para reservado
          borderColor: '#3788d8',
          textColor: 'white',
          extendedProps: {
            tipo: 'reservado',
            hora_inicio: `${horaFormateada}:00`,
            hora_fin: `${siguienteHora}:00`,
            ...(infoReserva.id ? { reservaId: infoReserva.id } : {})
          }
        });
      } else {
        // Si la hora no está ocupada, añadirla como disponible
        eventosDisponibles.push({
          id: `disponible-${hora}`,
          title: 'Disponible',
          start: `${fecha}T${horaFormateada}:00:00`,
          end: `${fecha}T${siguienteHora}:00:00`,
          backgroundColor: '#4CAF50', // Verde para disponible
          borderColor: '#4CAF50',
          extendedProps: {
            tipo: 'disponible',
            hora_inicio: `${horaFormateada}:00`,
            hora_fin: `${siguienteHora}:00`
          }
        });
      }
    }
    
    // Combinar eventos reservados y disponibles
    const todosEventos: EventoFullCalendar[] = [...eventos, ...eventosDisponibles];

    // Consultar también Google Calendar
    try {
      const eventosGoogle = await checkAvailability(
        Number(espacioId),
        fecha,
        '06:00',
        '22:00'
      );

      if (!eventosGoogle.available && eventosGoogle.events) {
        // Convertir eventos de Google Calendar al formato que espera el frontend
        const eventosGoogleFormateados = (eventosGoogle.events as GoogleCalendarEvent[]).map((evento) => ({
          id: `google-${evento.id}`,
          title: String(evento.summary),
          start: String(evento.start.dateTime),
          end: String(evento.end.dateTime),
          backgroundColor: '#3788d8', // Azul para reservado
          borderColor: '#3788d8',
          textColor: 'white',
          extendedProps: {
            tipo: 'reservado',
            hora_inicio: String(evento.start.dateTime).split('T')[1].substring(0, 5),
            hora_fin: String(evento.end.dateTime).split('T')[1].substring(0, 5),
            source: 'google'
          }
        }));

        // Combinar con los eventos existentes
        todosEventos.push(...eventosGoogleFormateados);
      }
    } catch (error) {
      console.error('Error al consultar Google Calendar:', error);
    }

    return NextResponse.json(todosEventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return NextResponse.json(
      { error: 'Error al obtener eventos del calendario' },
      { status: 500 }
    );
  }
}
