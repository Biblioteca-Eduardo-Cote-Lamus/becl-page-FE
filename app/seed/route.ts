import { executeQuery } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Crear tabla de usuarios
    await executeQuery(
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        is_active TINYINT(1) DEFAULT 1,
        role TEXT,
        INDEX idx_email (email)
      )`
    );

    return NextResponse.json({ message: 'Database seeded.' }, { status: 200 });
  } catch (err) {
    console.error('Error seeding database:', err);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}