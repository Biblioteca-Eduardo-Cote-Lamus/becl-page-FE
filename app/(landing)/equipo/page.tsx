import { Metadata } from "next";
import ListaFuncionarios from "@/app/ui/landing/lista_funcionarios";
import ListaDesarrolladores from "@/app/ui/landing/lista_desarrolladores";

export const metadata: Metadata = {
  title: "Equipo",
};

export default function EquipoPage() {
  return (
    <div>
      <div className="bg-secondaries_red-900 text-white text-center py-24 animate-fade-in-up">
        <h1 className="text-5xl mb-10 font-bold animate-fade-in-up animation-delay-200">
          Conoce al equipo
        </h1>
        <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-400">
          <div className="w-24 h-1 bg-white rounded-full"></div>
        </div>
        <p className="text-xl mt-5 max-w-3xl mx-auto px-4 animate-fade-in-up animation-delay-600">
          Conoce a las personas que se encargan del correcto funcionamiento de
          la <b>Biblioteca Eduardo Cote Lamus</b>.
        </p>
      </div>

      <section className="py-16 animate-fade-in-up animation-delay-800">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-secondaries_red-900 text-4xl mb-7 font-bold">
            Nuestro Equipo
          </h2>
          <div className="w-fit mx-auto mb-8 flex space-x-2">
            <div className="h-1 w-1 bg-secondaries_red-800 rounded-full"></div>
            <div className="h-1 w-32 bg-secondaries_red-800 rounded-full"></div>
            <div className="h-1 w-1 bg-secondaries_red-800 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Estas son las personas que hacen que la Biblioteca Eduardo Cote
            Lamus funcione de manera correcta, aportando ideas y mejorando los
            servicios a ofrecer a la comunidad de nuestra alma Mater.
          </p>
        </div>
        <div className="mt-12 px-4">
          <ListaFuncionarios />
        </div>
        <div className="mt-12 px-4">
          <ListaDesarrolladores />
        </div>
      </section>
    </div>
  );
}
