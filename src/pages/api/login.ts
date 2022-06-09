import { NextApiRequest, NextApiResponse } from 'next';
import { validatePassword } from '../../lib/auth';
import methodHandler from '../../lib/middleware/methods';
import { createSession } from '../../lib/session';
import { findUser } from '../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await findUser(email);

    if (user) {
      if (validatePassword(password, user.password)) {
        const { id, username, email } = user;

        // create session
        await createSession(res, { id, username, email });

        // send logged in info
        res.status(200).json({ success: true, message: 'Successfully logged in!' });
        return;
      }
    }

    res.status(403).json({ success: false, message: 'Invalid email or password.' });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ success: false, message: 'There was a problem trying to login your credentials.' });
  }
};

export default methodHandler(handler, ['POST']);
