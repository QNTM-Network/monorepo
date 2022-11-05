// components/layout.js
import {Header} from 'ui' 


import { setUser  } from "../../store/reducers/userSlice";
import { useAppDispatch} from "../../hooks/store"
import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {


  const dispatch = useAppDispatch();

	const login = () => {
		// @ts-ignore
		handleEthereum();
	};


async function handleEthereum() {

  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    // @ts-ignore
const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
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
      dispatch(setUser({address, name: 'Luke', email: 'luke@quantmn.com', _id: '123'}))
    } else {
      alert("install metamask extension!!");
    }
  };


  return (
    <div className={styles.layout}>
      <Header login={login}></Header>
      <main>{children}</main>
    </div>
  )
}
