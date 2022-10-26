import { useState, useEffect } from "react";
import axios from "axios";
import {Button, Input} from "@mui/material";
import { get, find, map} from "lodash";

import { getQuantsByTags } from "../utils/quantsByTags";
import { QuantItem, Tags, IQuant, IQuantsByTags, NewQuantSection } from "ui";
import dbConnect from "../utils/dbConnect";
import  Quant  from '../models/Quant';
import  useWallet from '../hooks/useWallet';


interface Props {
  quants: any;
}


const Web = ({quants}: Props) => {
	const [input , setInput] = useState('');
  const [quantsByTags, setQuantsByTags] = useState<IQuantsByTags>();
  const [displayQuants, setDisplayQuants] = useState<IQuant[]>([]);
  const [filter, setFilter] = useState("ViewAll");
  const [tags, setTags] = useState([]);

	const createQuant = () => {

      axios.post('/api/quant', {name: input}) 
        .then(
          (response) => {
            setInput( "");
            const newQuant = response.data.data;
            console.log({newQuant});
            setDisplayQuants([...displayQuants, newQuant]);
            console.log('response in createQuant', response);
          },
          (err) => {
            console.log(err.text);
          }
        );

	}



  useEffect(() => {
    if (quants) {
      //@ts-ignore
      setQuantsByTags(getQuantsByTags(quants));
      console.log({quantsByTags});
    }
  }, [quants]);


  useEffect(() => {
    if (quantsByTags) {
      const quants = get(quantsByTags, filter, []);
      setDisplayQuants(quants);
      console.log({displayQuants});
    }

      //@ts-ignore
    const tags = map(quantsByTags, "tag");
      //@ts-ignore
    setTags(tags);
      //@ts-ignore
    setDisplayQuants((find(quantsByTags, (tag) => tag.tag === "ViewAll")))
    
      

  }, [quantsByTags]);

  useEffect(() => {
    if (filter) {
      //@ts-ignore
      setDisplayQuants((quantsByTags?.find((t) => t.tag === filter) || { quants: [] }).quants);
    }
  }, [filter, quantsByTags]);

  console.log({displayQuants, quantsByTags});

  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <NewQuantSection createQuant={createQuant} input={input} setInput={setInput} />
    <Tags  setFilter={setFilter} tags={tags}/>
    <div>
			{map(displayQuants, (quant: IQuant, key: number) => {
				return (
					<div key={key}>
						<QuantItem setQuantsByTags={setQuantsByTags} displayQuants={displayQuants} quantsByTags={quantsByTags} setDisplayQuants={setDisplayQuants} quant={quant} />
					</div>
				);
			})}
    </div>
    </div>
  );
}

export default Web;

export async function getServerSideProps() {

  
await dbConnect();
  let cutoff = new Date();
  cutoff.setDate(cutoff.getDate());
  const data = await Quant.find({date: {$lte: cutoff}})

  const quants = JSON.parse(JSON.stringify(data));

  

  return { props: { quants } };
}

