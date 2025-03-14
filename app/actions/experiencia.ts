'use server';

import { executeQuery } from '../lib/db';

export interface Experiencia {
  id: number;
  titulo: string;
  descripcion: string;
  imagen?: string;
  orden: number;
}

export async function getExperiencia(): Promise<Experiencia[]> {
  try {
    const data = await executeQuery<Experiencia[]>('SELECT * FROM experiencia ORDER BY orden ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch experiencia.');
  }
} 