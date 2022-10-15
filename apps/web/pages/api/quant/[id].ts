import { startCase} from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import Quant from "../../../models/Quant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method,  query: {id, name}} = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {

        const foundQuant = await Quant.findById(id);
        if (foundQuant) {
          await Quant.deleteOne({ _id: id });
        } else {
          const quantByCreated = await Quant.findOne({ name: name});

          await Quant.deleteOne(quantByCreated);
        }
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case "PATCH":
      try {
        const quant = await Quant.findOne(
          {_id: id},
        );

        if (!quant) {
          return res.status(400).json({ success: false });
        }
        quant.set(body)
        await quant.save();
        res.status(200).json({ success: true, data: quant });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
          

    default:
      res.status(400).json({ success: false });
      break;
  }
}
