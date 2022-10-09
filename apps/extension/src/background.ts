import { useEffect, useState , useContext} from "react";
import axios from "axios";
const { ethers } = require("ethers");
const { StreamrClient, StreamPermission } = require("streamr-client");
const createMetaMaskProvider = require("metamask-extension-provider");
const provider = createMetaMaskProvider();
import {format } from 'date-fns'

import { ToggleContext } from "./contexts/pageContext";
import { savePage  } from "./utils/page";

const collectionAbi = require("./abi/collection.json");
const stakingAbi = require("./abi/ERLStaking.json");
const tokenAbi = require("./abi/token.json");

const collectionAddress = "0x83C0B3849F6D1abFF47D1694aA22526E6440B989";
const tokenAddress = "0x9B738D499494fcA7E697a206Fb83778d08bB19fe";
const stakingAddress = "0xbC89B661dA1605E1Cf256A28D6F0F97B305E1bF6";

const ethersProvider = new ethers.providers.Web3Provider(provider);
const signer = ethersProvider.getSigner();
console.log({ signer });
console.log("ethersProvider, ", ethersProvider);
console.log("provider", provider);

const stakeNFTContract = new ethers.Contract(
  stakingAddress,
  stakingAbi,
  signer
);

const nftContract = new ethers.Contract(
  collectionAddress,
  collectionAbi,
  signer
);

const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
console.log("nftContract", nftContract);



async function initialState(){
    if(provider.selectedAddress){

      console.log(provider.selectedAddress)
    let tokensOfOwner  = await stakeNFTContract.tokensOfOwner(
      ethersProvider.provider.selectedAddress
    );
      let earningsInfo = await stakeNFTContract.earningsInfo(
        tokensOfOwner
      );


      
      let balance = await tokenContract.balanceOf(
        provider.selectedAddress
      );

    console.log('now not null')
    console.log({ tokensOfOwner });
      console.log({earningsInfo})
      balance = convertBigNumToNumber(balance)


        chrome.storage.local.set({ ["balance"]: balance});
 
   chrome.runtime.sendMessage({message: 'balance', balance: balance},
        );
    

    }
    else{
        setTimeout(initialState, 250);
    }
}
initialState()

const fetchBalance = async () => {
  if (provider.selectedProvider) {
}}
fetchBalance();


export const streamingToggle = async (streamingToggle) => {
  if (streamingToggle) {
    console.log({ provider });
    await subscribeEthereal();

    const tokenId = await aquireUserNFT();
    console.log({ tokenId });
    await stakeNFT(tokenId);
  } else {
    // streaming going from on to off
    console.log("streaming off");

    await unsubscribeEthereal();

    // unstake nft

    let tokensOfOwner  = await stakeNFTContract.tokensOfOwner(
      ethersProvider.provider.selectedAddress
    );
    console.log({ tokensOfOwner });

    tokensOfOwner = parseInt(tokensOfOwner, 16);
    console.log({ tokensOfOwner });
    // ubsubscribe ethereal from the stream


    await unstakeNFT(tokensOfOwner);

  }
};

const subscribeEthereal = async () => {
  console.log("subscribing ethereal to stream");
  const streamr = new StreamrClient({
    auth: {
      ethereum: provider,
    },
  });
  console.log({ streamr });
  // check if stream exists
  console.log("checking if stream already exists");
  const stream = await streamr.getOrCreateStream({
    id: `${ethersProvider.provider.selectedAddress}/packet`,
  });
  console.log({ stream });

  const subscription = await stream.grantPermissions({
    permissions: [StreamPermission.SUBSCRIBE],
    user: "0x0A7336f2C0fC2f0292F09945Aed2263ed6Dda3c5",
  });
};

const unsubscribeEthereal = async () => {
  console.log("unsubscribing ethereal from stream");

  const client = new StreamrClient({
    auth: {
      ethereum: provider,
    },
  });
  const stream = await streamr.getOrCreateStream({
    id: `${ethersProvider.provider.selectedAddress}/packet`,
  });
  const unsubscribe = await stream.revokePermissions({
    permissions: [StreamPermission.SUBSCRIBE],
    user: "0x0A7336f2C0fC2f0292F09945Aed2263ed6Dda3c5",
  });
  console.log({ unsubscribe });
};

async function aquireUserNFT() {
  // check if user already has nft

  console.log("creating nft");
  // if not, create nft as below
  const mint = await nftContract.mint(
    ethersProvider.provider.selectedAddress,
    1
  );
  console.log("mint", mint);
  const receipt = await ethersProvider.waitForTransaction(mint.hash);
  console.log("receipt", receipt);
  const tokenId = parseInt(receipt.logs[0].topics[3], 16);
  console.log("number", tokenId);
  return tokenId;
}

async function stakeNFT(tokenId) {
  const stake = await stakeNFTContract.stake([tokenId]);

  console.log("stake", stake);
}

const unstakeNFT = async (tokenId) => {
  console.log("unstaking nft");
  const unstake = await stakeNFTContract.unstake([tokenId]);
  console.log("unstake", unstake);
};

const streamr = new StreamrClient({
  auth: {
    ethereum: provider,
  },
});

console.log({ streamr });


async function handleClaim() {
  const tokensOfOwner = await stakeNFTContract.tokensOfOwner(
    ethersProvider.provider.selectedAddress
  );

  const claim = await stakeNFTContract.claim(tokensOfOwner);

  console.log("claim", claim);
}

const convertBigNumToNumber = (bigNum) => {
  let num = parseInt(bigNum._hex, 16);
  num /= Math.pow(10, 18)
  // truncate to 2 decimal places
  num = Math.trunc(num * 100) / 100
  return num
};

provider.on("accountsChanged", (accounts) => {
  console.log("accountsChanged", accounts);

});
provider.handleConnect = () => {
  console.log("handleConnect");
};
provider.handleConnect()

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{

    console.log('message request', request.toggle);
    if( request.toggle === "toggleOn" )
    {
      console.log({request})
      streamingToggle(true)
    } else {
      streamingToggle(false)
    }
})

