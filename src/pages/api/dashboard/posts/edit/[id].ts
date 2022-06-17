import { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '../../../../../lib/middleware/methods';
import { PostProps, updatePostById } from '../../../../../lib/posts';
import { getSession } from '../../../../../lib/session';
import { UserProps } from '../../../../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession<UserProps>(req);

  const { id } = req.query;
  const post: PostProps = req.body;

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  try {
    const newPost = await updatePostById(Number(Array.isArray(id) ? id.join('') : id), post);

    res
      .status(200)
      .json({ success: true, data: newPost, message: 'Succesfully updated the post.' });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ success: false, message: 'There was a problem trying to update the post.' });
  }
};

export default methodHandler(handler, ['POST']);
