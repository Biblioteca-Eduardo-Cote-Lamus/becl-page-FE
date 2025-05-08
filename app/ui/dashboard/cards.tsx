import React from 'react';
import { fetchCardData } from '@/app/lib/data';
import {
  Banknote,
  Clock,
  Users,
  Inbox,
} from 'lucide-react';
import { openSans } from '@/app/ui/fonts';

const iconMap = {
  collected: Banknote,
  customers: Users,
  pending: Clock,
  invoices: Inbox,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-secondaries_red-950/5 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
      <div className="relative">
        <div className="mb-3 sm:mb-4 flex items-center">
          {Icon ? (
            <div className="rounded-lg bg-secondaries_red-950/10 p-1.5 sm:p-2">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-secondaries_red-700" />
            </div>
          ) : null}
          <h3 className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-gray-600">{title}</h3>
        </div>
        <p
          className={`${openSans.className} text-2xl sm:text-3xl font-semibold text-gray-900`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
