import { useState } from "react";
import {map} from "lodash";
import axios from "axios";
// @ts-ignore
import { Button } from "@mui/material";

import { DataRecord , Header} from "ui";
import {IQuant} from "../utils/types/index";

const NewQuant = () => {
	const [input , setInput] = useState('');
	const [displayQuants, setDisplayQuants] = useState(quants);

	const createQuant = () => {

		setDisplayQuants([...displayQuants, {name: input}]);
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
	setDisplayQuants(displayQuants.filter((q: IQuant) => q._id !== quant._id));
	const removed = true
	axios.patch(`/api/quant/${quant._id}`, {id: quant._id, name: quant.name, })
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
			<Header/>
			<NewQuant/>
		<Button onClick={createQuant}>New item</Button>
		<input value={input} onChange={e => setInput(e.target.value)}/>	
		{map(displayQuants, (quant, key) => {
			return (
				<div key={key}>
					<DataRecord handleDelete={handleDelete} dataRecord={quant} />
					</div>
			);
		})}
		</div>
	);
}
