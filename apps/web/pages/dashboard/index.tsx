import { find, get, map } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../../store';

import { IDailyCount, IUser} from 'ui';
import { getTodayCount, getCountPerDay } from '../../utils/getTodayCount';
import { selectUser } from '../../store/reducers/userSlice';

interface Props {
  user: IUser;
}

const Dashboard = () => {
  const [todayCount, setTodayCount] = useState<number>(0);
  const [countPerDay, setCountPerDay] = useState<IDailyCount[]>()

  const user = useSelector(selectUser);
  console.log({ user });


  useEffect(() => {
    if (user.address) {
      console.log({ user });

      setTodayCount(getTodayCount(user))

      setCountPerDay(getCountPerDay(user) as IDailyCount[])

    }
  }, []);


  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user.address}</h2>
    {todayCount && <h2>{todayCount}</h2>}
    <div style={{display:'flex'}}>

    { map(countPerDay, (day) => {
      return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <h2 style={{padding: '10px'}}>{day.date}</h2>
        <h2 style={{padding: '10px'}}>{day.count}</h2>
      </div>
      )
      })}
      <div>

      </div>
    </div>
    </div>
  )
}

export default Dashboard


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {

      const userData = query.user || 'holding user'
  
  
  console.log({userData})

  console.log({query});

      return {
        props: {
          user: userData
        },
      };
    }
);
