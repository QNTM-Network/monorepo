import { find, forEach } from "lodash";
import { IQuant } from "ui";
import { isBefore, isAfter, isSameDay } from "date-fns";

export const getQuantsByTags = (quants: IQuant[]) => {
  const quantsByTags = [
    {
      tag: "ViewAll",
      quants: quants,
    },
  ];

  forEach(quants, (quant) => {
    if (quant) {
      // map through each quant and add to the quantsByTags array
      forEach(quant.tags, (tag) => {
        const existingTag = find(quantsByTags, { tag });
        if (existingTag) {
          existingTag.quants.push(quant);
        } else {
          quantsByTags.push({
            tag,
            quants: [quant],
          });
        }
      });

      // add quant to period tag
      const existingPeriodTag = find(quantsByTags, {
        tag: quant.period,
      });
      if (existingPeriodTag) {
        existingPeriodTag.quants.push(quant);
      } else {
        if (quant.period) {
          quantsByTags.push({
            tag: quant.period,
            quants: [quant],
          });
        }
      }

      const nonTasks = ["Projects", "Ideas", "Goals"];

      // variable that returns true if quant.tags does not include any of the nonTasks
      const isNotTask = nonTasks.some((nonTask) =>
        quant.tags.includes(nonTask)
      );
      // check if tasks date is now available on or after today
      const isAvailable =
        isBefore(new Date(quant.date || new Date()), new Date()) ||
        isSameDay(new Date(quant.date || new Date()), new Date());

      if (!isNotTask && isAvailable) {
        const existingTaskTag = find(quantsByTags, {
          tag: "Tasks",
        });
        if (existingTaskTag) {
          existingTaskTag.quants.push(quant);
        } else {
          quantsByTags.push({
            tag: "Tasks",
            quants: [quant],
          });
        }
      } else if (!isAvailable) {
        const existingFutureTag = find(quantsByTags, {
          tag: "Upcoming",
        });
        if (existingFutureTag) {
          existingFutureTag.quants.push(quant);
        } else {
          quantsByTags.push({
            tag: "Upcoming",
            quants: [quant],
          });
        }
      }
    }
  });

  return quantsByTags;
};
