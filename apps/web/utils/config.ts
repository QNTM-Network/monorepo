type Network = 'goerli' | 'mainnet';

const networkName = process.env.NEXT_PUBLIC_NETWORK as Network;
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const mongoDBprod = process.env.MONGODB_URI as Network;
const mongoDBdev = process.env.MONGODB_URI as string;

const provider = `wss://${networkName}.infura.io/ws/v3/${infuraId}`;
const jsonRpc = `https://${networkName}.infura.io/v3/${infuraId}`;

const mongoDB = networkName === 'mainnet' ? mongoDBprod : mongoDBdev;

export const networkData = {
  jsonRpc,
  provider,
  infuraId,
  networkName,
};

export const db = {
  mongoDB,
};

