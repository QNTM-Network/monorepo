import React, { useState, useEffect, useCallback, useContext } from "react";
import { format } from "date-fns";

import  Earnings  from "../Earnings";
import YourData from "../YourData";
import History from "../History";

const Page = () => {
  const [pageContent, setPageContent] = useState("");
	const [page, setPage ] = useState('')
  

  const renderSection = useCallback(() => {
    switch (page) {
      case "earnings" || "home":
        return <Earnings  />;
      case "my data":
        return <YourData />;
      case "history":
        return <History />;
    }
  }, [page, pageContent])

  if (page ==='stakingOff'){
        return (
          <div className="staking-section">
          <p className="staking-paused">Staking is paused</p>
        </div>
        )
    } else  {
        return (

    <div className="page">
      <div className="page-content">
        {renderSection()}
        <div className="holding-page">
          <p className="holding-page-text">Coming soon</p>
</div>
      </div>
    </div>
        )

};
}


export default Page;
