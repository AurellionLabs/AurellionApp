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
  }
  catch (error) {
    console.error("Error in jobCreation:", error);
  }
};

export const customerPackageSign = async (jobID: string) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error("Signer is undefined");
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const customerAddress = await signer.getAddress();
    const journey = await contract.jobIdToJourney(jobID)
    const customerPackageSignTx = await contract.packageSign(journey.driver, customerAddress, jobID);
    const receipt = await customerPackageSignTx.wait()
    console.log(receipt);
  }
  catch (error) {
    console.error("Error in customerPackageSign:", error);
  }
}

export const driverPackageSign = async (jobID: string) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error("Signer is undefined");
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const driverAddress = await signer.getAddress();
    const journey = await contract.jobIdToJourney(jobID)
    const driverPackageSignTx = await contract.packageSign(driverAddress, journey.customer, jobID);
    const receipt = await driverPackageSignTx.wait()
    console.log(receipt);
  }
  catch (error) {
    console.error("Error in driverPackageSign:", error);
  }
}

export const fetchCustomerJobIds = async () => {
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

    const customerJobCount = await contract.numberOfJobsCreated(walletAddress);
    const customerJobIds = [];

    for (let i = 0; i < customerJobCount; i++) {
      try {
        const job = await contract.customerToJobId(walletAddress, i);
        customerJobIds.push(job);
      } catch (error) {
        console.error("JobID doesn't exist for customer wallet address", error);
      }
    }
    return customerJobIds;
  } catch (error) {
    console.error("Error in fetchCustomerJobIDs:", error);
    throw error; // Re-throw the error to propagate it
  }
};