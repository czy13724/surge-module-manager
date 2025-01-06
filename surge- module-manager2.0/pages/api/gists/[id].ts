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

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { content } = req.body;
      const response = await octokit.gists.update({
        gist_id: id as string,
        files: {
          'surge-module.sgmodule': {
            content,
          },
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('更新 Gist 失败:', error);
      res.status(500).json({ message: '更新 Gist 失败' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await octokit.gists.delete({
        gist_id: id as string,
      });

      res.status(204).end();
    } catch (error) {
      console.error('删除 Gist 失败:', error);
      res.status(500).json({ message: '删除 Gist 失败' });
    }
  } else {
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
