import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Invoice, Customer } from '@/app/lib/definitions'; 
import { PageProps } from "@/.next/types/app/page";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

// Definir la interfaz correctamente para las props de la página

type Props = PageProps & {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const id = params.id;
  const [invoice, customers] = (await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])) as [Invoice | undefined, Customer[]];

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
