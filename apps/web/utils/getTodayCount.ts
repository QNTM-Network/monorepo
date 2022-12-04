import {IUserLogin } from 'ui';

import { get, map } from 'lodash';

export const getTodayCount = (user: IUserLogin) => {

  const today = user.dailyCount[user.dailyCount.length - 1]
      const todayCount = get(today, 'count', 0);

  return todayCount;
}

export const getCountPerDay = (user: IUserLogin ) => {
      const countPerDay = map(user.dailyCount, (day) => {
        const count = get(day, 'count', 0);
        const percentage = get(day, 'percentage', 0);
        const expected = get(day, 'expected', 0);
        const date = get(day, 'date', '');
        return { count, date, percentage, expected };
      });
  return countPerDay;
    }

