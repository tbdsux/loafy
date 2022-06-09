import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/session';
import { UserProps } from '../../lib/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getSession<UserProps>(req);

  res.status(200).json({ success: true, data: user });
};

export default handler;
