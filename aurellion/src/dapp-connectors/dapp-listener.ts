import { ethers } from 'ethers';
import { getSigner } from './wallet-utils';
import {
  REACT_APP_AUSYS_CONTRACT_ADDRESS,
  REACT_APP_AURA_CONTRACT_ADDRESS,
} from "@env";
import { PackageDeliveryData,Journey } from "../common/types/types";

const contractABI = require("./aurellion-abi.json");
// This function listens for a signature from a specific smart contract
export async function listenForSignature() {
    // Specify the provider (e.g., Infura, Alchemy, or a local Ethereum node)
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error("Signer is undefined");
    }
    const contract = new ethers.Contract(
      REACT_APP_AUSYS_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    const provider = new ethers.providers.JsonRpcProvider('YOUR_PROVIDER_URL');
    // Create a contract instance
    // Listen for the specific event
    //
    contract.on("userSigned", (id, address) => {
        console.log(`Signature detected! From: ${address}, jobID: ${id}`);
        // Additional processing can be done here
    });

    console.log(`Listening for userSigned events from ${REACT_APP_AUSYS_CONTRACT_ADDRESS}`);
}
catch (e) {
    console.log("failed listening to events:",e)
}
}

