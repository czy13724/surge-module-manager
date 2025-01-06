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

  if (req.method === 'GET') {
    try {
      // 获取用户的所有私有 Gist
      const response = await octokit.gists.list();
      const gists = response.data.filter(gist => !gist.public);
      return res.status(200).json(gists);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { filename, content, description } = req.body;
      // 创建新的私有 Gist
      const response = await octokit.gists.create({
        files: {
          [filename]: {
            content
          }
        },
        description,
        public: false
      });
      return res.status(200).json(response.data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { gist_id, filename, content } = req.body;
      // 更新现有的 Gist
      const response = await octokit.gists.update({
        gist_id,
        files: {
          [filename]: {
            content
          }
        }
      });
      return res.status(200).json(response.data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
