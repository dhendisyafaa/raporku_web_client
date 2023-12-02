import { nextAuthSecret } from "@/configs/config";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../services/authApi";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: nextAuthSecret,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Label",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const login = await loginUser({ username, password });
        if (login) {
          return login;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      account.access_token = user.data.accessToken;
      account.level = user.data.level;
      account.username = user.data.username;
      account.userId = user.data.userId;
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.level = account.level;
        token.name = account.name;
        token.username = account.username;
        token.userId = account.userId;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
