import { openSans } from "@/app/ui/fonts";
import { HelpCircle, Book, MessageCircle, Mail, Phone, ChevronDown } from "lucide-react";


const faqs = [
  {
    question: "¿Cómo puedo crear una nueva noticia?",
    answer: "Para crear una nueva noticia, ve a la sección 'Noticias' en el menú lateral y haz clic en el botón 'Nueva Noticia'. Completa el formulario con el título, descripción e imagen, y luego haz clic en 'Publicar'."
  },
  {
    question: "¿Cómo puedo gestionar los usuarios del sistema?",
    answer: "Puedes gestionar los usuarios desde la sección 'Usuarios' en el menú lateral. Allí podrás ver la lista de usuarios, crear nuevos usuarios, editar permisos y eliminar usuarios si es necesario."
  },
  {
    question: "¿Cómo puedo cambiar mi contraseña?",
    answer: "Para cambiar tu contraseña, ve a 'Configuración' en el menú lateral, luego a la sección 'Seguridad'. Ingresa tu nueva contraseña y confírmala, luego haz clic en 'Actualizar Contraseña'."
  },
  {
    question: "¿Cómo puedo subir documentos?",
    answer: "Para subir documentos, ve a la sección 'Documentos' en el menú lateral. Haz clic en 'Subir Documento', selecciona el archivo y completa la información requerida. Luego haz clic en 'Guardar'."
  }
];

const guides = [
  {
    title: "Guía de Inicio Rápido",
    description: "Aprende los conceptos básicos para comenzar a usar el sistema.",
    icon: <Book className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Gestión de Contenido",
    description: "Aprende a crear y gestionar noticias, eventos y documentos.",
    icon: <Book className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Administración de Usuarios",
    description: "Guía completa sobre la gestión de usuarios y permisos.",
    icon: <Book className="h-6 w-6 text-blue-600" />
  }
];

export default function HelpPage() {
  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className={`${openSans.className} text-2xl md:text-3xl font-bold text-gray-900`}>
          Centro de Ayuda
        </h1>
        <p className="text-gray-600 mt-2">
          Encuentra respuestas a tus preguntas y aprende a usar el sistema de manera efectiva.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Preguntas Frecuentes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <HelpCircle className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Guías y Tutoriales */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <Book className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Guías y Tutoriales</h2>
          </div>
          <div className="space-y-4">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-blue-100 mr-4">
                  {guide.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{guide.title}</h3>
                  <p className="text-sm text-gray-500">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto y Soporte */}
        <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Contacto y Soporte</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center p-4 rounded-lg border border-gray-200">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-500">soporte@sistema.com</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border border-gray-200">
              <Phone className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Teléfono</h3>
                <p className="text-sm text-gray-500">+123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border border-gray-200">
              <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Chat en Vivo</h3>
                <p className="text-sm text-gray-500">Disponible 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 