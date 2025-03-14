'use server';

import { executeQuery } from '../lib/db';

export interface Funcionario {
  id: number;
  nombre: string;
  cargo: string;
  imagen?: string;
}

export async function getFuncionarios(): Promise<Funcionario[]> {
  try {
    const data = await executeQuery<Funcionario[]>('SELECT * FROM funcionarios ORDER BY id ASC');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch funcionarios.');
  }
} 