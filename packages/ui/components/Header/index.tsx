// header component
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

//@ts-ignore
import styles from './Header.module.scss'

interface Props {
	login: () => void;
	address: string | undefined;
}

export const Header = ({address}: Props) => {

	const login = () => {
		// @ts-ignore
		handleEthereum();
	};


async function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    // @ts-ignore
const accounts = await ethereum?.request({ method: 'eth_requestAccounts' });
    console.log('acc', accounts);
    console.log('Ethereum successfully detected!');
    connectMetaMask(ethereum.selectedAddress, ethereum)
    console.log('ethereum', ethereum)
    // Access the decentralized web!
  } else {

    console.log('Please install MetaMask!');
  }
}


  const connectMetaMask = async (address: string, ethereum: any) => {
    console.log('ethereum', ethereum)
    if (address) {
    } else {
      alert("install metamask extension!!");
    }
  };


	return (
		<header className={styles.header}>
					<div className={styles.header__left}>
						<p style={{color: 'white'}}>metrics</p>
					</div>
					<div className={styles.header__center}>
      <h1 className={styles.header__title}>Quantmn Web</h1>
					</div>
					<div className={styles.header__right}>
						<Button variant="contained" onClick={login}>Connect Wallet</Button>
					</div>
		</header>
	);
};

