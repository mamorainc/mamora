import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from '@/schemas';
import { api } from '@/lib/axios';
import authConfig from '@/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const validatedFields = LoginSchema.safeParse({ email, password });

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          try {
            const response = await api.post('/api/v1/user/signin', {
              email,
              password,
            });

            if (response.status != 200) {
              return null;
            } else {
              const { user } = response.data.data;
              if (user) {
                return user;
              }
              return null;
            }
          } catch (e) {
            console.error(e);
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
