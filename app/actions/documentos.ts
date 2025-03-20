'use server';

import { executeQuery } from '../lib/db';

export interface Documento {
  id: string;
  descripcion: string;
  url: string;
}

export async function getDocumentosImportantes(): Promise<Documento[]> {
  try {
    const data = await executeQuery<Documento[]>('SELECT * FROM documentos_importancia ORDER BY id DESC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch documentos importantes.');
  }
} 