import { Button } from '@mui/material';
import  Link  from 'next/link';
import { ConnectWallet } from "@thirdweb-dev/react";

import styles from './Header.module.scss'

interface Props {
	login: () => void;
}

export const Header = ({login}: Props) => {


	return (
		<header className={styles.header}>
			<div className={styles.header__left}>
				<Link href="/dashboard">
					<h1 className={styles.header__title}>Dashboard</h1>
				</Link>
				<Link href="/home">
					<h1 className={styles.header__title}>Home</h1>
				</Link>
			</div>
			<div className={styles.header__center}>
				<Link href="/">
					<h1 className={styles.header__title}>Quantmn</h1>
				</Link>
			</div>
			<div className={styles.header__right}>
      <ConnectWallet className={styles.header__right__connect}accentColor="white" colorMode="dark" />
			</div>
		</header>
	);
};

