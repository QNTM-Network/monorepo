import axios  from 'axios';
import router from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  useAddress,
  useUser,
  useLogin,
  useLogout,
  useMetamask,
} from "@thirdweb-dev/react";

// components/layout.js
import {Header} from 'ui' 
import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const address = useAddress();
	const login = () => {
		// @ts-ignore
		handleEthereum();
	};

  const connectWallet = async (address: string) => {
    if (address) {
      const data = await axios.post('/api/user/check', {field: 'address', value: address, address: address});
      const user = data.data;
      router.push('/home');
    } else {
      alert("install metamask extension!!");
    }
  };

  useEffect(() => {
    if (address) {
      connectWallet(address);
    }
  }, [address]);


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
