import { useState, useEffect, useContext} from "react";
import { get, find, map} from "lodash";

import { QuantItem, Tags, IQuant, IQuantsByTags, NewQuantSection } from "ui";
import dbConnect from "../utils/dbConnect";
import  Quant  from '../models/Quant';


interface Props {
  quants: any;
}


const Web = ({quants}: Props) => {
	const [input , setInput] = useState('');
  const [quantsByTags, setQuantsByTags] = useState<IQuantsByTags>();
  const [displayQuants, setDisplayQuants] = useState<IQuant[]>([]);
  const [filter, setFilter] = useState("Tasks");
  const [tags, setTags] = useState([]);
  
 console.log({quants});


  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
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
  // find quants that are not completed and are due before today and don't have status of 0
  const data = await Quant.find({status: {$ne: 0}, date: {$lte: cutoff}}).sort({date: 1}).lean();

  const quants = JSON.parse(JSON.stringify(data));

  

  return { props: { quants } };
}

