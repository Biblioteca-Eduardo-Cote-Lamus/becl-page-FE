import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/db';
import { createCalendarEvent, cancelCalendarEvent } from '@/app/lib/googleCalendar';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // Validar que los campos requeridos estén presentes
    if (!data.estado || !['aprobado', 'denegado'].includes(data.estado)) {
      return NextResponse.json(
        { error: 'El estado debe ser "aprobado" o "denegado"' },
        { status: 400 }
      );
    }
    
    // Si el estado es "denegado", se requiere una razón
    if (data.estado === 'denegado' && !data.razon_denegacion) {
      return NextResponse.json(
        { error: 'Se requiere una razón para denegar el préstamo' },
        { status: 400 }
      );
    }
    
    // Obtener la fecha actual
    const fechaRespuesta = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // Primero obtener el préstamo actual para verificar si tiene reserva de espacio
    const prestamoQuery = `SELECT * FROM prestamos WHERE id = ?`;
    const prestamoResult = await executeQuery<Record<string, unknown>[]>(prestamoQuery, [id]);
    
    if (!Array.isArray(prestamoResult) || prestamoResult.length === 0) {
      return NextResponse.json(
        { error: 'Préstamo no encontrado' },
        { status: 404 }
      );
    }
    
    const prestamo = prestamoResult[0];
    const tieneReserva = prestamo.espacio_id && prestamo.fecha_reserva && prestamo.hora_inicio && prestamo.hora_fin;
    
    let query = '';
    let values: (string | number)[] = [];
    
    if (data.estado === 'aprobado') {
      // Validar que existan los datos de reserva antes de crear el evento
      if (!prestamo.espacio_id || !prestamo.fecha_reserva || !prestamo.hora_inicio || !prestamo.hora_fin) {
        return NextResponse.json(
          { error: 'No se puede aprobar una reserva sin datos de espacio y horario.' },
          { status: 400 }
        );
      }
      // Si tiene reserva, crear evento en Google Calendar
      if (tieneReserva) {
        try {
          // Obtener información del espacio
          const espacioQuery = `SELECT * FROM espacios WHERE id = ?`;
          const espacioResult = await executeQuery<Record<string, unknown>[]>(espacioQuery, [prestamo.espacio_id]);
          
          if (!Array.isArray(espacioResult) || espacioResult.length === 0) {
            return NextResponse.json(
              { error: 'Espacio no encontrado' },
              { status: 404 }
            );
          }
          
          const espacio = espacioResult[0];
          
          // Crear evento en Google Calendar
          const calendarResult = await createCalendarEvent(
            Number(prestamo.espacio_id),
            String(espacio.nombre),
            String(prestamo.fecha_reserva),
            String(prestamo.hora_inicio),
            String(prestamo.hora_fin),
            String(prestamo.nombre_actividad),
            String(prestamo.nombre_docente),
            String(prestamo.correo_docente)
          );
          
          // Actualizar el préstamo con el ID del evento
          query = `
            UPDATE prestamos 
            SET estado = ?, fecha_respuesta = ?, respondido_por = ?, evento_calendar_id = ? 
            WHERE id = ?
          `;
          
          values = [
            data.estado,
            fechaRespuesta,
            data.respondido_por || 'Administrador',
            calendarResult.eventId,
            id
          ];
        } catch (error) {
          console.error('Error al crear evento en Google Calendar:', error);
          return NextResponse.json(
            { error: 'Error al crear evento en Google Calendar' },
            { status: 500 }
          );
        }
      } else {
        // Si no tiene reserva, actualizar normalmente
        query = `
          UPDATE prestamos 
          SET estado = ?, fecha_respuesta = ?, respondido_por = ? 
          WHERE id = ?
        `;
        
        values = [
          data.estado,
          fechaRespuesta,
          data.respondido_por || 'Administrador',
          id
        ];
      }
    } else if (data.estado === 'denegado') {
      if (!data.razon_denegacion) {
        return NextResponse.json(
          { error: 'La razón de denegación es requerida' },
          { status: 400 }
        );
      }
      
      // Si tiene reserva y evento creado, cancelar el evento
      if (tieneReserva && prestamo.evento_calendar_id) {
        try {
          await cancelCalendarEvent(String(prestamo.evento_calendar_id));
        } catch (error) {
          console.error('Error al cancelar evento en Google Calendar:', error);
          // Continuamos aunque falle la cancelación
        }
      }
      
      query = `
        UPDATE prestamos 
        SET estado = ?, fecha_respuesta = ?, respondido_por = ?, razon_denegacion = ? 
        WHERE id = ?
      `;
      
      values = [
        data.estado,
        fechaRespuesta,
        data.respondido_por || 'Administrador',
        data.razon_denegacion,
        id
      ];
    } else {
      return NextResponse.json(
        { error: 'Estado no válido' },
        { status: 400 }
      );
    }
    
    // Ejecutar la consulta
    await executeQuery(query, values);
    
    return NextResponse.json({ 
      success: true, 
      message: `Préstamo ${data.estado === 'aprobado' ? 'aprobado' : 'denegado'} exitosamente` 
    });
  } catch (error) {
    console.error('Error al actualizar el préstamo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

// Endpoint para obtener un préstamo específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Obtener el préstamo por ID
    const result = await executeQuery('SELECT * FROM prestamos WHERE id = ?', [id]);
    const rows = (result as [Record<string, unknown>[], unknown])[0];
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: 'Préstamo no encontrado' },
        { status: 404 }
      );
    }
    
    // Convertir personas_externas de 0/1 a boolean
    const prestamo = Array.isArray(rows) && rows.length > 0 
      ? { ...rows[0], personas_externas: Boolean((rows[0] as Record<string, unknown>).personas_externas) } 
      : null;
    
    return NextResponse.json(prestamo);
  } catch (error) {
    console.error('Error al obtener el préstamo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
