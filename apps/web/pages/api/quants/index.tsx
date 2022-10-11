import { get, startCase, toLower } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Quant from '../../../models/Quant';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  await dbConnect();
  
  switch (method) {

    case 'GET':
      try {
        console.log('trying')

        const quants = await Quant.find();

        if (!quants) {
          return res
            .status(400)
            .json({ success: false, message: 'Not found quants' });
        }

        res.status(200).json(quants);


        return res.status(200).json({ success: true, message: 'Success' });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
