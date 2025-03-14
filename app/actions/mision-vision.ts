'use server';

import { executeQuery } from '../lib/db';

export interface MisionVision {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: 'mision' | 'vision';
}

export async function getMisionVision(): Promise<MisionVision[]> {
  try {
    const data = await executeQuery<MisionVision[]>('SELECT * FROM info_mision_vision ORDER BY tipo ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch misión y visión.');
  }
} 