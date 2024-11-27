import { Metadata } from "next";
import ListaFuncionarios from "@/app/ui/landing/lista_funcionarios";

export const metadata: Metadata = {
  title: "Equipo",
};

export default function EquipoPage() {
  return (
    <div>
      <div className="bg-secondaries_red-900 text-white text-center py-24">
        <h1 className="text-5xl mb-10">Conoce al equipo</h1>
        <span className="flex justify-center">
          <hr className="w-2/3" />
        </span>
        <p className="text-xl mt-5">
          Conoce a las personas que se encargan del correcto funcionamiento de
          la <b>Biblioteca Eduardo Cote Lamus</b>.
        </p>
      </div>
      <section>
        <div className="text-center sm:mx-16 md:mx-64 flex flex-col justify-center my-10">
          <h2 className="text-secondaries_red-800 text-4xl mb-7"><b>Nuestro Equipo</b></h2>
          <p className="text-lg">
            Estas son las personas que hacen que la Biblioteca Eduardo Cote
            Lamus funcione de manera correcta, aportando ideas y mejorando los
            servicios a ofrecer a la comunidad de nuestra alma Mater.
          </p>
        </div>
        <div className="sm:m-2 sm:p-2">
          <ListaFuncionarios />
        </div>
      </section>
    </div>
  );
}
