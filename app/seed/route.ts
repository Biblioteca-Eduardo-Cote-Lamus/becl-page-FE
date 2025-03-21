import { executeQuery } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Crear tabla de usuarios
    await executeQuery(
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );
    
    return NextResponse.json({ message: 'Database seeded.' }, { status: 200 });
  } catch (err) {
    console.error('Error seeding database:', err);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}