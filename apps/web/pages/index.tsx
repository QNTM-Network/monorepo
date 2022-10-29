import { useState, useEffect, useContext} from "react";
import axios from "axios";
import {Button, Input} from "@mui/material";
import { get, find, map} from "lodash";
import { ethers } from "ethers";

import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setUser  } from "../store/reducers/userSlice";
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
  const [filter, setFilter] = useState("Tasks");
  const [tags, setTags] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const dispatch = useAppDispatch();


function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    connectMetaMask(ethereum.selectedAddress)
    console.log('ethereum', ethereum)
    setInput(ethereum.selectedAddress)
    // Access the decentralized web!
  } else {

    setInput('Please install MetaMask!')
    console.log('Please install MetaMask!');
  }
}

  useEffect(() => {

    if (window.ethereum) {
    handleEthereum();
  } else {
    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    });

    // If the event is not dispatched by the end of the timeout,
    // the user probably doesn't have MetaMask installed.
    setTimeout(handleEthereum, 3000); // 3 seconds
  }
  }, [quants])

  const connectMetaMask = async (address: string) => {
    if (address) {
      dispatch(setUser({address, name: 'Luke', email: 'luke@quantmn.com', _id: '123'}))
          setUserAddress(address);
    } else {
      alert("install metamask extension!!");
    }
  };



	const createQuant = () => {

      axios.post('/api/quant', {name: input, user: userAddress})
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

      setQuantsByTags(getQuantsByTags(quants, userAddress));
      console.log({quantsByTags});
    }
  }, [userAddress]);


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

