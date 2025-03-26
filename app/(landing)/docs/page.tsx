import { Metadata } from "next";
import DocumentosImportantes from "@/app/ui/landing/documentos_importantes";

export const metadata: Metadata = {
  title: "Documentos",
  description: "Accede a documentos importantes y recursos esenciales",
};

export default function DocumentosPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-secondaries_red-900 animate-fade-in-up">
        <div className="px-4 py-24 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-6 animate-fade-in-up animation-delay-200">
            Documentos Importantes
          </h1>
          <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-400">
            <div className="w-fit mx-auto flex space-x-2">
              <div className="h-1 w-1 bg-white rounded-full"></div>
              <div className="h-1 w-32 bg-white rounded-full"></div>
              <div className="h-1 w-1 bg-white rounded-full"></div>
            </div>
          </div>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
            Accede a todos los documentos y recursos esenciales en un solo lugar
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4 animate-fade-in-up animation-delay-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <DocumentosImportantes />
          </div>
        </div>
      </section>
    </div>
  );
}
