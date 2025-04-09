'use server';

import { executeQuery } from '../lib/db';
import { Desarrollador } from '../lib/definitions';

export type { Desarrollador };

export async function getDesarrolladores(): Promise<Desarrollador[]> {
  try {
    const data = await executeQuery<Desarrollador[]>('SELECT * FROM desarrolladores ORDER BY id ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch desarrolladores.');
  }
} 