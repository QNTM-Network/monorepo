import { map } from "lodash";

const findTagIndex = (tags: any, tag: any) => {
  return tags.findIndex((t: any) => t.name === tag);
};

export const updateCount = async (userToUpdate: any, tags: any, expected: number) => {
  const user = userToUpdate;
  console.log({ user });
  let lastCount = user.daily_count[user.daily_count.length - 1];
  console.log({ lastCount });
  const today = new Date();
  if (lastCount) {
    if (lastCount.date.getDate() === today.getDate()) {
      // update count count per tag
      console.log('updating today');
      lastCount.count = lastCount.count + 1;
      console.log({ lastCount });
      lastCount.expected = expected;
      lastCount.percentage = (100 / expected) * lastCount.count;
      if (lastCount.tags) {
        const tagIndex = findTagIndex(lastCount.tags, tags);
        map(tags, (tag) => {
          if (findTagIndex(lastCount.tags, tag) > -1) {
            lastCount.tags[findTagIndex(lastCount.tags, tag)].count++;          

          } else {
            lastCount.tags.push({
              name: tag,
              count: 1,
              expected,
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

      }
      user.daily_count[user.daily_count.length - 1] = lastCount;
      console.log('user.daily_count', user.daily_count);

    } else {
      user.daily_count.push({
        date: today,
        count: 1,
        expected,
        percentage: (expected / 1) * 100,
        tags: map(tags, (tag) => {
          return {
            name: tag,
            count: 1,
            expected,
          };
        }),
      });
    }
  } else {
    user.daily_count.push({
      date: today,
      count: 1,
      expected,
      percentage: (expected / 1) * 100,
    });
    user.daily_count[user.daily_count.length - 1].tags = map(tags, (tag) => {
      return {
        name: tag,
        count: 1,
        expected,
        percentage: (expected / 1) * 100,
      };
    });
  }
  console.log("user.daily_count", user.daily_count);
  return user;
};
