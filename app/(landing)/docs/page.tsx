import { Metadata } from "next";
import DocumentosImportantes from "@/app/ui/landing/documentos_importantes";

export const metadata: Metadata = {
  title: "Documentos Importantes",
  description: "Accede a documentos importantes y recursos esenciales",
};

export default function DocumentosPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="bg-secondaries_red-900">
        <div className="px-4 py-24 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-6">
            Documentos Importantes
          </h1>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-24 bg-white/80 rounded-full" />
          </div>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto">
            Accede a todos los documentos y recursos esenciales en un solo lugar
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 transition-transform hover:-translate-y-1">
            <DocumentosImportantes />
          </div>
        </div>
      </section>
    </div>
  );
}
