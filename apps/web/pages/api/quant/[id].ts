import { get, startCase, toLower } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import Quant from "../../../models/Quant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        console.log("trying");
        console.log(body);
        let { id, removed } = body;

        console.log({ id, removed });
const filter = { _id: id};
const update = { removed: removed};

const foundQuant = await Quant.findById(id)
console.log(foundQuant)
        const patchedQuant = await Quant.findOneAndUpdate(
          filter,
          update
        );
        console.log(patchedQuant);


      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
