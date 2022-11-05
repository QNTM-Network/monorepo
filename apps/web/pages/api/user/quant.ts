import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  await dbConnect();
  
  switch (method) {

    case 'POST':
      try {
        const user = await User.findOne({address: body.address});
        if (!user) {
          // create user
          const newUser = new User({
            address: body.address,
            daily_count: [{
              date: new Date(),
              count: 1
            }]
          })
          await newUser.save();
          return res.status(200).json({ success: true, message: 'Success' });
        } else {
          console.log('user exists', user)
          // update user
          const lastCount = user.daily_count[user.daily_count.length - 1];
          console.log('lastCount', lastCount)
          const today = new Date();
          console.log('today', today)
          if (lastCount) {
          if (lastCount.date.getDate() === today.getDate()) {
            // update count
            console.log('updating count')
            user.daily_count[user.daily_count.length - 1].count += 1;
            
          }} else {
            console.log('adding new count')
            // create new count
            user.daily_count.push({
              date: today,
              count: 1
            })
          }

          console.log('user', user);
          await user.save();
          return res.status(200).json({ success: true, message: 'Success' });
        }

      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }

}
