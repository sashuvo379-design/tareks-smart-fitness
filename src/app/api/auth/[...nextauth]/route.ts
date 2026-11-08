import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    }),
    CredentialsProvider({
      name: 'IRONFORGE Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        if (credentials.email === 'admin@ironforge.gg') {
          return { id: 'admin-1', name: 'Commander Marcus', email: 'admin@ironforge.gg', role: 'ADMIN' };
        }
        return { id: 'member-1', name: 'Alex Mercer', email: credentials.email, role: 'MEMBER' };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || 'ironforge-super-secret-jwt-key-2026-production',
});

export { handler as GET, handler as POST };
