import axios  from 'axios';
import router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// components/layout.js
import {Header} from 'ui' 
import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
	const login = () => {
		// @ts-ignore
		handleEthereum();
	};


  return (
    <div className={styles.layout}>
      <Head>
        <title>Quantmn</title>
      </Head>
      <Header login={login}></Header>
      <main>{children}</main>
    </div>
  )
}
