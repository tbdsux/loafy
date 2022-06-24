import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, validatePassword } from '../../../../lib/auth';
import { getSession } from '../../../../lib/session';
import { findUserById, updateUserPassword, UserProps } from '../../../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession<UserProps>(req);

  if (!session) {
    res.status(403).json({ success: false, message: 'Invalid user session!' });
    return;
  }

  try {
    const { userid, currentPass, newPass } = req.body;

    const user = await findUserById(userid);
    if (!user) {
      res.status(403).json({ success: false, message: 'User does not exist.' });
      return;
    }

    if (!validatePassword(currentPass, user.password)) {
      res.status(403).json({ success: false, message: "User's current password is incorrect." });
      return;
    }

    await updateUserPassword(userid, hashPassword(newPass));
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "There was a problem while trying to update the user's password."
    });
    return;
  }

  res.status(200).json({ success: true, message: "Successfully updated the user's password." });
};

export default handler;
