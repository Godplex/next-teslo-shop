import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "Correo elctronico",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        console.log({ credentials });

        return dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  //Custrom Pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  //Callbacks
  jwt: {},
  session: {
    maxAge: 2592000,
    strategy: "jwt",
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
          case "credentials":
            token.user = user;
            break;

          default:
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      //console.log({ session, token, user });
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
