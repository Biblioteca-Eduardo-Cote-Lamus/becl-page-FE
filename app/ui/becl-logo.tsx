// import { GlobeAltIcon } from '@heroicons/react/24/outline';
// import { lusitana } from './fonts';

// export default function AcmeLogo() {
//   return (
//     <div
//       className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
//     >
//       <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
//       <p className="text-[44px]">Acme</p>
//     </div>
//   );
// }
import Image from "next/image";

export default function AcmeLogo() {
  return (
    <Image
      src="/BIBLIOTECA-EDUARDO-COTE-LAMUS-min.svg"
      width={270}
      height={125}
      alt="BECL Logo"
      className="justify-self-center self-center"
    />
  );
}