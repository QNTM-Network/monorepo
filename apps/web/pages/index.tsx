import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { get, find, map} from "lodash";

import { useAppSelector } from '../hooks/store';
import { getQuantsByTags } from "../utils/quantsByTags";
import { QuantItem, Tags, IQuant, IQuantsByTags, NewQuantSection } from "ui";
import dbConnect from "../utils/dbConnect";
import  Quant  from '../models/Quant';
import type { RootState } from '../configureStore';


interface Props {
  quants: any;
}


const Web = ({quants}: Props) => {
	const [input , setInput] = useState('');
  const [quantsByTags, setQuantsByTags] = useState<IQuantsByTags>();
  const [displayQuants, setDisplayQuants] = useState<IQuant[]>([]);
  const [filter, setFilter] = useState("Tasks");
  const [tags, setTags] = useState([]);
  


  const user = useAppSelector((state: RootState) => state.user);


	const createQuant = () => {

      axios.post('/api/quant', {name: input, user: user.address})
        .then(
          (response) => {
            setInput( "");
            const newQuant = response.data.data;
            setDisplayQuants([...displayQuants, newQuant]);
          },
          (err) => {
            console.log(err.text);
          }
        );

	}



  useEffect(() => {
    if (quants) {
      //@ts-ignore
      setQuantsByTags(getQuantsByTags(quants, user.address));
    }
  }, [user]);


  useEffect(() => {
    if (quantsByTags) {
      const quants = get(quantsByTags, filter, []);
      setDisplayQuants(quants);
    }

    const tags = map(quantsByTags, "tag");
      //@ts-ignore
    setTags(tags);
      //@ts-ignore
    setDisplayQuants((find(quantsByTags, (tag) => tag.tag === "ViewAll")))
    
      

  }, [quantsByTags]);

  useEffect(() => {
    if (filter) {
      //@ts-ignore
      setDisplayQuants((quantsByTags?.find((t: IQuantsByTags) => t.tag === filter) || { quants: [] }).quants);
    }
  }, [filter, quantsByTags]);


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

