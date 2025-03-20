import React from "react";
import { deleteInvoice } from "@/app/lib/actions";
import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-secondaries_red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-secondaries_red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondaries_red-700"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash className="w-4" />
      </button>
    </form>
  );
}
