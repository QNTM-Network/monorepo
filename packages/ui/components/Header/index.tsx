// header component
import { Button } from '@mui/material';
import  Link  from 'next/link';

//@ts-ignore
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
					</div>
					<div className={styles.header__center}>
						<Link href="/">
      <h1 className={styles.header__title}>Quantmn Web</h1>
		</Link>
					</div>
					<div className={styles.header__right}>
						<Button variant="contained" onClick={login}>Connect Wallet</Button>
					</div>
		</header>
	);
};

