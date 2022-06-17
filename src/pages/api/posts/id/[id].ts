import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPostById } from '../../../../lib/posts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  console.log(id)

  const post = await fetchPostById(Number(Array.isArray(id) ? id.join('') : id));

  res.json({
    success: post != null,
    data: post,
    message: post == null ? 'Post id not found.' : ''
  });
};

export default handler;
