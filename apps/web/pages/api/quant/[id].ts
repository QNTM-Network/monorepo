import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import Quant from "../../../models/Quant";
import {
  getDateFromPeriod,
} from "../../../utils/dates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { id, name },
  } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        const foundQuant = await Quant.findById(id);
        if (foundQuant) {
          await Quant.deleteOne({ _id: id });
        } else {
          const quantByCreated = await Quant.findOne({ name: name });

          await Quant.deleteOne(quantByCreated);
        }
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case "PATCH":
      try {
        const quant = await Quant.findOne({ _id: id });

        // find quants with ids from the children
        if (body.children) {
          const children = await Quant.find({
            name: {
              $in: body.children,
            },
          });
          const childrenIds = children.map((child) => child._id.toString());

          // update many quants with ids from the children
          const updated = await Quant.updateMany(
            {
              _id: childrenIds,
            },
            {
              $push: {
                tags: quant.name,
              },
            }
          );
        }

        if (body.tags) {
          const parents = await Quant.find({
            name: {
              $in: body.tags,
            },
          });
          const parentsIds = parents.map((parents) => parents._id.toString());


          // update many quants with ids from the children
          const updated = await Quant.updateMany(
            {
              _id: parentsIds,
            },
            {
              $push: {
                children: quant.name,
              },
            }
          );
        }

        if (!quant) {
          return res.status(400).json({ success: false });
        }

        if (quant.period && (quant.period !== "None" || quant.period != "Dark Matter") && body.status === 0) {
          quant.set({
            ...body,
            date: getDateFromPeriod(
              body.period,
              new Date()
            ),
            status: 1,
          });
        } else {
          quant.set({ ...body });
        }

        const saveQuant = await quant.save();

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
