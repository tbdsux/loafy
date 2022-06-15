import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPostBySlug } from '../../../lib/posts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const post = await fetchPostBySlug(Array.isArray(slug) ? slug.join('') : slug);

  res.json({
    success: post != null,
    data: post,
    message: post == null ? 'Post slug not found.' : ''
  });
};

export default handler;
