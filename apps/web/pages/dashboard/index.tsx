import { find, get, map, reverse } from "lodash";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { wrapper } from "../../store";

import { IDailyCount, IUser, IQuant } from "ui";
import { getTodayCount, getCountPerDay } from "../../utils/getTodayCount";
import { selectUser } from "../../store/reducers/userSlice";
import Quant from "../../models/Quant";
import dbConnect from "../../utils/dbConnect";
import findExistingUser from "../../utils/findExistingUser";

interface Props {
  user: IUser;
  quants: IQuant[];
}

interface IQuantWithExpectation extends IQuant {
  count: number;
}

const Dashboard = ({ quants }: Props) => {
  const [todayCount, setTodayCount] = useState<number>(0);
  const [countPerDay, setCountPerDay] = useState<IDailyCount[]>();
  const [percentage, setPercentage] = useState<number>(0);
  const [dayExpectation, setDayExpectation] = useState<number>(0);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.address) {
      setDayExpectation(user.dailyCount[user.dailyCount.length - 1]["expected"]);

      setTodayCount(user.dailyCount[user.dailyCount.length - 1]['count'])

      setPercentage(user.dailyCount[user.dailyCount.length - 1]!['percentage'])

      setCountPerDay(reverse(getCountPerDay(user)) as IDailyCount[]);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{ display: "flex", padding: "10px", flexDirection: "column" }}
        >
          <h2>Today Expectation</h2>
          <h2>{dayExpectation}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Today Count</h2>
          {todayCount && <h2>{todayCount}</h2>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Percentage</h2>
          <h2>{percentage}%</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {map(countPerDay, (day) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h2 style={{ padding: "10px" }}>
                {format(new Date(day.date), "EEEE MM/dd/yyyy")}
              </h2>
              <h2 style={{ padding: "10px" }}>{day.count}</h2>

              <h2 style={{ padding: "10px" }}>{day.percentage}%</h2>
              <h2 style={{ padding: "10px" }}>{day.expected}</h2>
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      await dbConnect();

      const userId = get(req, "cookies._id");

      const userResult = await findExistingUser("_id", userId);
      const user = JSON.parse(JSON.stringify(userResult));

      const result = await Quant.find({
        user: user.address,
        status: { $ne: 0 },
      }).sort({ createdAt: -1 });
      const quants = JSON.parse(JSON.stringify(result));

      return {
        props: {
          quants,
          user,
        },
      };
    }
);
