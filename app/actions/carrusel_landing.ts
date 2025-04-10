'use server';

import { executeQuery } from '../lib/db';
import { ImagenLanding } from '../lib/definitions';

export async function getCarruselLanding(): Promise<ImagenLanding[]> {
  try {
    const data = await executeQuery<ImagenLanding[]>(
      'SELECT * FROM carrusel_landing ORDER BY id ASC'
    );
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch imágenes del carrusel.');
  }
} 