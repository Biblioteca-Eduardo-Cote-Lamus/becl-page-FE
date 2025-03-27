import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Paz y Salvo",
};

export default function PazYSalvoPage() {
  return (
    <main className="container mx-auto px-4 pt-8">
      <div className="flex flex-col-reverse items-center sm:flex-col md:flex-row md:justify-around animate-fade-in-up">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-8 text-center sm:text-left text-secondaries_red-900 animate-fade-in-up animation-delay-200">
            Pasos para obtener el Paz y Salvo de Grado
          </h1>
          <p className="text-lg text-gray-700 animate-fade-in-up animation-delay-400">
            Infórmate de los pasos que debes seguir para obtener el paz y salvo
            de la Biblioteca Eduardo Cote Lamus.
          </p>
        </div>
        <Image
          src="/Imagenes_biblioteca/pazysalvo.png"
          alt="Paz y salvo"
          width={320}
          height={300}
          className="animate-fade-in-up animation-delay-600"
        />
      </div>

      <div className="mt-8 mb-12 animate-fade-in-up animation-delay-800">
        <p className="text-lg text-gray-700">
          Para obtener el paz y salvo de grado de la Biblioteca Eduardo Cote
          Lamus, debes seguir los siguientes pasos:
        </p>
      </div>

      {/* Sección de información */}
      <section id="valores-objetivos" className="mb-12 animate-fade-in-up animation-delay-1000">
        {/* Trabajo de grado */}
        <h2 className="text-2xl font-semibold mt-6 mb-4 bg-secondaries_red-900 text-white p-4 rounded-lg shadow-lg">
          Trabajo de Grado
        </h2>
        <ul className="space-y-6">
          <li className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-secondaries_red-900">
              Aprobación del Director de Plan de Estudios
            </h3>
            <p className="text-gray-700">
              Teniendo el aval del Director de Plan de Estudios en la plataforma
              de{" "}
              <a
                href="https://divisist2.ufps.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                Divisist 2.0
              </a>
              , el estudiante puede iniciar el trámite de Paz y Salvo con la
              Biblioteca Eduardo Cote Lamus.
            </p>
          </li>

          <li className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-secondaries_red-900">
              Estructura en normas APA
            </h3>
            <p className="text-gray-700">
              El trabajo de grado deberá de cumplir con las{" "}
              <a
                href="https://normas-apa.org/formato/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                normas APA
              </a>{" "}
              actualizadas. Caso contrario, asegúrese de que su documento está
              bien estructurado para que este no sea devuelto y tenga que hacer
              correcciones. Tenga en cuenta que trabajo de grado deberá seguir
              el siguiente orden:{" "}
              <span className="font-semibold">
                Formato Esquema de Resumen, Portada, Contraportada, Acta de
                Sustentación, Tabla de Contenido y Lista (Tablas, Figuras, etc.)
              </span>
              . En caso de que su trabajo no cuente con listas, no incluirlas.
            </p>
          </li>

          <li className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-secondaries_red-900">
              Aprobación de Derechos de Reproducción
            </h3>
            <p className="text-gray-700">
              Para efectos de derechos de autor, el estudiante deberá llenar y
              firmar la carta de{" "}
              <a
                href="http://repository.ufps.edu.co/wp-content/uploads/2022/12/REPRODUCCION_TOTAL_PARCIAL_TRABAJO_GRADO.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                Derechos de Reproducción
              </a>
              . En caso de que el estudiante no autorice la publicación del
              trabajo de grado, tendrá que anexar en un único documento y{" "}
              <span className="font-semibold">de manera digital (no fotos, ni escáner)</span> en el siguiente
              orden:{" "}
              <span className="font-semibold">
                Portada, Contraportada, Resumen, Tabla de Contenido y
                Bibliografía del trabajo de grado
              </span>
              .
            </p>
          </li>

          <li className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-secondaries_red-900">Envío de Documentos</h3>
            <p className="text-gray-700">
              Una vez haya cumplido con los pasos anteriores, el estudiante debe
              enviar los documentos: trabajo de grado, carta de autorización y
              anexos (en caso de no haber aceptado la publicación del trabajo) a
              través del{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe7Fo-O7diGYvdaZ4iiqFAT15dbjUvMErJ4tDZ1cJdq8t3iwA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                formulario de registro de trabajo de grado
              </a>
              . Nota: Nombrar el archivo de trabajo de grado como:{" "}
              <span className="font-semibold">TG_sucodigo.pdf</span>. Ejemplo <i>TG_115118.pdf</i>, de la misma
              manera nombrar la carta de autorización <span className="font-semibold">CA_sucodigo.pdf</span> y
              el anexo como <span className="font-semibold">AX_sucodigo.pdf</span>. En caso de ser dos o más
              autores, agregue los códigos siguiendo el formato{" "}
              <span className="font-semibold">TG_sucodigo1_sucodigo2.pdf</span>
            </p>
          </li>
        </ul>

        {/* Curso de produndización */}
        <h2 className="text-2xl font-semibold mt-12 mb-4 bg-secondaries_red-900 text-white p-4 rounded-lg shadow-lg">
          Curso de Profundización
        </h2>
        <ul className="space-y-6">
          <li className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-secondaries_red-900">
              Aprobación del Director de Plan de Estudios
            </h3>
            <p className="text-gray-700">
              Teniendo el aval del Director de Plan de Estudios en la plataforma
              de{" "}
              <a
                href="https://divisist2.ufps.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                Divisist 2.0
              </a>
              , el estudiante puede iniciar el trámite de Paz y Salvo con la
              Biblioteca Eduardo Cote Lamus.
            </p>
          </li>

          <li className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-secondaries_red-900">Envío de Documentos</h3>
            <p className="text-gray-700">
              Una vez haya cumplido con los pasos anteriores, el estudiante debe
              enviar el documento, acta o constancia a través del{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe7Fo-O7diGYvdaZ4iiqFAT15dbjUvMErJ4tDZ1cJdq8t3iwA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaries_red-900 hover:text-secondaries_red-700 font-medium hover:underline"
              >
                formulario de registro de trabajo de grado
              </a>
              . El documento deberá de ser en extensión PDF y con su código, es
              decir, <span className="font-semibold">sucodigo_acta.pdf</span>. Ejemplo <i>1159898_acta.pdf</i>
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
