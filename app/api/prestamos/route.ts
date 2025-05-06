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

export async function POST(request: Request) {
  try {
    // Obtener los datos del formulario
    const data = await request.json();
    
    // Validar que todos los campos requeridos estén presentes
    const requiredFields = [
      'nombre_docente', 
      'codigo_docente', 
      'correo_docente', 
      'nombre_actividad', 
      'encargado_actividad', 
      'numero_asistentes',
      'foto_carne',
      'mensaje'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        );
      }
    }
    
    // Conectar a la base de datos
    const connection = await mysql.createConnection(dbConfig);
    
    // Insertar los datos en la tabla prestamos
    await connection.execute(
      `INSERT INTO prestamos (
        nombre_docente, 
        codigo_docente, 
        correo_docente, 
        nombre_actividad, 
        encargado_actividad, 
        numero_asistentes, 
        personas_externas, 
        foto_carne,
        mensaje
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`,
      [
        data.nombre_docente,
        data.codigo_docente,
        data.correo_docente,
        data.nombre_actividad,
        data.encargado_actividad,
        data.numero_asistentes,
        data.personas_externas ? 1 : 0,
        data.foto_carne,
        data.mensaje
      ]
    );
    
    // Cerrar la conexión
    await connection.end();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Préstamo registrado exitosamente' 
    });
  } catch (error) {
    console.error('Error al registrar el préstamo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
