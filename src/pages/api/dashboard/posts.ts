import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPosts } from '../../../lib/posts';
import { getSession } from '../../../lib/session';
import { UserProps } from '../../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession<UserProps>(req);

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  const posts = await fetchPosts(session);

  res.status(200).json({ success: true, data: posts });
};

export default handler;
