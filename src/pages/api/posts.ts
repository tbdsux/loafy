import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAllPosts } from '../../lib/posts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  const pageNum = Number(Array.isArray(page) ? page.join('') : page);

  const allPosts = await fetchAllPosts(pageNum);

  res.status(200).json({ success: true, data: allPosts });
};

export default handler;
