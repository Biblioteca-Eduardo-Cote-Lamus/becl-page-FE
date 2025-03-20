import React from "react";
import { Eventos } from "@/app/lib/definitions";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Facebook,
  Youtube,
} from "lucide-react";

const EventosList = ({ eventos }: { eventos: Eventos[] }) => {
  const isToday = (dateStr: string) => {
    const today = new Date();
    const eventDate = new Date(dateStr + "T00:00:00");
    return today.toDateString() === eventDate.toDateString();
  };

  const isBefore = (dateStr: string, timeStr: string) => {
    const now = new Date();
    const eventDateTime = new Date(dateStr + "T" + timeStr);
    return eventDateTime < now;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const filteredEventos = eventos.filter(
    (evento) => !isBefore(evento.fecha, evento.hora) || isToday(evento.fecha)
  );

  const getEventoClass = (fecha: string) => {
    return isToday(fecha)
      ? "bg-blue-100 border-blue-500"
      : "bg-white border-gray-200";
  };

  return (
    <div className="space-y-4 h-auto">
      {filteredEventos.map((evento) => {
        return (
          <div
            key={evento.id}
            className={`p-4 rounded-lg border h-auto ${getEventoClass(
              evento.fecha
            )} 
                       shadow-sm transition-all hover:shadow-md`}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {evento.titulo}
            </h3>

            <div className="mt-2 space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(evento.fecha)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{evento.hora}</span>
              </div>

              {evento.lugar && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{evento.lugar.nombre}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-3">
              {evento.enlaceFacebook && (
                <a
                  href={evento.enlaceFacebook}
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {evento.enlaceYoutube && (
                <a
                  href={evento.enlaceYoutube}
                  className="text-secondaries_red-700 hover:text-secondaries_red-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              )}
              {evento.enlaceGoogleMeet && (
                <a
                  href={evento.enlaceGoogleMeet}
                  className="text-green-600 hover:text-green-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { fetchEventos } from "@/app/lib/data";
const EventosComponent = async () => {
  try {
    const eventos = await fetchEventos();
    
    if (!eventos || eventos.length === 0) {
      return <div className="text-center p-4">No hay eventos disponibles.</div>;
    }
    
    return <EventosList eventos={eventos} />;
  } catch (error) {
    console.error("Error rendering EventosComponent:", error);
    return (
      <div className="text-center p-4 text-red-600">
        Error al cargar los eventos. Por favor, intenta más tarde.
      </div>
    );
  }
};

export default EventosComponent;
