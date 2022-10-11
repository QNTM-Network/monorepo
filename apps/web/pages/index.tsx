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

