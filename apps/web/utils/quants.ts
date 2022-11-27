import { map } from "lodash";

const findTagIndex = (tags: any, tag: any) => {
  return tags.findIndex((t: any) => t.name === tag);
};



export const updateCount = async (userToUpdate: any, tags: any) => {
  const user = userToUpdate;
  let lastCount = user.daily_count[user.daily_count.length - 1];
  const today = new Date();
  console.log({ lastCount, today });
  if (lastCount) {
    if (lastCount.date.getDate() === today.getDate()) {
      // update count count per tag
        lastCount.count = lastCount.count + 1;
      console.log("update count count per tag");
      if (lastCount.tags) {
        const tagIndex = findTagIndex(lastCount.tags, tags);
        console.log({ tagIndex });
        map(tags, (tag) => {
          if (findTagIndex(lastCount.tags, tag) > -1) {
            lastCount.tags[findTagIndex(lastCount.tags, tag)].count++;
          } else {
            lastCount.tags.push({
              name: tag,
              count: 1,
            });
          }
        });
      } else {
        lastCount.tags = map(tags, (tag) => {
          return {
            name: tag,
            count: 1,
          };
        });

        console.log("no tags");
      }

      console.log({ lastCount });
      user.daily_count[user.daily_count.length - 1] = lastCount;
      await user.save();
      // update count
      lastCount.count += 1;
    } else {
      // create new count
      console.log("create new count");
      user.daily_count.push({
        date: today,
        count: 1,
        tags: map(tags, (tag) => {
          return {
            name: tag,
            count: 1,
          };
        }),
      });
    }
  } else {
    user.daily_count.push({
      date: today,
      count: 1,
    });
    user.daily_count[user.daily_count.length - 1].tags = map(tags, (tag) => {
      return {
        name: tag,
        count: 1,
      };
    });
  }
  return user;
};

