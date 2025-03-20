'use server';

import { executeQuery } from '../lib/db';
import { Experiencia } from '../lib/definitions';

export async function getExperiencia(): Promise<Experiencia[]> {
  try {
    const data = await executeQuery<Experiencia[]>('SELECT * FROM experiencia ORDER BY id ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch experiencia.');
  }
} 