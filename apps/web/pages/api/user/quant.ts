import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { updateCount } from "../../../utils/quants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ address: body.address });
        if (!user) {
          // create user
          const newUser = new User({
            address: body.address,
            daily_count: [
              {
                date: new Date(),
                count: 1,
              },
            ],
          });
          await newUser.save();

        } else {
          // update user
          const updatedUser = updateCount(user, body.tags);

          await user.save();
          return res.status(200).json({ success: true, message: "Success" });
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
