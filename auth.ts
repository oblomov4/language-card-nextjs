import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { SelectUser, users } from './db/schema';
import { db } from './db';
import { compare, hashSync } from 'bcrypt';

import { Verification } from '@auth/core/errors';
import GitHub from 'next-auth/providers/github';
import { eq } from 'drizzle-orm';
import Google from 'next-auth/providers/google';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string;
      date: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.login,
          email: profile.email,
        };
      },
    }),
    GitHub({
      async profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
        };
      },
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const findUser: SelectUser | undefined = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email as string),
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password as string, findUser.password);

        if (!isPasswordValid) {
          return null;
        }

        if (!findUser.verified) {
          throw new Verification();
        }

        return {
          id: String(findUser.id),
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
          date: findUser.createdAt,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === 'credentials') {
        return true;
      }

      if (!user.email) {
        return false;
      }

      const findUser: SelectUser | undefined = await db.query.users.findFirst({
        where: (users, { or, eq, and }) =>
          or(
            and(
              eq(users.provider, account?.provider as string),
              eq(users.providerId, account?.providerAccountId as string),
            ),
            eq(users.email, user.email as string),
          ),
      });

      if (findUser) {
        await db
          .update(users)
          .set({ provider: account?.provider, providerId: account?.providerAccountId })
          .where(eq(users.id, findUser.id));

        return true;
      }

      await db.insert(users).values({
        email: user.email,
        fullName: user.name || 'User #' + user.id,
        password: hashSync(user.id!, 10),
        verified: new Date().toISOString(),
        provider: account?.provider,
        providerId: account?.providerAccountId,
      });

      return true;
    },

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const findUser: SelectUser | undefined = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email as string),
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
        token.date = findUser.createdAt;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.date = token.date as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
