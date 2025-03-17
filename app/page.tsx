import { montserrat } from "./ui/fonts";
import Footer from "./ui/landing/footer";
import NavbarMenu from "./ui/landing/navbar";
import Carrusel from "./ui/landing/carrusel_imagenes";
import Experiencia from "./ui/landing/experiencia";
import ServiciosSection from "./ui/landing/servicios-section";
import ExploraSection from "./ui/landing/explora-section";
import AlertaNoticia from "./ui/landing/alerta_noticia";

export default async function Page() {
  // Skip data fetching during build time
  if (process.env.NEXT_PHASE === 'build') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Loading...</div>
      </main>
    );
  }

  // Your existing data fetching code here
  return (
    <>
      <NavbarMenu />
      <main className="flex min-h-screen flex-col p-6">
        {/* Alerta de noticia importante */}
        <AlertaNoticia />
        {/* Sección de novedades */}
        <section className="mt-32 pb-10">
          <h2
            className={`pb-10 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
          >
            Novedades
          </h2>
          <main>{/* Componente de eventos*/}</main>

          {/*<EventosComponent />*/}
          <div>
            <Carrusel />
          </div>
        </section>
        
        {/* Sección de explora */}
        <ExploraSection />

        {/* Sección de servicios */}
        <ServiciosSection />

        {/* Sección de experiencia */}
        <section className="bg-gray-100">
          <Experiencia />
        </section>
      </main>
      <Footer />
      <script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        defer
      ></script>
    </>
  );
}
