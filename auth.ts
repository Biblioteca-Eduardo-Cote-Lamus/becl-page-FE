import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Credenciales invalidas");
        return null;
      },
    }),
  ],
});

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";
// import { z } from "zod";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }
// }

// interface User {
//   email: string;
//   token: string;
//   // Add other fields as necessary
// }

// // Función para autenticar al usuario
// interface AuthenticateUserResponse {
//   token: string;
//   email: string;
//   // Agrega aquí otros campos que esperas en la respuesta
// }

// async function authenticateUser(email: string, password: string): Promise<User | null> {
//   try {
//     const response = await axios.post<AuthenticateUserResponse>('http://localhost:8080/auth/login', { email, password });
//     if (response.status === 200) {
//       const { token, email } = response.data;
//       return { email, token }; // Ajusta según el tipo de respuesta de tu API
//     }
//   } catch (error) {
//     console.error("Failed to authenticate user:", error);
//   }
//   return null; // Ensure a return value is always provided
// }

// export default NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             authorize: async (credentials) => {
//                 const parsedCredentials = z.object({
//                     email: z.string().email(),
//                     password: z.string().min(6)
//                 }).safeParse(credentials);

//                 if (parsedCredentials.success) {
//                     const { email, password } = parsedCredentials.data;
//                     const user = await authenticateUser(email, password);
//                     if (user) {
//                         return user;
//                     }
//                 }
//                 console.log("Credenciales inválidas");
//                 return null;
//             }
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 if ('token' in user) {
//                     token.accessToken = user.token; // Ajusta según el tipo de respuesta de tu API
//                 }
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.accessToken = token.accessToken as string | undefined; // Ajusta según el tipo de respuesta de tu API
//             return session;
//         }
//     }
// });

