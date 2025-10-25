// lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { XataAdapter } from '@next-auth/xata-adapter';
import { xata } from './db';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: XataAdapter(xata),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        let user = await xata.db.users
          .filter({ email: credentials.email })
          .getFirst();

        if (!user && credentials.email && credentials.password) {
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          user = await xata.db.users.create({
            email: credentials.email,
            name: credentials.email.split('@')[0],
            password: hashedPassword,
            createdAt: new Date(),
            lastLogin: new Date(),
          });
        } else if (user && credentials.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password || '');
          if (!isValid) return null;
          await xata.db.users.update(user.id, { lastLogin: new Date() });
        }

        return user ? { id: user.id, email: user.email, name: user.name } : null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },
});
