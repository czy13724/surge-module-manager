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

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: '无效的 Gist ID' });
  }

  if (req.method === 'PATCH') {
    try {
      const { content } = req.body;
      
      // First check if the gist exists and is accessible
      try {
        await octokit.gists.get({
          gist_id: id,
        });
      } catch (error: any) {
        if (error.status === 404) {
          return res.status(404).json({ 
            message: 'Gist 不存在或无权访问',
            details: error.message 
          });
        }
        throw error;
      }

      const response = await octokit.gists.update({
        gist_id: id,
        files: {
          'surge-module.sgmodule': {
            content,
          },
        },
      });

      return res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error updating gist:', error);
      return res.status(error.status || 500).json({ 
        message: '更新 Gist 失败',
        details: error.message 
      });
    }
  }

  return res.status(405).json({ message: '不支持的请求方法' });
}
