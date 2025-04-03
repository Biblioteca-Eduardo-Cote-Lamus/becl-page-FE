import path from 'path'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET() {
  try {
    // Autenticación con Google
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(
        process.cwd(),
        'public',
        'biblioteca-452622-3760ddc8bf64.json'
      ), // Reemplaza con la ubicación real de tu archivo JSON
      scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    })

    // Configuración de la API de Google Analytics
    const analyticsData = google.analyticsdata({
      version: 'v1beta',
      auth
    })

    // Petición de datos de usuarios activos en los últimos 30 días
    const response = await analyticsData.properties.runReport({
      property: 'properties/311456996', // Reemplaza con tu ID de propiedad GA4
      requestBody: {
        dateRanges: [
          { startDate: '30daysAgo', endDate: 'today' },
          { startDate: '30daysAgo', endDate: 'today' }
        ],
        metrics: [{ name: 'activeUsers' }]
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
