import { get, startCase, toLower } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import Quant from "../../../models/Quant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method , headers} = req;

  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        console.log("trying");
        console.log(body);
        let { name, id} = body;


const foundQuant = await Quant.findById(id)
    if (foundQuant) {
console.log({foundQuant})
        const patchedQuant = await Quant.deleteOne(
          { _id: id },
        );
        console.log(patchedQuant);


    } else {
      console.log(name);
      const startCaseName = startCase(name)
const quantByCreated = await Quant.findOne({name: startCaseName})
const deleted = await Quant.deleteOne(quantByCreated)
console.log(deleted)
    }} catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
