import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAllPosts } from '../../lib/posts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const allPosts = await fetchAllPosts();

  res.status(200).json({ success: true, data: allPosts });
};

export default handler;
