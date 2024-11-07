import { Metadata } from "next";
import { montserrat } from "@/app/ui/fonts";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Biografía",
};

export default function BioPage() {
  return (
    <main>
      <section className="bg-secondaries_red-900 mx-2 rounded-lg p-8 flex flex-col md:justify-evenly items-center sm:flex-row">
        <div className="text-white md:pr-11 md:w-1/2">
            <p className={`${montserrat.className} md:mb-4`}>
              <b>Eduardo Cote Lamus</b>
            </p>
          <p className="text-4xl md:mb-8">
            <b>¡Conoce sobre la vida y obra del reconocido escritor Eduardo Cote
            Lamus!</b>
          </p>
          <p>
            Conoce de su biografía, obras más importantes y poemas destacados
            del ilustre Escritor Norte Santandereano.
          </p>
        </div>
        <Image 
            src="http://biblioteca.ufps.edu.co/wp-content/uploads/2022/12/reading.png"
            alt="Libro"
            width={512}
            height={512}
            className="w-64 h-64 object-cover"
        />
      </section>
      <section></section>
      <section></section>
      <section></section>
    </main>
  );
}
