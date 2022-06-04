import { CookieSerializeOptions, parse, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { decrypt, encrypt } from './iron';

const TOKEN_NAME = 'loafy';
const MAX_AGE_EXPIRES = 60 * 60 * 72; // 72 = 3 days
const DefaultCookieOpsBase: CookieSerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/'
};

const parseCookies = (req: NextApiRequest) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers.cookie;
  return parse(cookie || '');
};

// creates a new session and stores it in cookie
const createSession = async <T>(res: NextApiResponse, data: T) => {
  const token = await encrypt(data);

  const c = {
    expires: new Date(Date.now() + MAX_AGE_EXPIRES * 1000),
    maxAge: MAX_AGE_EXPIRES
  };

  const cookie = serialize(TOKEN_NAME, token, {
    ...DefaultCookieOpsBase,
    ...c
  });

  res.setHeader('Set-Cookie', cookie);
};

// gets and decrypts the session from the cookies
const getSession = async <T>(req: NextApiRequest) => {
  const cookies = parseCookies(req);
  return (await decrypt(cookies?.[TOKEN_NAME])) as T;
};

// removes the session from the cookies
const removeSession = (res: NextApiResponse) => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/'
  });

  res.setHeader('Set-Cookie', cookie);
};

export { createSession, getSession, removeSession };
