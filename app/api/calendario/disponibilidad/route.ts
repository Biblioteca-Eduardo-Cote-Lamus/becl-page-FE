import { NextResponse } from 'next/server';
import { checkAvailability } from '@/app/lib/googleCalendar';
import { executeQuery } from '@/app/lib/db';

// POST /api/calendario/disponibilidad - Verificar disponibilidad de un espacio
export async function POST(request: Request) {
  try {
    const req = await request.json();
    
    // Validar campos requeridos
    const requiredFields = ['espacioId', 'fechaReserva', 'horaInicio', 'horaFin'];
    const missingFields = requiredFields.filter(field => !req[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Primero verificamos en la base de datos si hay reservas que se solapan
    const query = `
      SELECT COUNT(*) as count
      FROM prestamos
      WHERE espacio_id = ?
      AND fecha_reserva = ?
      AND (estado = 'aprobado' OR estado = 'pendiente')
      AND NOT (
        hora_fin <= ? OR  -- La reserva existente termina antes de que empiece la solicitada
        hora_inicio >= ?  -- La reserva existente empieza después de que termine la solicitada
      )
    `;
    
    console.log(`Verificando disponibilidad para espacio ID: ${req.espacioId}, fecha: ${req.fechaReserva}, horario: ${req.horaInicio}-${req.horaFin}`);
    
    const result = await executeQuery(query, [
      req.espacioId,
      req.fechaReserva,
      req.horaInicio,  // La reserva existente termina antes de que empiece la solicitada
      req.horaFin      // La reserva existente empieza después de que termine la solicitada
    ]);
    
    console.log('Resultado de la consulta:', JSON.stringify(result, null, 2));
    
    // Acceder correctamente al resultado del contador
    const rows = (result as [any, any])[0];
    const reservasCount = rows && rows.length > 0 ? rows[0].count : 0;
    console.log(`Se encontraron ${reservasCount} reservas que se solapan en la base de datos`);
    
    // Si hay reservas que se solapan, el espacio no está disponible
    if (reservasCount > 0) {
      return NextResponse.json({
        available: false,
        events: [],
        source: 'database'
      });
    }
    
    // Si no hay reservas en la base de datos, verificamos en Google Calendar como respaldo
    const availability = await checkAvailability(
      req.espacioId,
      req.fechaReserva,
      req.horaInicio,
      req.horaFin
    );
    
    // Añadimos la fuente de la verificación
    return NextResponse.json({
      ...availability,
      source: 'googleCalendar'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al verificar disponibilidad' },
      { status: 500 }
    );
  }
}
