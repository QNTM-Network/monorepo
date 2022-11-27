import { useCallback} from 'react';
import { get, isEmpty } from 'lodash';
import router from 'next/router';

// components/layout.js
//
import { useAppDispatch} from "../../hooks/store";
import { setUser } from "../../store/reducers/userSlice";
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

  const dispatch = useAppDispatch();


async function handleEthereum() {

  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    // @ts-ignore
const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    connectMetaMask(ethereum.selectedAddress, ethereum)
    // Access the decentralized web!
  } else {

    console.log('Please install MetaMask!');
  }
}


  const connectMetaMask = async (address: string, ethereum: any) => {
    if (address) {
      // const data = await axios.post('/api/user/check', {field: 'address', value: address, address: address});
      // const user = data.data;
      // console.log("user", user);
      // dispatch(setUser(user));
      router.push('/home');
    } else {
      alert("install metamask extension!!");
    }
  };


  // const handleLogin = useCallback(
  //   async (address: string) => {
  //     if (!address) return;

  //     setIsLoading(true);
  //     const result = await checkUser({ field: 'address', value: address });
  //     const errorStatus = get(result, 'error.status');

  //     const data = get(result, 'data');
  //     if (!isEmpty(data)) {
  //       dispatch(setUser({ ...data, usdcBalance: prevBalanceRef.current }));
  //     }

  //     setIsLoading(false);
  //   },
  //   [checkUser, dispatch]
  // );


  return (
    <div className={styles.layout}>
      <Header login={login}></Header>
      <main>{children}</main>
    </div>
  )
}
