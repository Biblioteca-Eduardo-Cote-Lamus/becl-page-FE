import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/db';
import { Espacio } from '@/app/lib/definitions';

// GET /api/espacios - Obtener todos los espacios disponibles
export async function GET() {
  try {
    // Consultar espacios disponibles en la base de datos
    const data = await executeQuery('SELECT * FROM espacios WHERE disponible = 1');
    
    return NextResponse.json(data as Espacio[]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener espacios disponibles' },
      { status: 500 }
    );
  }
}

// POST /api/espacios - Crear un nuevo espacio
export async function POST(request: Request) {
  try {
    const req = await request.json();
    
    // Validar campos requeridos
    const requiredFields = ['nombre', 'capacidad'];
    const missingFields = requiredFields.filter(field => !req[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Insertar nuevo espacio en la base de datos
    const query = `
      INSERT INTO espacios (nombre, capacidad, descripcion, disponible)
      VALUES (?, ?, ?, ?)
    `;
    
    const values = [
      req.nombre,
      req.capacidad,
      req.descripcion || '',
      req.disponible !== undefined ? req.disponible : true
    ];
    
    const result = await executeQuery(query, values);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Espacio creado correctamente',
      id: (result as Record<string, unknown>).insertId
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al crear el espacio' },
      { status: 500 }
    );
  }
}
