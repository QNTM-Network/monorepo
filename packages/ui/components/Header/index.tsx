// header component
import React , {useEffect,useState , useContext}from 'react';
import { Link } from 'react-router-dom';

//@ts-ignore
import styles from './Header.module.scss'

interface Props {
	login: () => void;
	address: string | undefined;
}

export const Header = ({login, address}: Props) => {



	return (
		<header className={styles.header}>
					<div className={styles.header__left}>
						<p style={{color: 'white'}}>metrics</p>
					</div>
					<div className={styles.header__center}>
      <h1 className={styles.header__title}>Quantmn Web</h1>
					</div>
					<div className={styles.header__right}>
					
					</div>
		</header>
	);
};

