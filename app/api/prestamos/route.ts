import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'PC_MARCOS',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'nextjs_dashboard',
  port: parseInt(process.env.DB_PORT || '3306')
};

async function executeQuery(query: string, values: unknown[]) {
  const connection = await mysql.createConnection(dbConfig);
  const result = await connection.execute(query, values);
  await connection.end();
  return result;
}

interface InsertResult {
  insertId: number;
}

export async function POST(request: Request) {
  try {
    const req = await request.json();
    
    // Validar campos requeridos
    const requiredFields = ['nombre_docente', 'codigo_docente', 'correo_docente', 'nombre_actividad', 'encargado_actividad', 'numero_asistentes'];
    const missingFields = requiredFields.filter(field => !req[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Verificar si incluye reserva de espacio
    const includeReserva = req.espacio_id && req.fecha_reserva && req.hora_inicio && req.hora_fin;
    
    // Construir la consulta SQL según si incluye reserva o no
    let query = '';
    let values = [];
    
    if (includeReserva) {
      query = `
        INSERT INTO prestamos (
          nombre_docente, 
          codigo_docente, 
          correo_docente, 
          nombre_actividad, 
          encargado_actividad, 
          numero_asistentes, 
          personas_externas, 
          foto_carne, 
          mensaje,
          espacio_id,
          fecha_reserva,
          hora_inicio,
          hora_fin,
          estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      values = [
        req.nombre_docente,
        req.codigo_docente,
        req.correo_docente,
        req.nombre_actividad,
        req.encargado_actividad,
        req.numero_asistentes,
        req.personas_externas ? 1 : 0,
        req.foto_carne || '',
        req.mensaje || '',
        req.espacio_id,
        req.fecha_reserva,
        req.hora_inicio,
        req.hora_fin,
        'pendiente' // Estado pendiente por defecto
      ];
    } else {
      query = `
        INSERT INTO prestamos (
          nombre_docente, 
          codigo_docente, 
          correo_docente, 
          nombre_actividad, 
          encargado_actividad, 
          numero_asistentes, 
          personas_externas, 
          foto_carne, 
          mensaje,
          estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      values = [
        req.nombre_docente,
        req.codigo_docente,
        req.correo_docente,
        req.nombre_actividad,
        req.encargado_actividad,
        req.numero_asistentes,
        req.personas_externas ? 1 : 0,
        req.foto_carne || '',
        req.mensaje || '',
        'pendiente' // Estado pendiente por defecto
      ];
    }
    
    const result = await executeQuery(query, values);
    // El resultado es un array donde el primer elemento contiene información sobre la consulta
    const queryResult = result[0] as InsertResult;
    const prestamoId = queryResult.insertId;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Préstamo registrado correctamente',
      id: prestamoId,
      includeReserva
    });
  } catch (error) {
    console.error('Error al registrar el préstamo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
