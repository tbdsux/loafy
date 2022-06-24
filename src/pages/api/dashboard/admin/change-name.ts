import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../../../lib/session';
import { findUserById, updateUserUsername, UserProps } from '../../../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession<UserProps>(req);

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  try {
    const { userid, newUsername } = req.body;

    const user = await findUserById(userid);
    if (!user) {
      res.status(403).json({ success: false, message: 'User does not exist.' });
      return;
    }

    await updateUserUsername(userid, newUsername);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "There was a problem while trying to update the user's username."
    });
    return;
  }

  res.status(200).json({ success: true, message: "Successfully updated the user's username." });
};

export default handler;
