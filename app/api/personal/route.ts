import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { executeQuery } from '@/app/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Funcionario extends RowDataPacket {
  id: number;
  nombre: string;
  cargo: string;
  imagen: string;
}

export async function GET() {
  try {
    const result = await executeQuery<Funcionario[]>('SELECT * FROM funcionarios_becl ORDER BY id ASC');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al obtener el personal:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nombre = formData.get('nombre') as string;
    const cargo = formData.get('cargo') as string;
    const imagen = formData.get('imagen') as File;

    // Validación de campos requeridos
    if (!nombre || !cargo || !imagen) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación del tipo de archivo
    if (!imagen.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      );
    }

    // Asegurarse de que el directorio existe
    const uploadDir = path.join(process.cwd(), 'uploads', 'funcionarios');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error al crear directorio:', error);
    }

    // Generar nombre único para la imagen
    const bytes = await imagen.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    const nombreArchivo = `${Date.now()}-${imagen.name}`;
    const rutaArchivo = path.join(uploadDir, nombreArchivo);

    // Guardar la imagen
    await writeFile(rutaArchivo, buffer);

    // Insertar en la base de datos
    const result = await executeQuery<ResultSetHeader>(
      'INSERT INTO funcionarios_becl (nombre, cargo, imagen) VALUES (?, ?, ?)',
      [nombre, cargo, nombreArchivo]
    );

    // Obtener el ID del nuevo registro
    const nuevoId = result.insertId;

    // Obtener el registro recién creado
    const nuevoMiembro = await executeQuery<Funcionario[]>(
      'SELECT * FROM funcionarios_becl WHERE id = ?',
      [nuevoId]
    );

    return NextResponse.json(nuevoMiembro[0], { status: 201 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const nombre = formData.get('nombre') as string;
    const cargo = formData.get('cargo') as string;
    const imagen = formData.get('imagen') as File | null;
    const imagenActual = formData.get('imagenActual') as string;

    // Validación de campos requeridos
    if (!id || !nombre || !cargo) {
      return NextResponse.json(
        { error: 'ID, nombre y cargo son requeridos' },
        { status: 400 }
      );
    }

    let nombreArchivo = imagenActual;

    // Si se proporciona una nueva imagen, procesarla
    if (imagen) {
      // Validación del tipo de archivo
      if (!imagen.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'El archivo debe ser una imagen' },
          { status: 400 }
        );
      }

      // Asegurarse de que el directorio existe
      const uploadDir = path.join(process.cwd(), 'uploads', 'funcionarios');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        console.error('Error al crear directorio:', error);
      }

      // Generar nombre único para la imagen
      const bytes = await imagen.arrayBuffer();
      const buffer = new Uint8Array(bytes);
      nombreArchivo = `${Date.now()}-${imagen.name}`;
      const rutaArchivo = path.join(uploadDir, nombreArchivo);

      // Guardar la nueva imagen
      await writeFile(rutaArchivo, buffer);

      // Eliminar la imagen anterior si existe
      if (imagenActual) {
        const rutaImagenAnterior = path.join(process.cwd(), 'uploads', 'funcionarios', imagenActual);
        try {
          await unlink(rutaImagenAnterior);
        } catch (error) {
          console.error('Error al eliminar imagen anterior:', error);
        }
      }
    }

    // Actualizar en la base de datos
    await executeQuery<ResultSetHeader>(
      'UPDATE funcionarios_becl SET nombre = ?, cargo = ?, imagen = ? WHERE id = ?',
      [nombre, cargo, nombreArchivo, id]
    );

    // Obtener el registro actualizado
    const miembroActualizado = await executeQuery<Funcionario[]>(
      'SELECT * FROM funcionarios_becl WHERE id = ?',
      [id]
    );

    return NextResponse.json(miembroActualizado[0]);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    // Obtener la información de la imagen antes de eliminar
    const [miembro] = await executeQuery<Funcionario[]>(
      'SELECT imagen FROM funcionarios_becl WHERE id = ?',
      [id]
    );

    // Eliminar el registro de la base de datos
    await executeQuery<ResultSetHeader>(
      'DELETE FROM funcionarios_becl WHERE id = ?',
      [id]
    );

    // Eliminar la imagen si existe
    if (miembro && miembro.imagen) {
      const rutaImagen = path.join(process.cwd(), 'uploads', 'funcionarios', miembro.imagen);
      try {
        await unlink(rutaImagen);
      } catch (error) {
        console.error('Error al eliminar imagen:', error);
      }
    }

    return NextResponse.json({ message: 'Miembro eliminado correctamente' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
} 