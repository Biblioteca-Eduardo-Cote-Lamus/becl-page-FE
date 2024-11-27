import { Metadata } from "next";
import { montserrat } from "@/app/ui/fonts";
import Image from "next/image";
import { MoonFastWindIcon, Tired01Icon, SignatureIcon } from "hugeicons-react";

export const metadata: Metadata = {
  title: "Biografía",
};

export default function BioPage() {
  return (
    <main>
      <section className="flex flex-col md:flex-row md:justify-evenly items-center text-left bg-secondaries_red-900 py-44">
        <div className="text-white md:pr-11 md:w-1/2">
          <p className={`${montserrat.className} md:mb-4`}>
            <b className="text-yellow-400">#EduardoCoteLamus</b>
          </p>
          <p className="text-4xl md:mb-8">
            <b>
              ¡Conoce sobre la vida y obra del reconocido escritor Eduardo Cote
              Lamus!
            </b>
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
      {/* Sección Biografía Eduardo Cote LAmus */}
      <section className="bg-gray-100 min-h-screen p-4 flex items-center justify-center">
        <div className="w-full md:w-4/5 lg:w-2/3 mx-auto bg-white p-4 md:p-6 lg:p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:gap-8 justify-around">
            {/* Contenido de texto */}
            <div className="mb-6 lg:mb-0 lg:w-1/2 lg:flex lg:flex-col lg:justify-center ">
              <div className="flex flex-row items-center gap-2">
                <span className="text-secondaries_red-900">
                  <hr className="w-10 border-secondaries_red-900" />
                </span>
                <p>
                  <b>Biografía</b>
                </p>
              </div>
              <h3 className="text-secondaries_red-900 text-xl md:text-2xl mb-4">
                <b>Eduardo Cote Lamus</b>
              </h3>
              <p className="text-sm md:text-base">
                Poeta y político colombiano. Nació el 16 de agosto de 1928 en
                Cúcuta (Norte de Santander) y murió en accidente automovilístico
                el 3 de agosto de 1964, en la misma ciudad. Realizó sus estudios
                de Derecho en la Universidad Externado de Colombia en Santa fe
                de Bogotá y luego, gracias a una beca que le concedió el
                gobierno español, estudió en Madrid y en la Universidad de
                Salamanca. Allí trabó amistad con Vicente Aleixandre y con otros
                poetas españoles y extranjeros. Su poesía se caracteriza porque
                busca lo narrativo, las imágenes esenciales, la objetividad
                poética, un idealismo épico, humano, pero siempre en pugna con
                su desencantada intuición de la muerte, convertida en la
                historia del hombre.
              </p>
            </div>

            {/* Imagen */}
            <div className=" lg:flex lg:flex-col lg:justify-center lg:w-1/2">
              <Image
                width={384}
                height={495}
                className="w-full object-cover"
                alt="Eduardo Cote Lamus"
                src={
                  "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/11/eduardo_cote_lamus-001-1.jpg"
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-10">
        <div>
          <div className="text-center py-10">
            <h4 className="text-3xl py-2">
              <b>
                Poemas más{" "}
                <span className="text-secondaries_red-700 hover:text-black transition-colors duration-300">
                  reconocidos
                </span>
              </b>
            </h4>
            <div className="w-fit mx-auto mb-10 flex space-x-2">
              <div className="h-1 w-1 bg-secondaries_red-800 rounded-full"></div>
              <div className="h-1 w-32 bg-secondaries_red-800 rounded-full"></div>
              <div className="h-1 w-1 bg-secondaries_red-800 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row px-4 md:px-10">
            <div className="w-full md:w-1/3 px-3 md:px-6 mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <Tired01Icon size={32} />
                <b>
                  <h5 className=" text-2xl text-secondaries_red-800">YO SOY</h5>
                </b>
              </div>
              <div>
                Hay que sentir algo tan profundo como un dolor para poder decir:
                Yo vivo. Hay que vivir atenazando con la mano las angustias para
                poder decir: Yo siento. Hay que vagar sintiendo entre los brazos
                del cometa para poder decir: Yo sueño. Hay que soñar partiendo
                del cosmos del tormento para poder decir: Yo sangro. Hay que
                sangrar las mil arterias de las almas para poder decir: Yo
                plasmo. Hay que plasmar lágrimas entre rocas de ansia para poder
                decir: Yo amo. Hay que subir palpando desde la célula del mundo
                hasta el secreto de Dios para poder decir: Yo pienso. Hay que
                soñar, sangrar, sentir, plasmar, vagar, subir, amar y vivir,
                atenazando siempre, para poder decir: YO SOY.
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 md:px-6 mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <SignatureIcon size={32} />
                <b>
                  <h5 className=" text-2xl text-secondaries_red-800">
                    EL DESÍGNIO
                  </h5>
                </b>
              </div>
              <div>
                En las páginas solas de algún libro alguien (seguramente yo) ha
                dejado escrita, para luego destruirla, una palabra: Muerte. Con
                amor la fue escribiendo, con amor la deja como para olvidarla en
                esa forma, pero vuelve después sobre las letras. Como un
                adolescente que lee un libro a escondidas, detrás de la familia,
                se descubre culpable hasta los huesos: la misma mano que dejo
                los signos se endurece de pronto en la escritura y el mundo,
                entonces, ya, de nada sirve.
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 md:px-6">
              <div className="flex items-center gap-2 mb-3">
                <MoonFastWindIcon size={32} />
                <b>
                  <h5 className="text-2xl text-secondaries_red-800">
                    EN EL AIRE SE BORRAN LAS PALABRAS
                  </h5>
                </b>
              </div>
              <div>
                El viento va midiendo las palabras que ruedan por el hombre como
                mundos salidos de las órbitas del fuego; pero el tiempo, fiscal
                de lo perdido, asombra aquellas que se quedan dentro y que solo
                se escuchan en las pausas. El silencio es el mar de la palabra
                donde hay más voz que yodo, que agua: ¡cómo la enfermedad del
                mar es no moverse! Por cuando el verbo calla se abre un hueco
                habitado por aves, por ausencias, por las sombras sonoras de las
                letras que pasan por el hombre como ráfagas.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="text-center py-10">
          <h4 className="text-3xl py-2">
            <b>
              Libros de{" "}
              <span className="text-secondaries_red-700 hover:text-black transition-colors duration-300">
                Eduardo Cote Lamus
              </span>
            </b>
          </h4>
          <h4>Algunas de sus obras más importantes son:</h4>
          <div className="py-3 w-fit mx-auto mb-10 flex space-x-2">
            <div className="h-1 w-1 bg-secondaries_red-800 rounded-full"></div>
            <div className="h-1 w-32 bg-secondaries_red-800 rounded-full"></div>
            <div className="h-1 w-1 bg-secondaries_red-800 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto px-4">
            <div className="bg-white p-4 md:p-6 shadow-lg flex-1">
              <Image
                width={300}
                height={422}
                className="w-full object-cover"
                alt="La Vida Cotidiana"
                src={
                  "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/12/la-vida-cotidiana.gif"
                }
              />
              <b>
                <h2 className="py-3">LA VIDA COTIDIANA</h2>
              </b>
            </div>
            <div className="bg-white p-4 md:p-6 shadow-lg flex-1">
              <Image
                width={300}
                height={422}
                className="w-full object-cover"
                alt="Los Sueños"
                src={
                  "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/12/los-suenos.jpg"
                }
              />
              <b>
                <h2 className="py-3">LOS SUEÑOS</h2>
              </b>
            </div>
            <div className="bg-white p-4 md:p-6 shadow-lg flex-1">
              <Image
                width={300}
                height={422}
                className="w-full object-cover"
                alt="Memorias de un Olvido"
                src={
                  "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/12/momorias-de-un-olvido.jpg"
                }
              />
              <b>
                <h2 className="py-3">MEMORIAS DE UN OLVIDO</h2>
              </b>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
