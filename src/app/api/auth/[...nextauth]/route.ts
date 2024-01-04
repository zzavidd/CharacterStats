import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const nextAuthOptions: NextAuthOptions = {
  callbacks: {
    signIn: ({ user }) => user.email === process.env.ADMIN_EMAIL,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

function handler(req: NextApiRequest, res: NextApiResponse): unknown {
  return NextAuth(req, res, nextAuthOptions);
}

export { handler as GET, handler as POST };
