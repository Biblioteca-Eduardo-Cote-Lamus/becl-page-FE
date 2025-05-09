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

export async function createNoticia(noticia: Omit<Noticia, 'id'>): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    const result = await executeQuery<{ insertId: number }>(
      'INSERT INTO noticias (titular, descripcion, imagen, importante) VALUES (?, ?, ?, ?)',
      [noticia.titular, noticia.descripcion, noticia.imagen, noticia.importante]
    );
    
    return {
      success: true,
      id: result.insertId
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      error: 'Failed to create noticia.'
    };
  }
}

export async function updateNoticia(id: string, noticia: Partial<Noticia>): Promise<{ success: boolean; error?: string }> {
  try {
    const fields = Object.keys(noticia)
      .filter(key => key !== 'id')
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = Object.entries(noticia)
      .filter(([key]) => key !== 'id')
      .map(([, value]) => value);
    
    values.push(id);

    await executeQuery(
      `UPDATE noticias SET ${fields} WHERE id = ?`,
      values
    );

    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      error: 'Failed to update noticia.'
    };
  }
}

export async function deleteNoticia(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await executeQuery('DELETE FROM noticias WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      error: 'Failed to delete noticia.'
    };
  }
} 