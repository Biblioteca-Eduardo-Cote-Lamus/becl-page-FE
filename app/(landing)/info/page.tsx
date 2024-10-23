import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Información',
};
 
export default function InfoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-secondaries_red-900">Información de la Biblioteca</h1>

      {/* Sección de Historia */}
      <section id="historia" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Historia de la Biblioteca</h2>
        <p className="text-gray-700">
          La Biblioteca Eduardo Cote Lamus fue fundada en 1970 como parte del esfuerzo de la Universidad Francisco de Paula Santander (UFPS) para ofrecer un centro de recursos documentales que facilitara el acceso a la información académica y cultural a sus estudiantes y profesores.
        </p>
        <p className="text-gray-700 mt-4">
          A lo largo de los años, la biblioteca ha crecido tanto en tamaño como en servicios, adaptándose a los avances tecnológicos y expandiendo su colección para incluir recursos digitales y bases de datos especializadas. En la actualidad, la Biblioteca Eduardo Cote Lamus es un referente regional en acceso a la información y apoyo a la investigación, con un enfoque en la modernización y el desarrollo de espacios de estudio adecuados para toda la comunidad universitaria.
        </p>
      </section>

      {/* Sección de Misión y Visión */}
      <section id="mision-vision" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Misión y Visión</h2>

        {/* Misión */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2">Misión</h3>
          <p className="text-gray-700">
            La misión de la Biblioteca Eduardo Cote Lamus es proporcionar acceso a recursos de información de alta calidad, tanto en formato físico como digital, que apoyen el aprendizaje, la docencia, la investigación y el desarrollo cultural de la comunidad académica de la Universidad Francisco de Paula Santander.
          </p>
          <p className="text-gray-700 mt-4">
            Además, la biblioteca se compromete a ofrecer un entorno inclusivo, eficiente y colaborativo, con servicios innovadores que respondan a las necesidades educativas y científicas de sus usuarios.
          </p>
        </div>

        {/* Visión */}
        <div>
          <h3 className="text-xl font-medium mb-2">Visión</h3>
          <p className="text-gray-700">
            La Biblioteca Eduardo Cote Lamus se proyecta como un centro de información líder en la región, reconocido por su capacidad de adaptación a las tendencias tecnológicas y por ofrecer un servicio de excelencia que fomente la investigación y el aprendizaje continuo.
          </p>
          <p className="text-gray-700 mt-4">
            En el futuro, la biblioteca buscará consolidarse como un espacio de innovación y cultura, capaz de integrar nuevas tecnologías de información y comunicación para satisfacer las necesidades de una comunidad académica global.
          </p>
        </div>
      </section>

      {/* Sección de Valores y Objetivos */}
      <section id="valores-objetivos" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Valores y Objetivos</h2>

        <ul className="space-y-4">
          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">Compromiso con la Educación</h3>
            <p className="text-gray-700">
              Fomentar un entorno de aprendizaje dinámico y accesible para todos los usuarios, asegurando la disponibilidad de recursos actualizados y pertinentes.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">Innovación Tecnológica</h3>
            <p className="text-gray-700">
              Incorporar tecnologías emergentes para mejorar la experiencia del usuario y facilitar el acceso a recursos digitales de calidad.
            </p>
          </li>

          <li className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-medium mb-2">Inclusión y Accesibilidad</h3>
            <p className="text-gray-700">
              Asegurar que la biblioteca sea un espacio inclusivo y accesible para todos los usuarios, sin importar su condición socioeconómica o capacidad.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
