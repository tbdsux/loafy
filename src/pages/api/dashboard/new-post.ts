import { handler } from '../../../lib/next-connect';
import { createPost, PostProps } from '../../../lib/posts';
import { getSession } from '../../../lib/session';
import { UserProps } from '../../../lib/user';

export default handler.post(async (req, res) => {
  const session = await getSession<UserProps>(req);

  const post: PostProps = req.body;

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  try {
    await createPost(post, session);

    res.status(200).json({ success: true, message: 'Successfully created a new post.' });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ success: false, message: 'There was a problem while trying to create a new post.' });
  }
});
