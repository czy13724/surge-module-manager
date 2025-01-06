import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Octokit } from '@octokit/rest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const octokit = new Octokit({
    auth: session.accessToken as string
  });

  if (req.method === 'PUT') {
    try {
      const { gistId, filename, content } = req.body;
      await octokit.gists.update({
        gist_id: gistId,
        files: {
          [filename]: {
            content
          }
        }
      });
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
