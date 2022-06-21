import { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '../../../../../lib/middleware/methods';
import { deletePostById } from '../../../../../lib/posts';
import { getSession } from '../../../../../lib/session';
import { UserProps } from '../../../../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession<UserProps>(req);

  const { id } = req.query;

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  try {
    await deletePostById(Number(Array.isArray(id) ? id.join('') : id));

    res.status(200).json({ success: true, message: 'Succesfully deleted the post.' });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ success: false, message: 'There was a problem trying to delete the post.' });
  }
};

export default methodHandler(handler, ['DELETE']);
