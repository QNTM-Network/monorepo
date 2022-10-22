// components/layout.js
import {Header} from 'ui' 
import { useAccount, useConnect, useEnsName , WagmiConfig} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import  useWallet from '../../hooks/useWallet';

import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {

  const {handleLogin, isLoading} = useWallet();
 const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const login = () => {
    connect()
    if (address) {
      handleLogin(address)
    }
  }
  return (
    <div className={styles.layout}>
			<Header address={address} isConnected={isConnected} login={login}/>
      <main>{children}</main>
    </div>
  )
}
