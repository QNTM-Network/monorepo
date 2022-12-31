import { isMobile } from 'react-device-detect';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { chain, createClient, configureChains } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

import { networkData } from '../utils/config';

const { chains, provider, webSocketProvider } = configureChains(
  [chain[networkData.networkName]],
  [
    infuraProvider({ infuraId: process.env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
  ]
);

export const client = createClient({
  autoConnect: true,
  connectors: isMobile
    ? [
        new InjectedConnector({
          chains,
          options: {
            name: (detectedName) =>
              `Injected (${
                typeof detectedName === 'string'
                  ? detectedName
                  : detectedName.join(', ')
              })`,
            shimDisconnect: true,
          },
        }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'quantmn',
            jsonRpcUrl: networkData.jsonRpc,
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
            rpc: {
              1: `https://mainnet.infura.io/v3/${networkData.infuraId}`,
              4: `https://rinkeby.infura.io/v3/${networkData.infuraId}`,
              420: `https://goerli.infura.io/v3/${networkData.infuraId}`,
            },
          },
        }),
      ]
    : [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'quantmn',
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
          },
        }),
      ],
  provider,
  webSocketProvider,
});
