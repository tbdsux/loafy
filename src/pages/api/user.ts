import { handler } from '../../lib/next-connect';
import { getSession } from '../../lib/session';
import { UserProps } from '../../lib/user';

export default handler.get(async (req, res) => {
  const user = await getSession<UserProps>(req);

  res.status(200).json({ success: true, data: user });
});
