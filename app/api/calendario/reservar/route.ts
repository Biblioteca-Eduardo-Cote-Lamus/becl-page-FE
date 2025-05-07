import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/db';
import { createCalendarEvent } from '@/app/lib/googleCalendar';

// POST /api/calendario/reservar - Reservar un espacio y crear evento en calendario
export async function POST(request: Request) {
  try {
    const req = await request.json();
    
    // Validar campos requeridos
    const requiredFields = [
      'prestamoId', 'espacioId', 'espacioNombre', 'fechaReserva', 
      'horaInicio', 'horaFin', 'nombreActividad', 'nombreDocente', 'correoDocente'
    ];
    const missingFields = requiredFields.filter(field => !req[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Crear evento en Google Calendar
    const calendarResult = await createCalendarEvent(
      req.espacioId,
      req.espacioNombre,
      req.fechaReserva,
      req.horaInicio,
      req.horaFin,
      req.nombreActividad,
      req.nombreDocente,
      req.correoDocente
    );
    
    if (!calendarResult.success) {
      return NextResponse.json(
        { error: 'Error al crear evento en el calendario' },
        { status: 500 }
      );
    }
    
    // Actualizar el préstamo con la información de la reserva
    const query = `
      UPDATE prestamos 
      SET 
        espacio_id = ?, 
        fecha_reserva = ?, 
        hora_inicio = ?, 
        hora_fin = ?, 
        evento_calendar_id = ?
      WHERE id = ?
    `;
    
    const values = [
      req.espacioId,
      req.fechaReserva,
      req.horaInicio,
      req.horaFin,
      calendarResult.eventId,
      req.prestamoId
    ];
    
    await executeQuery(query, values);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Espacio reservado correctamente',
      eventId: calendarResult.eventId,
      calendarLink: calendarResult.htmlLink
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al reservar el espacio' },
      { status: 500 }
    );
  }
}
