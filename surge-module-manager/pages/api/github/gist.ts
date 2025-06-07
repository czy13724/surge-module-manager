import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Octokit } from '@octokit/rest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const octokit = new Octokit({
    auth: session.accessToken
  });

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const { gist_id, content } = req.body;
      
      if (!gist_id) {
        return res.status(400).json({ error: 'Missing gist_id' });
      }

      // First check if the gist exists and is accessible
      try {
        const gistResponse = await octokit.gists.get({
          gist_id,
        });
        
        // Check if the gist is accessible and belongs to the user
        if (!gistResponse.data || gistResponse.data.owner?.login !== session.user?.name) {
          return res.status(403).json({ 
            error: 'You do not have permission to access this gist'
          });
        }
      } catch (error: any) {
        if (error.status === 404) {
          return res.status(404).json({ 
            error: 'Gist not found or inaccessible'
          });
        }
        throw error;
      }

      // Update the gist
      const response = await octokit.gists.update({
        gist_id,
        files: {
          'surge-module.sgmodule': {
            content
          }
        }
      });
      
      return res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error updating gist:', error);
      return res.status(error.status || 500).json({ 
        error: error.message || 'Failed to update gist'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
