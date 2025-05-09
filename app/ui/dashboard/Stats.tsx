import { Card } from "@/app/ui/dashboard/card";
import { Users, Newspaper, Calendar, FileText } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        title="Usuarios"
        value="1,234"
        icon={<Users className="h-5 w-5 text-gray-700" />}
        description="Total de usuarios registrados"
      />
      <Card
        title="Noticias"
        value="45"
        icon={<Newspaper className="h-5 w-5 text-gray-700" />}
        description="Noticias publicadas"
      />
      <Card
        title="Eventos"
        value="12"
        icon={<Calendar className="h-5 w-5 text-gray-700" />}
        description="Eventos programados"
      />
      <Card
        title="Documentos"
        value="89"
        icon={<FileText className="h-5 w-5 text-gray-700" />}
        description="Documentos disponibles"
      />
    </div>
  );
} 