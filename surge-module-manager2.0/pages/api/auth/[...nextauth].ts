import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';

interface Token extends JWT {
  accessToken?: string;
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          scope: 'gist',
        },
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, account }): Promise<Token> {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token as Token;
    },
    async session({ session, token }: { session: any; token: Token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
