import { google } from 'googleapis';

// Configuración de credenciales para Google Calendar API
export const configureGoogleCalendar = () => {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
};

// Verificar disponibilidad de un espacio en un horario específico
export async function checkAvailability(
  espacioId: number,
  fechaReserva: string,
  horaInicio: string,
  horaFin: string
) {
  try {
    const calendar = configureGoogleCalendar();
    let calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      throw new Error('ID de calendario no configurado');
    }
    
    // Registrar el ID del calendario que se está utilizando
    console.log('Usando ID de calendario:', calendarId);

    // Asegurarse de que tenemos una fecha en formato YYYY-MM-DD
    let fechaFormateada = String(fechaReserva).trim();
    console.log('Fecha original para verificar disponibilidad:', fechaFormateada);
    
    // Si la fecha no tiene el formato correcto, intentar convertirla
    if (!fechaFormateada.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Crear un objeto Date y formatearlo
      try {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        fechaFormateada = `${year}-${month}-${day}`;
        console.log('Fecha convertida a formato YYYY-MM-DD:', fechaFormateada);
      } catch (error) {
        console.error('Error al formatear la fecha, usando fecha actual:', error);
      }
    }
    
    // Asegurarse de que las horas están en formato HH:MM
    let horaInicioFormateada = String(horaInicio).trim();
    let horaFinFormateada = String(horaFin).trim();
    
    // Verificar formato de horas
    if (!horaInicioFormateada.match(/^\d{1,2}:\d{2}$/)) {
      horaInicioFormateada = '08:00'; // Hora por defecto
    }
    
    if (!horaFinFormateada.match(/^\d{1,2}:\d{2}$/)) {
      horaFinFormateada = '09:00'; // Hora por defecto
    }
    
    console.log('Horas formateadas para verificar disponibilidad:', horaInicioFormateada, horaFinFormateada);
    
    // Crear las cadenas en formato ISO 8601
    const timeMin = `${fechaFormateada}T${horaInicioFormateada}:00-05:00`;
    const timeMax = `${fechaFormateada}T${horaFinFormateada}:00-05:00`;
    
    console.log('Rango de tiempo a verificar:', timeMin, 'a', timeMax);
    
    // Buscar eventos existentes en ese horario
    const response = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
    });
    
    console.log(`Se encontraron ${response.data.items?.length || 0} eventos en total en el horario solicitado`);
    
    // Filtrar los eventos que corresponden al espacio solicitado
    const eventosDelEspacio = response.data.items?.filter(event => 
      event.description?.includes(`Espacio ID: ${espacioId}`)
    ) || [];
    
    console.log(`Se encontraron ${eventosDelEspacio.length} eventos para el espacio ${espacioId} en el horario solicitado`);
    
    if (eventosDelEspacio.length > 0) {
      console.log('Eventos encontrados:', JSON.stringify(eventosDelEspacio, null, 2));
    }
    
    // Si hay eventos en ese horario para este espacio, no está disponible
    return {
      available: eventosDelEspacio.length === 0,
      events: eventosDelEspacio,
    };
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    // En caso de error, indicamos que no está disponible por precaución
    return {
      available: false,
      events: [],
      error: 'Error al verificar disponibilidad'
    };
  }
}

// Crear un evento en Google Calendar
export async function createCalendarEvent(
  espacioId: number,
  espacioNombre: string,
  fechaReserva: string,
  horaInicio: string,
  horaFin: string,
  nombreActividad: string,
  nombreDocente: string,
  correoDocente: string
) {
  try {
    const calendar = configureGoogleCalendar();
    let calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      throw new Error('ID de calendario no configurado');
    }
    
    // Registrar el ID del calendario que se está utilizando
    console.log('Usando ID de calendario:', calendarId);

    // Asegurarse de que tenemos una fecha en formato YYYY-MM-DD
    let fechaFormateada = String(fechaReserva).trim();
    console.log('Fecha original:', fechaFormateada);
    
    // Si la fecha no tiene el formato correcto, intentar convertirla
    if (!fechaFormateada.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Crear un objeto Date y formatearlo
      try {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        fechaFormateada = `${year}-${month}-${day}`;
        console.log('Fecha convertida a formato YYYY-MM-DD:', fechaFormateada);
      } catch (error) {
        console.error('Error al formatear la fecha, usando fecha actual:', error);
      }
    }
    
    // Asegurarse de que las horas están en formato HH:MM
    let horaInicioFormateada = String(horaInicio).trim();
    let horaFinFormateada = String(horaFin).trim();
    
    // Verificar formato de horas
    if (!horaInicioFormateada.match(/^\d{1,2}:\d{2}$/)) {
      horaInicioFormateada = '08:00'; // Hora por defecto
    }
    
    if (!horaFinFormateada.match(/^\d{1,2}:\d{2}$/)) {
      horaFinFormateada = '09:00'; // Hora por defecto
    }
    
    console.log('Horas formateadas:', horaInicioFormateada, horaFinFormateada);
    
    // Crear las cadenas en formato ISO 8601
    const startDateTime = `${fechaFormateada}T${horaInicioFormateada}:00-05:00`;
    const endDateTime = `${fechaFormateada}T${horaFinFormateada}:00-05:00`;
    
    console.log('Evento programado para:', startDateTime, 'a', endDateTime);
    
    // Crear el evento con el formato correcto
    const event = {
      summary: `${nombreActividad} - ${espacioNombre}`,
      description: `Préstamo del espacio ${espacioNombre} para la actividad "${nombreActividad}" solicitado por ${nombreDocente} (${correoDocente}). Espacio ID: ${espacioId}`,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Bogota',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Bogota',
      },
      // No incluimos attendees porque requiere Domain-Wide Delegation of Authority
      reminders: {
        useDefault: true,
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    return {
      success: true,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Error al crear evento en el calendario:', error);
    throw error;
  }
}

// Cancelar un evento en Google Calendar
export async function cancelCalendarEvent(eventId: string) {
  try {
    const calendar = configureGoogleCalendar();
    let calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      throw new Error('ID de calendario no configurado');
    }
    
    // Registrar el ID del calendario que se está utilizando
    console.log('Usando ID de calendario:', calendarId);

    await calendar.events.delete({
      calendarId,
      eventId,
    });

    return { success: true };
  } catch (error) {
    console.error('Error al cancelar evento en el calendario:', error);
    throw error;
  }
}
