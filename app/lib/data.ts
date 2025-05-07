import { executeQuery } from './db';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Prestamo,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchEventos() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/eventos`, {
        next: {
          // Revalidar cada 5 minutos
          revalidate: 300,
          // O usar tags para invalidación manual
          tags: ['eventos']
        },
        headers: {
        "x-api-key": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch eventos data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch eventos data.");
  }
};

export async function fetchExperiencia() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/experiencia`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch imagens data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch imagens data.");
  }
}

export async function fetchRevenue() {
  try {
    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await executeQuery('SELECT * FROM revenue');
    return data as Revenue[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await executeQuery(`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`
    );

    const latestInvoices = (data as LatestInvoiceRaw[]).map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

// Define specific types for our query results
type CountResult = {
  count: number;
}[];

type InvoiceStatusResult = {
  paid: number;
  pending: number;
}[];

export async function fetchCardData() {
  try {
    const [
      invoiceCountResult,
      customerCountResult,
      invoiceStatusResult
    ] = await Promise.all([
      executeQuery<CountResult>('SELECT COUNT(*) as count FROM invoices'),
      executeQuery<CountResult>('SELECT COUNT(*) as count FROM customers'),
      executeQuery<InvoiceStatusResult>(`
        SELECT
          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
        FROM invoices`
      )
    ]);

    const numberOfInvoices = Number(invoiceCountResult[0]?.count ?? 0);
    const numberOfCustomers = Number(customerCountResult[0]?.count ?? 0);
    const totalPaidInvoices = formatCurrency(invoiceStatusResult[0]?.paid ?? 0);
    const totalPendingInvoices = formatCurrency(invoiceStatusResult[0]?.pending ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await executeQuery(`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ? OR
        invoices.amount LIKE ? OR
        invoices.date LIKE ? OR
        invoices.status LIKE ?
      ORDER BY invoices.date DESC
      LIMIT ? OFFSET ?
    `, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      ITEMS_PER_PAGE,
      offset
    ]);

    return invoices as InvoicesTable[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await executeQuery<CountResult>(`
      SELECT COUNT(*) as count
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ? OR
        invoices.amount LIKE ? OR
        invoices.date LIKE ? OR
        invoices.status LIKE ?
    `, [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`
    ]);

    const totalPages = Math.ceil(Number(data[0]?.count ?? 0) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await executeQuery(`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ?
    `, [id]);

    const invoice = (data as InvoiceForm[]).map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const data = await executeQuery(`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `);

    return data as CustomerField[];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await executeQuery(`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ?
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `, [`%${query}%`, `%${query}%`]);

    const customers = (data as CustomersTableType[]).map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}

export async function fetchPrestamos() {
  try {
    // Ejecutar consulta para obtener todos los préstamos
    // Ordenar por estado (pendiente primero, luego aprobado, luego denegado) y luego por ID descendente
    const query = `
      SELECT * FROM prestamos 
      ORDER BY 
        CASE 
          WHEN estado IS NULL OR estado = 'pendiente' THEN 1
          WHEN estado = 'aprobado' THEN 2
          WHEN estado = 'denegado' THEN 3
          ELSE 4
        END,
        id DESC
    `;
    
    const data = await executeQuery(query, []);
    
    // Convertir el valor de personas_externas de 0/1 a boolean
    return (data as Prestamo[]).map(prestamo => ({
      ...prestamo,
      personas_externas: Boolean(prestamo.personas_externas),
      // Asegurarse de que estado tenga un valor por defecto si es NULL
      estado: prestamo.estado || 'pendiente'
    })) as Prestamo[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch prestamos.');
  }
}
