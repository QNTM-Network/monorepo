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

    case 'POST':
      try {
        console.log('trying')
        let { name } = body
        console.log({name})
        name = startCase(name)
        const created_at = new Date()
        const removed = false
        await Quant.create({name, created_at, removed});


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
