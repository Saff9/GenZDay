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
        phone: { label: 'Phone', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // Find user by email
        let user = await xata.db.users
          .filter({ email: credentials.email })
          .getFirst();

        // If new user, create account
        if (!user && credentials.email && credentials.password) {
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          
          user = await xata.db.users.create({
            email: credentials.email,
            phone: credentials.phone || null,
            name: credentials.email.split('@')[0], // Default name
            password: hashedPassword,
            createdAt: new Date(),
            lastLogin: new Date(),
          });
        } else if (user && credentials.password) {
          // Verify password for existing user
          const isValid = await bcrypt.compare(credentials.password, user.password || '');
          if (!isValid) return null;
          
          // Update last login
          await xata.db.users.update(user.id, {
            lastLogin: new Date(),
          });
        }

        return user ? {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        } : null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
});
