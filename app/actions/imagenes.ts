'use server';

import { executeQuery } from '../lib/db';
import { ImagenCarrusel } from '../lib/definitions';

export async function getImagenesCarrusel(): Promise<ImagenCarrusel[]> {
  try {
    const data = await executeQuery<ImagenCarrusel[]>(
      'SELECT * FROM imagenes_carrusel WHERE visible = 1 ORDER BY id ASC'
    );
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch imágenes del carrusel.');
  }
} 