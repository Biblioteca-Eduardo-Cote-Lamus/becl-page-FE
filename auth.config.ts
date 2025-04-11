import type { NextAuthConfig } from 'next-auth';
 
/**
 * Configuración de autenticación para la aplicación Next.js.
 * 
 * @constant
 * @type {object}
 * @property {object} pages - Configuración de las páginas de autenticación.
 * @property {string} pages.signIn - Ruta de la página de inicio de sesión.
 * @property {object} callbacks - Funciones de devolución de llamada para eventos de autenticación.
 * @property {function} callbacks.authorized - Función que determina si un usuario está autorizado para acceder a una ruta.
 * @property {object} callbacks.authorized.params - Parámetros de la función de autorización.
 * @property {object} callbacks.authorized.params.auth - Información de autenticación del usuario.
 * @property {object} callbacks.authorized.params.request - Información de la solicitud.
 * @property {object} callbacks.authorized.params.request.nextUrl - URL de la siguiente solicitud.
 * @property {boolean} callbacks.authorized.returns - Devuelve `true` si el usuario está autorizado, de lo contrario `false`.
 * @property {Array} providers - Proveedores de autenticación (vacío por ahora).
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret-key-for-development',
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname === '/login';

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (isOnLogin) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;