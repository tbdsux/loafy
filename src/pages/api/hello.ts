/*
	THIS IS A BASE TEMPLATE FOR CREATING AN API ENDPOINT
*/

import type { NextApiRequest, NextApiResponse } from 'next';

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  res.end('hello');
};

export default api;
