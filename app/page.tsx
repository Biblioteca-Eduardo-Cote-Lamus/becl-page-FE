import { montserrat } from "./ui/fonts";
import Footer from "./ui/landing/footer";
import NavbarMenu from "./ui/landing/navbar";
import Carrusel from "./ui/landing/carrusel_imagenes";
import Experiencia from "./ui/landing/experiencia";
import ServiciosSection from "./ui/landing/servicios-section";
import ExploraSection from "./ui/landing/explora-section";
import AlertaNoticia from "./ui/landing/alerta_noticia";
import CarruselLanding from "./ui/landing/carrusel_landing";

export default async function Page() {
  if (process.env.NEXT_PHASE === "build") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <>
      <header>
        <NavbarMenu />
      </header>

      <main className="flex min-h-screen flex-col animate-fade-in-up">
        {/* Sección de bienvenida */}
        <section className="relative h-screen w-full overflow-hidden">
          <CarruselLanding />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
            <h1
              className={`text-4xl md:text-6xl text-white font-bold text-center mb-4 ${montserrat.className}`}
            >
              Bienvenido a Nuestra
            </h1>
            <h2
              className={`text-3xl md:text-5xl text-yellow-400 font-bold text-center ${montserrat.className}`}
            >
              Biblioteca Eduardo Cote Lamus
            </h2>
          </div>
        </section>

        {/* Alerta de noticia importante */}
        <AlertaNoticia />

        {/* Novedades */}
        <section className="mt-32 pb-10">
          <h2
            className={`pb-10 text-center text-5xl text-secondaries_red-900 font-semibold ${montserrat.className}`}
          >
            Novedades
          </h2>
          {/*<EventosComponent />*/}
          <Carrusel />
        </section>

        {/* Explora */}
        <ExploraSection />

        {/* Servicios */}
        <ServiciosSection />

        {/* Experiencia */}
        <Experiencia />
      </main>

      <footer>
        <Footer />
      </footer>

      <script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        defer
      ></script>
    </>
  );
}
