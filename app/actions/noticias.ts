'use server';

import { executeQuery } from '../lib/db';
import { Noticia } from '../lib/definitions';

export async function getNoticias(): Promise<Noticia[]> {
  try {
    const data = await executeQuery<Noticia[]>('SELECT * FROM noticias ORDER BY id DESC');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function getNoticiaById(id: string): Promise<Noticia | null> {
  try {
    const data = await executeQuery<Noticia[]>('SELECT * FROM noticias WHERE id = ?', [id]);
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