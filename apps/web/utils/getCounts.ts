import {
  filter,
  compact,
  map,
  sum,
} from "lodash";
import { isBefore, isSameDay } from "date-fns";

import { nonTasks } from "./constants";
import { IQuant } from "ui";

interface IQuantWithCount extends IQuant {
  count: number;
}

export const getCounts = (quants: IQuantWithCount[]) => {
  // check if quants are available for today

  const today = new Date();

  const relevantQuants = map(quants, (quant) => {
    // check if quant has a date on or before today

    const isAvailable =
      isBefore(new Date(quant.date || new Date()), new Date()) ||
      isSameDay(new Date(quant.date || new Date()), new Date());

    const isNotTask = !nonTasks.some((nonTask) => quant.tags.includes(nonTask));

    const isActive = quant.status == 1;

    // return quant if it is available and not a task
    if (isActive && isNotTask) {
      let quantWithCount = quant;
      if (quant.period) {
        switch (quant.period) {
          case "Daily":
            quantWithCount.count = 1;
            break;
          case "Two":
            quantWithCount.count = 1 / 2;
            break;
          case "Three":
            quantWithCount.count = 1 / 3;
            break;
          case "Weekly":
            quantWithCount.count = 1 / 7;
            break;
          case "Fortnightly":
            quantWithCount.count = 1 / 14;
            break;
        }
      } else if (isAvailable) {
        console.log("availble quant", quant);
        quantWithCount.count = 1;
      }

      console.log({ quantWithCount });
      return quantWithCount;
    }
  });

  // map through the array removing undefined values
  const filteredQuants = compact(relevantQuants);
  console.log({ filteredQuants });


  // sum the counts from each quant
  const count = sum(map(filteredQuants, "count"));


  console.log("count", count);
  return count;
};
