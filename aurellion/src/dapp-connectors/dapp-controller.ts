import { ethers } from "ethers";
import { getSigner } from "./wallet-utils"
import { REACT_APP_AUSYS_CONTRACT_ADDRESS, REACT_APP_AURA_CONTRACT_ADDRESS } from "@env"
// console.log("process env", process.env)
const contractABI = require("./aurellion-abi.json")
console.log("from env", REACT_APP_AUSYS_CONTRACT_ADDRESS)
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
    console.log("Transaction Hash:", receipt.transactionHash);
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("success");
  }
  catch (error) {
    console.error("Error in jobCreation:", error);
  }
};

export const fetchCustomersJobs = async () => {
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
    const walletAddress = await signer.getAddress();
    console.log(walletAddress);

    const jobNumber = await contract.numberOfJobsCreated(walletAddress);
    const jobs = [];

    for (let i = 0; i < jobNumber; i++) {
      try {
        console.log("ran");
        const job = await contract.customerToJobId(walletAddress, i);
        jobs.push(job);
      } catch {
        console.log("job doesn't exist");
      }
    }

    console.log("success");
    console.log(jobs);
    return jobs;
  } catch (error) {
    console.error("Error in fetchCustomersJobs:", error);
    throw error; // Re-throw the error to propagate it
  }
};

