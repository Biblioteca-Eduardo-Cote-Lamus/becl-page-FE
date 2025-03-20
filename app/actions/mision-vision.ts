'use server';

import { executeQuery } from '../lib/db';
import { InfoMisionVision } from '../lib/definitions';

export async function getMisionVision(): Promise<InfoMisionVision[]> {
  try {
    const data = await executeQuery<InfoMisionVision[]>('SELECT * FROM info_mision_vision ORDER BY id ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch misión y visión.');
  }
} 