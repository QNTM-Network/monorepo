import { find, get, map, reverse } from 'lodash';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IDailyCount, IUser, IQuant} from 'ui';
import { getTodayCount, getCountPerDay } from '../../utils/getTodayCount';
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getCounts } from '../../utils/getCounts';
import Quant from "../../models/Quant";
import dbConnect from "../../utils/dbConnect";
import findExistingUser from "../../utils/findExistingUser";

interface Props {
  user: IUser;
  quants: IQuant[];
}

interface IQuantWithCount extends IQuant {
  count: number;
}

const Dashboard = ({quants }:Props)  => {
  const [todayCount, setTodayCount] = useState<number>(0);
  const [countPerDay, setCountPerDay] = useState<IDailyCount[]>()
  const [dayCount, setDayCount] = useState<number>(0);

  const user = useAppSelector((state) => state.user);

  console.log("user", user);

  useEffect(() => {
    if (user.address) {
      console.log({ user });
      console.log('day count', getCounts(quants as IQuantWithCount[]));

      setDayCount(getCounts(quants as IQuantWithCount[]));

      setTodayCount(getTodayCount(user))

      setCountPerDay(reverse(getCountPerDay(user)) as IDailyCount[])

    }
  }, []);


  return (
    <div>
      <h1>Dashboard</h1>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', paddingBottom: '20px'}}>
    <div style={{display:'flex', flexDirection:'column'}}>
      <h2>User</h2>
      <h2>{user.address}</h2>
    </div>
    <div style={{display:'flex', flexDirection:'column'}}>
      <h2>Today Expectation</h2>
  <h2>{dayCount}</h2>
</div>
    <div style={{display:'flex', flexDirection:'column'}}>
      <h2>Today Count</h2>
    {todayCount && <h2>{todayCount}</h2>}
  </div>
    <div style={{display:'flex', flexDirection:'column'}}>
  <h2>Percentage</h2>
  <h2>{todayCount / dayCount}</h2>
    </div>
</div>
  <div style={{display:'flex', flexDirection:'column'}}>
    { map(countPerDay, (day) => {
      return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <h2 style={{padding: '10px'}}>{format(new Date(day.date), 'EEEE MM/dd/yyyy')}</h2>
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

export async function getServerSideProps(context: any) {


       const fetchUsersAndquants = async () => {
      const userId = get(context, "req.cookies._id");
      console.log("userId", userId);

      const userResult = await findExistingUser("_id", userId);
      const user = JSON.parse(JSON.stringify(userResult));

      console.log('user address', user.address)
      const result = await Quant.find({ user: user.address, status: {$ne: 0 }}).sort({ createdAt: -1 });
      const quants = JSON.parse(JSON.stringify(result));

      return { user, quants };
    };
    
    const { user, quants } = await fetchUsersAndquants();
        
  
      return {
        props: {
          quants
        },
      };
    }
