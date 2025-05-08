import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { openSans } from "app/ui/fonts";
import { fetchLatestInvoices } from "@/app/lib/data";

// export default async function LatestInvoices({
//   latestInvoices,
// }: {
//   latestInvoices: LatestInvoice[];
// }) {
export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${openSans.className} mb-4 text-xl font-semibold text-gray-900 md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-white p-6 shadow-sm">
        <div className="divide-y divide-gray-100">
          {latestInvoices.map((invoice) => {
            return (
              <div
                key={invoice.id}
                className="group flex flex-row items-center justify-between py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Image
                      src={invoice.image_url}
                      alt={`${invoice.name}'s profile picture`}
                      className="rounded-full ring-2 ring-gray-100 transition-all group-hover:ring-blue-100"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${openSans.className} truncate text-sm font-medium text-blue-600 md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="rounded-lg bg-blue-50 p-2">
            <RefreshCw className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="ml-2 text-sm font-medium text-gray-600">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
