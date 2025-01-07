import { NextAuthConfig, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export interface CustomUser extends User {
  role?: string;
}

export interface CustomSession extends Session {
  user: CustomUser;
}

interface CustomToken extends JWT {
  role?: string;
}

export default {
  trustHost: true,
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider == 'google') {
        token.sub = account.providerAccountId;
        token.role = 'USER';
        return token;
      }
      const customUser = user as CustomUser;
      if (user?.id) {
        token.sub = customUser.id;
        token.role = customUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;
      if (token?.sub && token?.role) {
        customSession.user = (customSession.user || {}) as CustomUser;
        customSession.user.id = customToken.sub;
        customSession.user.role = customToken.role;
      }
      return customSession;
    },
  },
} satisfies NextAuthConfig;
