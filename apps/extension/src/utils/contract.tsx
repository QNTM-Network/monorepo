import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";
import { Network, Alchemy } from "alchemy-sdk";

use(Web3ClientPlugin);

import { clearPages, getPages, displayPages } from "../utils/page";
const { ethers } = require("ethers");
const { StreamrClient, StreamPermission } = require("streamr-client");

const createMetaMaskProvider = require("metamask-extension-provider");
const provider = createMetaMaskProvider();

const collectionAbi = require("../abi/collection.json");
const stakingAbi = require("../abi/ERLStaking.json");

const collectionAddress = "0x369a54D29F8150b11bD888729d545Bf2FAe9B4B3";
const tokenAddress = "0xd314C8a05dA44262Aae3EeE96Ccfd3Cb00942da9";
const stakingAddress = "0x5074ecF1A090225d9560764AFce0b805Eb3b589c";

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
console.log("nftContract", nftContract);

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

    // unstake nft

    const tokenOfOwner = await stakeNFTContract.tokensOfOwner(
      ethersProvider.provider.selectedAddress
    );
    console.log({ tokenOfOwner });
    // ubsubscribe ethereal from the stream
    await unsubscribeEthereal();

    const tokensOfOwner = await stakeNFTContract.tokensOfOwner(
      ethersProvider.provider.selectedAddress
    );

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
  const unstake = await stakeNFTContract.unstake([1]);
  console.log("unstake", unstake);
};

const streamr = new StreamrClient({
  auth: {
    ethereum: provider,
  },
});

console.log({ streamr });

const handleCreatePacket = async () => {
  const packet = await getPages();

  console.log({ packet });

  await axios.post("http://localhost:8080/packet", packet);
  await clearPages();
  await displayPages();
};

async function handleClaim() {
  const tokensOfOwner = await stakeNFTContract.tokensOfOwner(
    ethersProvider.provider.selectedAddress
  );

  const claim = await stakeNFTContract.claim(tokensOfOwner);

  console.log("claim", claim);
}

const convertBigNumToNumber = (bigNum) => {
  return parseInt(bigNum._hex, 16);
};

provider.on("accountsChanged", (accounts) => {
  console.log("accountsChanged", accounts);
});

