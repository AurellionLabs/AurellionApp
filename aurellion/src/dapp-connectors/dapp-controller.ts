import { ethers } from "ethers";
import { getSigner } from "./wallet-utils"
import { REACT_APP_AUSYS_CONTRACT_ADDRESS } from "@env"
const contractABI = require("./aurellion-abi.json")

const parcelData = {
  startLocation: { lat: 1, lng: 2 },
  endLocation: { lat: 1, lng: 2 },
  name: "TestLocation",
};

export const jobCreation = async () => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error("Signer is undefined");
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const walletAddress = await signer.getAddress();
    const jobTx = await contract.jobCreation(walletAddress, walletAddress, parcelData, 1, 10);
    const receipt = await jobTx.wait()
    console.log(receipt);
    console.log("Transaction Hash:", receipt.transactionHash);
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("success");
  }
  catch (error) {
    console.error("Error in jobCreation:", error);
  }
};