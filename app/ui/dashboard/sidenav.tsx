import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/becl-logo";
import { Power } from "lucide-react";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-1 py-2 sm:px-2 sm:py-4">
      <Link
        className="mb-3 flex h-16 items-center justify-center rounded-lg bg-secondaries_red-700 p-1 shadow-sm transition-all duration-300 hover:shadow-md sm:mb-4 sm:h-20 sm:rounded-xl sm:p-2 md:h-32 lg:h-40"
        href="/dashboard"
      >
        <div className="w-full h-full flex items-center justify-center">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-1 sm:space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="w-full"
        >
          <button className="group flex h-[40px] sm:h-[48px] w-full grow items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl bg-white p-1.5 sm:p-2 text-xs sm:text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:bg-secondaries_red-950/5 md:flex-none md:justify-start md:px-3">
            <div className="rounded-lg bg-secondaries_red-950/10 p-1.5 sm:p-2 transition-colors group-hover:bg-secondaries_red-950/20">
              <Power className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-secondaries_red-700" />
            </div>
            <div className="hidden text-gray-600 group-hover:text-secondaries_red-700 md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}
