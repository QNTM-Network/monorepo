import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


export const ConnectButton = () => {
 const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })


 if (isConnected) return <div style={{color: 'white'}}>Connected to {ensName ?? address}</div>
  return <button onClick={() => connect()}>Connect Wallet</button>

}
