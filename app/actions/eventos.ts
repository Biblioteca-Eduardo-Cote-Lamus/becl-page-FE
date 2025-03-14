'use server';

import { executeQuery } from '../lib/db';
import { Evento } from '../lib/definitions';

// Define an interface for the raw database result
interface EventoWithLugar extends Omit<Evento, 'lugar'> {
  lugar_nombre: string | null;
}

export async function getEventos(): Promise<Evento[]> {
  try {
    const data = await executeQuery<EventoWithLugar[]>(`
      SELECT 
        e.*,
        l.nombre as lugar_nombre
      FROM eventos e
      LEFT JOIN lugares l ON e.lugar_id = l.id
      ORDER BY e.fecha ASC, e.hora ASC
    `);
    
    // Transform the data to match the Evento interface
    return data.map(evento => {
      const { lugar_nombre, ...eventoData } = evento;
      return {
        ...eventoData,
        lugar: lugar_nombre && evento.lugar_id ? {
          id: evento.lugar_id,
          nombre: lugar_nombre
        } : undefined
      };
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch eventos.');
  }
} 