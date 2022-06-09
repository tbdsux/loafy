import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// methodHandler simple middleware that handles method not allowed responses
const methodHandler =
  (handler: NextApiHandler<any>, allowedMethods: string[]) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (!allowedMethods.includes(req.method ?? '')) {
      // if the client's request method is not in
      // the set `allowedMethods`, return error 405
      res.setHeader('Allow', allowedMethods);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // execute api function handler
    return handler(req, res);
  };

export default methodHandler;
