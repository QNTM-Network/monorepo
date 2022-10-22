import { configureChains, chain, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider(), infuraProvider({apiKey: 'INFURA_API_KEY'})]

)

export const client: any = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})
