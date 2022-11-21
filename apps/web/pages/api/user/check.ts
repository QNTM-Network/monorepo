import { get } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import findExistingUser from '../../../utils/findExistingUser';
import createCookie from '../../../utils/createCookie';
import dbConnect from '../../../utils/dbConnect';
import  User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { field, value, address} = body;

        if (!field || !value) {
          res.status(400).json({ success: false, message: 'address is empty' });
        }

        const existingUser = await findExistingUser(field, value);

        if (existingUser) {
          const jwtCookie = createCookie('jwt', existingUser._id, {
            encrypt: true,
          });


          console.log({existingUser});

          const accountTypeCookie = createCookie(
            'account_type',
            existingUser.account_type,
            { encrypt: false }
          );


          const idCookie = createCookie('_id', existingUser._id, {
            encrypt: false,
            httpOnly: false,
          });

          res.setHeader('Set-Cookie', [jwtCookie, accountTypeCookie, idCookie]);
          return res.status(200).json(existingUser);
        }


        const newUser = await User.create({
          created_at: Date.now(),
          ...body,
        });

        console.log({newUser, body, address});

        const id = get(newUser, '_id', '') as string;

        const jwtCookie = createCookie('jwt', id, {
          encrypt: true,
        });


        const idCookie = createCookie('_id', id, {
          encrypt: false,
          httpOnly: false,
        });

        const accountTypeCookie = createCookie(
          'account_type',
          newUser.account_type,
          { encrypt: false }
        );

        res.setHeader('Set-Cookie', [
          jwtCookie,
          accountTypeCookie,
          idCookie,
        ]);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
