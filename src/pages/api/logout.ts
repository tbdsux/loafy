import { NextApiRequest, NextApiResponse } from 'next';
import { removeSession } from '../../lib/session';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  removeSession(res);

  res.status(200).json({ success: true, message: 'Successfully logged out.' });
};

export default handler;
