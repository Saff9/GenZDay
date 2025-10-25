import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { XataAdapter } from '@next-auth/xata-adapter';
import { xata } from './db';
import bcrypt from 'bcryptjs';

// Simple in-memory store for phone verification (use Redis in production)
const phoneVerificationCodes = new Map();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: XataAdapter(xata),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'phone',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        code: { label: 'Verification Code', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.phone) return null;

        // For demo - generate a simple code
        const expectedCode = '123456'; // In production, use Twilio
        if (credentials.code === expectedCode) {
          let user = await xata.db.users.filter({ phone: credentials.phone }).getFirst();
          
          if (!user) {
            user = await xata.db.users.create({
              phone: credentials.phone,
              name: `User_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date(),
              lastLogin: new Date(),
            });
          }

          return { id: user.id, phone: user.phone, name: user.name };
        }
        return null;
      },
    }),
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        let user = await xata.db.users.filter({ email: credentials.email }).getFirst();

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
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
