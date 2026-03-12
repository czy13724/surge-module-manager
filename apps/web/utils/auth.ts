import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export async function getAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | null> {
  const session = await getServerSession(req, res, authOptions);
  if (session?.accessToken) {
    return session.accessToken as string;
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token?.accessToken) {
    return token.accessToken as string;
  }

  return null;
}
