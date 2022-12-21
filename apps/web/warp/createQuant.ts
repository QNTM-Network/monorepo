import { warp, configureWallet } from './configureWarpServer.js'
import { transactionId } from '../transactionid.js'
import { v4 as uuid } from 'uuid'

async function createQuant() {
  let wallet = await configureWallet()
  const contract = warp.contract(transactionId).connect(wallet)
  await contract.writeInteraction({
    function: "createQuant",
    quant: {
      title: "Hi from first post!",
      id: uuid()
    }
  })
}

createQuant()
