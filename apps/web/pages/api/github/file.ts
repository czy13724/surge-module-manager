import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';
import { getAccessToken } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = await getAccessToken(req, res);

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const octokit = new Octokit({
    auth: accessToken
  });

  if (req.method === 'GET') {
    try {
      const { owner, repo, path } = req.query;
      const response = await octokit.repos.getContent({
        owner: owner as string,
        repo: repo as string,
        path: path as string
      });

      if ('content' in response.data) {
        const content = Buffer.from(response.data.content, 'base64').toString();
        return res.status(200).json({
          content,
          sha: response.data.sha
        });
      }
      return res.status(400).json({ error: 'Not a file' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { owner, repo, path, content, sha } = req.body;
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: 'Update via Surge Module Manager',
        content: Buffer.from(content).toString('base64'),
        sha
      });
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
