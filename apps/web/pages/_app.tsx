import { useState, useEffect , useMemo} from "react";
import {map} from "lodash";
import { DataRecord, Header} from "ui";

const dataRecord = {
  title: "title",
  time: "time",
  url: "url",
};

const handleDelete = () => {
  console.log("delete");
};

const quants = [ {
  title: "title",
  time: "time",
  url: "url",
}]

import '../styles/base/_styles.scss'


export default function WebApp() {
	const [input , setInput] = useState('');
  const [quants, setQuants] = useState([{
  title: "title",
  time: "time",
  url: "url",
}]);


	const createQuant = () => {
const     newQuants = [...quants, {title: input, time: input, url: input}]
    setQuants(newQuants);

	}
  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <Header></Header>
      
		<input onChange={e => setInput(e.target.value)}/>	
    {map(quants, (quant, key) => {
      return (
        <div key={key}>
          <DataRecord handleDelete={handleDelete} dataRecord={quant} />
          </div>
      );
    })}
    </div>
  );
}
