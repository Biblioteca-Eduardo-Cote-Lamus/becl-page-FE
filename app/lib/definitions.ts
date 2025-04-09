// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export type Lugar = {
  id: number;
  nombre: string;
}

export type Funcionario = {
  id: number;
  nombre: string;
  cargo: string;
  imagen: string;
}

export type Desarrollador = {
  id: number;
  nombre: string;
  cargo: string;
  imagen: string;
}

export type Noticias = {
  id: number;
  titular: string;
  descripcion: string;
  imagen: string;
  importante: boolean;
}

export type Eventos = {
  id: number;
  titulo: string;
  lugar: Lugar;
  fecha: string;
  hora: string;
  enlaceFacebook: string | null;
  enlaceYoutube: string | null;
  enlaceGoogleMeet: string | null;
}

// Base types for common database values
export type DatabaseValue = string | number | boolean | Date | Buffer | null;

// Document types
export interface DocumentoImportante {
  id: number;
  descripcion: string;
  url: string;
}

// Experience types
export interface Experiencia {
  id: number;
  imagen_qr: string;
  enlace: string;
}

// Staff types
export interface FuncionarioBECL {
  id: number;
  nombre: string;
  cargo: string;
  imagen: string;
}

// Milestone types
export interface Hito {
  id: number;
  anio: number;
  imagen: string;
  descripcion: string;
}

// Carousel types
export interface ImagenCarrusel {
  id: number;
  imagen: string;
  visible: boolean;
  enlace: string | null;
  descripcion: string;
}

// Mission and Vision types
export interface InfoMisionVision {
  id: number;
  nombre: string | null;
  descripcion: string | null;
}

// Location types
export interface LugarEvento {
  id: number;
  nombre: string;
}

// Event types
export interface Evento {
  id: number;
  titulo: string;
  lugar_id: number | null;
  fecha: string; // ISO date string
  hora: string; // ISO time string
  enlace_facebook: string | null;
  enlace_youtube: string | null;
  enlace_google_meet: string | null;
  lugar?: LugarEvento; // Optional joined data
}

// News types
export interface Noticia {
  id: number;
  titular: string;
  descripcion: string;
  imagen: string;
  importante: boolean;
}

// Tutorial types
export interface ServicioTutorial {
  id: number;
  nombre: string | null;
  tutorial: string | null;
}

// User types
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  clave: Buffer;
}

// Update or add this interface
export interface MisionVision {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

export interface ProgramaData {
  totalRegistros: string,
  registrosDia: string,
  registrosUltimos7Dias: string,
  registrosUltimos30Dias: string,
  programas: [{
    programa: string,
    total: string
  }]
}