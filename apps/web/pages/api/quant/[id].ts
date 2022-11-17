import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../utils/dbConnect";
import Quant from "../../../models/Quant";
import { getDateFromPeriod, getMostRecentDateFromDateOrToday } from "../../../utils/dates";

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


        console.log("body", body);
        
        const quant = await Quant.findOne(
          {_id: id},
        );

        // find quants with ids from the children
        const children = await Quant.find({
          _id: {
            $in: body.children,
          },
        });
        const childrenIds = children.map((child) => child._id.toString());

        console.log("children", children, 'childrenIds', childrenIds);
        // update many quants with ids from the children
        const updated = await Quant.updateMany(
          {
            _id: childrenIds,
          },
          {
            $push: {
                parents: quant._id,
            }});


        console.log("children", children);
        console.log("updated", updated);


        if (!quant) {
          return res.status(400).json({ success: false });
        }
        
        if (quant.period && quant.period !== "none") {
          quant.set({
            ...body,
            date: getDateFromPeriod(body.period, getMostRecentDateFromDateOrToday(quant.date || quant.created_at)),
            status: 1,
          })

        } else {
        quant.set({...body});
      }
         console.log({quant})

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
