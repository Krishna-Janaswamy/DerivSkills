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
  allowDangerousEmailAccountLinking: true,
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
    async signIn({ user, account }) {
      if (account?.provider !== 'github') {
        return true;
      }

      if (!user?.email) {
        return true;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (existingUser && existingUser.id !== user.id) {
        const alreadyLinked = existingUser.accounts.some((acct) => acct.provider === 'github');
        if (!alreadyLinked) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
          });
        }
        user.id = existingUser.id;
      }

      return true;
    },
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
