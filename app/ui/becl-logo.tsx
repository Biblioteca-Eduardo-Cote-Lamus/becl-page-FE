import Image from "next/image";

export default function BeclLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/BIBLIOTECA-EDUARDO-COTE-LAMUS-min.png"
        alt="Logo de la Biblioteca Eduardo Cote Lamus"
        width={300}
        height={100}
        priority
        className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
      />
    </div>
  );
}