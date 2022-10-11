import { useState, useEffect , useMemo} from "react";
import {map} from "lodash";
import { DataRecord } from "ui";
import dbConnect from "../utils/dbConnect";
import axios from "axios";
import Quant from "../models/Quant";


const handleDelete = () => {
  console.log("delete");
};


interface Props {
  quants: any;
}


export default function Web({quants}: Props) {
	const [input , setInput] = useState('');



	const createQuant = () => {
    console.log({quants})

      axios.post('/api/quant', {name: input}) 
        .then(
          (response) => {
            setInput( "");
          },
          (err) => {
            console.log(err.text);
          }
        );

	}
  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <h1>Quantmn Web</h1>
		<button onClick={createQuant}>New item</button>
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

export async function getServerSideProps() {

  
    await dbConnect();
  const data = await Quant.find();
  console.log({data})

  const quants = JSON.parse(JSON.stringify(data));

  
console.log({quants})

  return { props: { quants } };
}

