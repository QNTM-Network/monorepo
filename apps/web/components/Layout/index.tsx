// components/layout.js
import {Header} from 'ui' 

import  useWallet from '../../hooks/useWallet';

import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {

  const {handleLogin, isLoading} = useWallet();

  const login = () => {
      handleLogin('0x9F09de58B6EC16F8Eaf339e854BBE19672180cD0')
    }
  }
  return (
    <div className={styles.layout}>
			<Header address={address} isConnected={isConnected} login={login}/>
      <main>{children}</main>
    </div>
  )
}
