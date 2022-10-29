import { find, forEach } from "lodash";
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

      const project = quant.tags.indexOf(
        'Projects'
      ) > -1
      if (!project) {
        const  existingTaskTag = find(quantsByTags, {
          tag: 'Tasks'
        });
        if (existingTaskTag) {
          existingTaskTag.quants.push(quant)
        } else {
        quantsByTags.push({
          tag: 'Tasks',
          quants: [quant]
        })
          
      }
        
  } 
  }});

  console.log({ quantsByTags });

  return quantsByTags;
};
