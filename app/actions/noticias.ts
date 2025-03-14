'use server';

import { executeQuery } from '../lib/db';
import { Noticias } from '../lib/definitions';

export async function getNoticias(): Promise<Noticias[]> {
  try {
    const data = await executeQuery<Noticias[]>('SELECT * FROM noticias ORDER BY fecha DESC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch noticias.');
  }
}

export async function getNoticiaById(id: string): Promise<Noticias | null> {
  try {
    const data = await executeQuery<Noticias[]>('SELECT * FROM noticias WHERE id = ?', [id]);
    return data[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch noticia.');
  }
}

export async function deleteNoticia(id: number): Promise<void> {
  try {
    await executeQuery('DELETE FROM noticias WHERE id = ?', [id]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete noticia.');
  }
} 