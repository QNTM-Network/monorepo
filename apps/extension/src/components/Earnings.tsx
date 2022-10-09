import { useState , useEffect, useContext} from "react";

import {format } from 'date-fns'

import { ProviderContext } from "../contexts/providerContext";
import { savePage	, getPages} from "../utils/page";
import Data from "./Data"


const Earnings = ( {pageContent , setPageContent} ) => {
	const { provider } = useContext(ProviderContext);
	const [balance, setBalance] = useState(null);
	const [input , setInput] = useState('');

	console.log('earnings provider', provider)
	const createQuant = async () => {

    await savePage(input, 'newquant', format(new Date(), "MMMM dd, yyyy"), format(new Date(), "p"))
		setPageContent(await getPages())

	}


	useEffect(() => {
chrome.runtime.onMessage.addListener( function(request)
{
    if( request.message === "balance" )
    {
			console.log('earnings', request.balance)
			setBalance(request.balance)
    }
})
}, [chrome.runtime.onMessage]);

const getPreviousBalance = async () => {
	chrome.storage.local.get(['balance'], function(result) {
		setBalance(result.balance)
	});
}

useEffect(() => {
	getPreviousBalance()
}, [])

	return (
		<div>
			<div className='earnings-section'>
			<p className='earnings-title'>Balance</p>	
		{balance ? 			<p className='earnings-amount'>{balance} ETRL</p>
: <p className='earnings-amount'>{balance}ETRL</p>}
		</div>
		<div className='earnings-section'>
			<p className='earnings-title'>Current Period Earnings</p>	
			<p className='earnings-amount'>34.01 ETRL</p>
		</div>
		<button onClick={createQuant}>New item</button>
		<input onChange={e => setInput(e.target.value)}/>	
			<Data setPageContent={setPageContent} pageContent={pageContent}/>
		</div>
	);
};

export default Earnings;
