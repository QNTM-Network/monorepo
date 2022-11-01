// header component
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

//@ts-ignore
import styles from './Header.module.scss'

interface Props {
	login: () => void;
}

export const Header = ({login}: Props) => {


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

