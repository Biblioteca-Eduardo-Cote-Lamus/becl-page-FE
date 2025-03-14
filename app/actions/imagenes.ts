'use server';

import { executeQuery } from '../lib/db';

export interface ImagenCarrusel {
  id: number;
  url: string;
  titulo?: string;
  descripcion?: string;
  orden: number;
}

export async function getImagenesCarrusel(): Promise<ImagenCarrusel[]> {
  try {
    const data = await executeQuery<ImagenCarrusel[]>('SELECT * FROM imagenes_carrusel ORDER BY orden ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch imágenes del carrusel.');
  }
} 