import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Octokit } from '@octokit/rest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    if (!session?.accessToken) {
      console.error('Authentication error: No access token found in session');
      return res.status(401).json({ error: 'Unauthorized - Please log in again' });
    }

    const octokit = new Octokit({
      auth: session.accessToken
    });

    if (req.method === 'GET') {
      try {
        // 获取用户的所有 Gist，包括私有的
        const response = await octokit.gists.list({
          per_page: 100  // 增加每页数量以确保获取所有 gist
        });
        
        // 过滤出包含 surge-module.sgmodule 文件的 gist
        const gists = response.data.filter(gist => 
          Object.keys(gist.files).some(filename => 
            filename.toLowerCase().endsWith('.sgmodule')
          )
        );
        
        console.log('Found Surge module gists:', gists.length);
        return res.status(200).json(gists);
      } catch (error: any) {
        console.error('Error fetching gists:', error);
        return res.status(error.status || 500).json({ 
          error: 'Failed to fetch gists',
          details: error.message
        });
      }
    }

    if (req.method === 'POST') {
      try {
        const { filename, content, description } = req.body;
        
        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }

        // 创建新的 Gist
        const response = await octokit.gists.create({
          files: {
            [filename || 'surge-module.sgmodule']: {
              content
            }
          },
          description: description || 'Surge Module',
          public: false
        });

        console.log('Created new gist:', response.data.id);
        return res.status(200).json(response.data);
      } catch (error: any) {
        console.error('Error creating gist:', error);
        return res.status(error.status || 500).json({ 
          error: 'Failed to create gist',
          details: error.message
        });
      }
    }

    if (req.method === 'PUT') {
      try {
        const { gist_id, filename, content } = req.body;
        
        if (!gist_id || !filename || !content) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // 更新现有的 Gist
        const response = await octokit.gists.update({
          gist_id,
          files: {
            [filename]: {
              content
            }
          }
        });

        console.log('Updated gist:', gist_id);
        return res.status(200).json(response.data);
      } catch (error: any) {
        console.error('Error updating gist:', error);
        return res.status(error.status || 500).json({ 
          error: 'Failed to update gist',
          details: error.message
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}
