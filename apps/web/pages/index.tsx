import { useState } from "react";
import {map} from "lodash";
import { DataRecord } from "ui";
import dbConnect from "../utils/dbConnect";
import axios from "axios";
import Quant from "../models/Quant";
import {IQuant} from "../utils/types/index";



interface Props {
  quants: any;
}


const Web = ({quants}: Props) => {
	const [input , setInput] = useState('');


	const createQuant = () => {

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


const handleDelete = (quant: IQuant) => {
  console.log("delete");
  const removed = true
  axios.patch(`/api/quant/${quant._id}`, {id: quant._id, removed})
    .then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err.text);
      }
    );
  
};


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

export default Web;

export async function getServerSideProps() {

  
await dbConnect();
  const data = await Quant.find({removed: false});

  const quants = JSON.parse(JSON.stringify(data));

  

  return { props: { quants } };
}

