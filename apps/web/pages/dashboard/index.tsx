import { find, get, map } from 'lodash';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/store';
import type { RootState } from '../../configureStore';
import { IDailyCount  } from 'ui';

const Dashboard = () => {
  const [todaysCount, setTodaysCount] = useState<number>(0);
  const [countPerDay, setCountPerDay] = useState<IDailyCount[]>()

  const user = useAppSelector((state: RootState) => state.reducer.user);

  useEffect(() => {
    if (user.address) {
      console.log({ user });

  const today = user.count[user.count.length - 1]
      const todayCount = get(today, 'count', 0);
      setTodaysCount(todayCount);
    }}, [user]);

  console.log({user});

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      <h2>{user.address}</h2>
    {user.count && user.count.length > 0 && (
      <h2>{todaysCount}</h2>
      // display each count per day
    )}
    <div style={{display:'flex'}}>

    { countPerDay?.map((c) => (
        <h2 style={{padding: '10px'}}>{c}</h2>
      ))}
    </div>
    </div>
  )
}

export default Dashboard
