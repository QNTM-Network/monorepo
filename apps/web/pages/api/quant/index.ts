import { startCase } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';

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
        let { name, date, period, user} = body
        console.log({date})
        name = startCase(name)
        const created_at = new Date()
        const final_date = date ? date : new Date()
        const quant = await Quant.create({name, created_at, period, date: final_date, user})
        console.log({quant})


        return res.status(200).json({ success: true, message: 'Success', data: quant });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }

}
