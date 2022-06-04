import { handler } from '../../lib/next-connect';
import { removeSession } from '../../lib/session';

export default handler.get((req, res) => {
  removeSession(res);

  res.status(200).json({ success: true, message: 'Successfully logged out.' });
});
