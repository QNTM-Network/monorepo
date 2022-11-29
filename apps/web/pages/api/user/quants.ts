import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { updateCount } from "../../../utils/quants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { 
    body, 
    method 
  } = req;

  await dbConnect();

  const { address } = body;



  switch (method) {
    case "GET":
      try {

      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
