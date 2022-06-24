import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../../../lib/session';
import { findUserById, updateUserEmail, UserProps } from '../../../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession<UserProps>(req);

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  try {
    const { userid, newEmail } = req.body;

    const user = await findUserById(userid);
    if (!user) {
      res.status(403).json({ success: false, message: 'User does not exist.' });
      return;
    }

    await updateUserEmail(userid, newEmail);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "There was a problem while trying to update the user's email."
    });
    return;
  }

  res.status(200).json({ success: true, message: "Successfully updated the user's email." });
};

export default handler;
