import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Paz y Salvo",
};

export default function PazYSalvoPage() {
  return (
    <main className="container mx-auto px-4 pt-8">
      <div className="flex flex-col-reverse items-center sm:flex-col md:flex-row md:justify-around">
        <div className="">
          <h1 className="text-4xl font-bold mb-8 text-center sm:text-left text-secondaries_red-900">
            Pasos para obtener el Paz y Salvo de Grado
          </h1>
          <p>
            Infórmate de los pasos que debes seguir para obtener el paz y salvo
            de la Biblioteca Eduardo Cote Lamus.
          </p>
        </div>
        <Image
          src={
            "http://biblioteca.ufps.edu.co/wp-content/uploads/2022/11/servicios.png"
          }
          alt="Paz y salvo"
          width={320}
          height={300}
        />
      </div>
      <div>
        <p>
          Para obtener el paz y salvo de grado de la Biblioteca Eduardo Cote
          Lamus, debes seguir los siguientes pasos:
        </p>
      </div>

      {/* Sección de información */}
      <section id="valores-objetivos" className="mb-12">
        {/* Trabajo de grado */}
        <h2 className="text-2xl font-semibold mt-6 mb-4 bg-secondaries_red-800 text-white p-2 rounded-lg">
          Trabajo de Grado
        </h2>
        <ul className="space-y-4">
          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">
              Aprobación del Director de Plan de Estudios
            </h3>
            <p className="text-black">
              Teniendo el aval del Director de Plan de Estudios en la plataforma
              de{" "}
              <a
                href="https://divisist2.ufps.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                Divisist 2.0
              </a>
              , el estudiante puede iniciar el trámite de Paz y Salvo con la
              Biblioteca Eduardo Cote Lamus.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">
              Estructura en normas APA
            </h3>
            <p className="text-black">
              El trabajo de grado deberá de cumplir con las{" "}
              <a
                href="https://normas-apa.org/formato/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                normas APA
              </a>{" "}
              actualizadas. Caso contrario, asegúrese de que su documento está
              bien estructurado para que este no sea devuelto y tenga que hacer
              correcciones. Tenga en cuenta que trabajo de grado deberá seguir
              el siguiente orden:{" "}
              <b>
                Formato Esquema de Resumen, Portada, Contraportada, Acta de
                Sustentación, Tabla de Contenido y Lista (Tablas, Figuras, etc.)
              </b>
              . En caso de que su trabajo no cuente con listas, no incluirlas.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">
              Aprobación de Derechos de Reproducción
            </h3>
            <p className="text-black">
              Para efectos de derechos de autor, el estudiante deberá llenar y
              firmar la carta de{" "}
              <a
                href="http://repository.ufps.edu.co/wp-content/uploads/2022/12/REPRODUCCION_TOTAL_PARCIAL_TRABAJO_GRADO.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                Derechos de Reproducción
              </a>
              . En caso de que el estudiante no autorice la publicación del
              trabajo de grado, tendrá que anexar en un único documento y{" "}
              <b>de manera digital (no fotos, ni escáner)</b> en el siguiente
              orden:{" "}
              <b>
                Portada, Contraportada, Resumen, Tabla de Contenido y
                Bibliografía del trabajo de grado
              </b>
              .
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">Envío de Documentos</h3>
            <p className="text-black">
              Una vez haya cumplido con los pasos anteriores, el estudiante debe
              enviar los documentos: trabajo de grado, carta de autorización y
              anexos (en caso de no haber aceptado la publicación del trabajo) a
              través del{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe7Fo-O7diGYvdaZ4iiqFAT15dbjUvMErJ4tDZ1cJdq8t3iwA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                formulario de registro de trabajo de grado
              </a>
              . Nota: Nombrar el archivo de trabajo de grado como:{" "}
              <b>TG_sucodigo.pdf</b>. Ejemplo <i>TG_115118.pdf</i>, de la misma
              manera nombrar la carta de autorización <b>CA_sucodigo.pdf</b> y
              el anexo como <b>AX_sucodigo.pdf</b>. En caso de ser dos o más
              autores, agregue los códigos siguiendo el formato{" "}
              <b>TG_sucodigo1_sucodigo2.pdf</b>
            </p>
          </li>
        </ul>

        {/* Curso de produndización */}
        <h2 className="text-2xl font-semibold mt-6 mb-4 bg-secondaries_red-800 text-white p-2 rounded-lg">
          Curso de Profundización
        </h2>
        <ul className="space-y-4">
          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">
              Aprobación del Director de Plan de Estudios
            </h3>
            <p className="text-black">
              Teniendo el aval del Director de Plan de Estudios en la plataforma
              de{" "}
              <a
                href="https://divisist2.ufps.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                Divisist 2.0
              </a>
              , el estudiante puede iniciar el trámite de Paz y Salvo con la
              Biblioteca Eduardo Cote Lamus.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">Envío de Documentos</h3>
            <p className="text-black">
              Una vez haya cumplido con los pasos anteriores, el estudiante debe
              enviar el documento, acta o constancia a través del{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe7Fo-O7diGYvdaZ4iiqFAT15dbjUvMErJ4tDZ1cJdq8t3iwA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red"
              >
                formulario de registro de trabajo de grado
              </a>
              . El documento deberá de ser en extensión PDF y con su código, es
              decir, <b>sucodigo_acta.pdf</b>. Ejemplo <i>1159898_acta.pdf</i>
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
