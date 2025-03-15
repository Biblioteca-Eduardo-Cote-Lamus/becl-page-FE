'use server';

import { executeQuery } from '../lib/db';
import { Hito } from '../lib/definitions';

export async function getHitos(): Promise<Hito[]> {
  try {
    const data = await executeQuery<Hito[]>('SELECT * FROM hitos ORDER BY anio ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch hitos.');
  }
} 