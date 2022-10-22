import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { isUndefined } from 'lodash';

interface IOptions {
  encrypt: boolean;
  httpOnly?: boolean;
}

export default function createCookie(
  name: string,
  value: string,
  options: IOptions
) {
  let token: string;
  const httpOnly = isUndefined(options.httpOnly) ? true : options.httpOnly;

  if (options.encrypt) {
    token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        _id: value,
      },
      process.env.JWT_SECRET as string
    );

    return serialize(name, token, {
      httpOnly,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }

  token = value;
  return serialize(name, token, {
    httpOnly,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}
