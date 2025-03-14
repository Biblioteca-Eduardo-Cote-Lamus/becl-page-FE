'use server';

import { executeQuery } from '../lib/db';
import { Funcionario } from '../lib/definitions';

export interface Funcionario {
  id: number;
  nombre: string;
  cargo: string;
  imagen?: string;
}

export async function getFuncionarios(): Promise<Funcionario[]> {
  try {
    const data = await executeQuery<Funcionario[]>('SELECT * FROM funcionarios_becl ORDER BY id ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch funcionarios.');
  }
} 