import { useState , useEffect, useContext} from "react";

import {format } from 'date-fns'


export const Earnings = ( ) => {
	const [balance, setBalance] = useState(null);
	const [input , setInput] = useState('');


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
		</div>
	);
};

