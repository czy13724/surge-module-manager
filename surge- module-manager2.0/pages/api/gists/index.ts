import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Octokit } from '@octokit/rest';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session?.accessToken) {
    return res.status(401).json({ message: '未授权' });
  }

  const octokit = new Octokit({
    auth: session.accessToken,
  });

  if (req.method === 'POST') {
    try {
      const { content } = req.body;
      const response = await octokit.gists.create({
        files: {
          'surge-module.sgmodule': {
            content,
          },
        },
        public: false,
        description: 'Surge Module',
      });

      res.status(201).json(response.data);
    } catch (error) {
      console.error('创建 Gist 失败:', error);
      res.status(500).json({ message: '创建 Gist 失败' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
