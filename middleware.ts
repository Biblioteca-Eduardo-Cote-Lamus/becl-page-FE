/**
 * @file middleware.ts
 * @description Configuración de autenticación para la aplicación Next.js utilizando NextAuth.
 */

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

/**
 * Exporta la configuración de autenticación de NextAuth.
 * @see {@link https://next-auth.js.org/|NextAuth.js}
 */
export default NextAuth(authConfig).auth;

/**
 * Configuración del middleware de Next.js.
 * Define las rutas que deben ser manejadas por el middleware.
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher|Next.js Middleware Matcher}
 */
export const config = {
  /**
   * Define las rutas que deben ser manejadas por el middleware.
   * Excluye las rutas que comienzan con 'api', '_next/static', '_next/image' y las que terminan con '.png'.
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};