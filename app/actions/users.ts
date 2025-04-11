'use server';

import { executeQuery } from '../lib/db';
import { User } from '../lib/definitions';
import bcrypt from 'bcryptjs';

export async function getUsers(): Promise<User[]> {
  try {
    const data = await executeQuery<User[]>(
      'SELECT id, name, email FROM users ORDER BY name'
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const data = await executeQuery<User[]>(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );
    return data[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

export async function createUser(formData: FormData): Promise<{ error?: string }> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      return { error: 'Todos los campos son requeridos' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await executeQuery(
      'INSERT INTO users (id, name, email, password) VALUES (UUID(), ?, ?, ?)',
      [name, email, hashedPassword]
    );

    return {};
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Error al crear el usuario' };
  }
}

export async function updateUser(
  id: string,
  formData: FormData
): Promise<{ error?: string }> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email) {
      return { error: 'Nombre y email son requeridos' };
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await executeQuery(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, hashedPassword, id]
      );
    } else {
      await executeQuery(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
    }

    return {};
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Error al actualizar el usuario' };
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await executeQuery('DELETE FROM users WHERE id = ?', [id]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Error al eliminar el usuario');
  }
} 