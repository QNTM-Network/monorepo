// header component
import React , {useEffect,useState , useContext}from 'react';
import { Link } from 'react-router-dom';

import { ConnectButton } from '../ConnectButton';
//@ts-ignore
import styles from './Header.module.scss'

interface Props {
	login: () => void;
	isConnected: boolean;
	address: string | undefined;
}

export const Header = ({login, isConnected, address}: Props) => {



	return (
		<header className={styles.header}>
					<div className={styles.header__left}>
						<p style={{color: 'white'}}>metrics</p>
					</div>
					<div className={styles.header__center}>
      <h1 className={styles.header__title}>Quantmn Web</h1>
					</div>
					<div className={styles.header__right}>
					
						{console.log('isConnected', isConnected)}
	{isConnected ? <div style={{color: 'white'}}>Connected to {address}</div> : <button onClick={() => login()}>Connect Wallet</button>}
					</div>
		</header>
	);
};

