import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const authOptions = {
  adapter: PrismaAdapter(prisma), 
  providers: [
    GoogleProvider({
      clientId: requireEnv('GOOGLE_CLIENT_ID'),
      clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
    }),
    GitHubProvider({
      clientId: requireEnv('GITHUB_ID'),
      clientSecret: requireEnv('GITHUB_SECRET'),
    }),
  ],
  pages: {
    signIn: '/profile', 
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.presentRole = user.presentRole;
        session.user.emailVerified = user.emailVerified;
      }
      return session;
    }
  },
  secret: requireEnv('NEXTAUTH_SECRET'),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
