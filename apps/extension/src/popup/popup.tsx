import React, { useState } from "react";
import axios from "axios";
import { Button, Input  } from '@mui/material';
import {QuantList} from 'ui';

import { Header} from 'ui' 

const quants = [
  {
    id: 1,
    name: "Quant 1",
    description: "This is the first quant",
    created: "2021-10-01",
    date: "2021-10-01",
    repeat: false
  }
];

export function App() {

	const [input , setInput] = useState('');
  const [displayQuants, setDisplayQuants] = useState(quants);

  console.log({displayQuants})


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




  return (
    <>
    <Header/>
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
		<Button onClick={createQuant}>New item</Button>
		<Input value={input} onChange={e => setInput(e.target.value)}/>	
    <QuantList quants={displayQuants} displayQuants={displayQuants} setDisplayQuants={setDisplayQuants}/>
    </div>
  </>
  );
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg == "to-popup") {
    console.log("working");
    sendResponse(1);
  }
});
