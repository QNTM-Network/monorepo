import { get, find, orderBy, forEach } from "lodash";
import { IQuant } from "ui"

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
    }
  });

  return quantsByTags;
};
