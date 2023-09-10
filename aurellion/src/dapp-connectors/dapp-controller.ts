import { ethers } from "ethers";
import { getSigner } from "./wallet-utils";
import {
  REACT_APP_AUSYS_CONTRACT_ADDRESS,
  REACT_APP_AURA_CONTRACT_ADDRESS,
} from "@env";
import { PackageDeliveryData,Journey } from "../common/types/types";

const contractABI = require("./aurellion-abi.json");

export const jobCreation = async (locationData:PackageDeliveryData ) => {

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
    const jobTx = await contract.jobCreation(walletAddress, walletAddress, locationData, 1, 10);
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

export const customerPackageSign = async (jobID: string) => {
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
    const customerAddress = await signer.getAddress();
    const journey = await contract.jobIdToJourney(jobID);
    const customerPackageSignTx = await contract.packageSign(
      journey.driver,
      customerAddress,
      jobID
    );
    const receipt = await customerPackageSignTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error("Error in customerPackageSign:", error);
  }
};

export const driverPackageSign = async (jobID: string) => {
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
    const driverAddress = await signer.getAddress();
    const journey = await contract.jobIdToJourney(jobID);
    const driverPackageSignTx = await contract.packageSign(
      driverAddress,
      journey.customer,
      jobID
    );
    const receipt = await driverPackageSignTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error("Error in driverPackageSign:", error);
  }
};

export const fetchCustomersJobsObj = async () => {
  const jobs = [];
  const jobsObjList: Journey[] = [];
  let contract;
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error("Signer is undefined");
    }
    try {
        contract = new ethers.Contract(
            REACT_APP_AUSYS_CONTRACT_ADDRESS,
            contractABI,
            signer) 
    }catch(error) {
         console.error(`failed to instantiate contract object at with Contract Address: ${REACT_APP_AUSYS_CONTRACT_ADDRESS} contractABI: ${contractABI} signer:${signer}`)
         throw error
    };

    const walletAddress = await signer.getAddress();
    if (!walletAddress) {
      throw new Error("Failed to get wallet address");
    }

    let jobNumber;
    try {
      jobNumber = await contract.numberOfJobsCreatedForCustomer(walletAddress);
    } catch (error) {
      console.log(walletAddress)
      console.error("Error fetching number of jobs created with walletAddress",walletAddress,"Error:" , error);
      throw error;
    }

    for (let i = 0; i < jobNumber; i++) {
      try {
        const job = await contract.customerToJobId(walletAddress, i);
        jobs.push(job);
      } catch (err) {
        console.error(`Error fetching job with index ${i}:`, err);
      }
    }

    for (const jobID of jobs) {
      try {
        const jobsObj = await contract.jobIdToJourney(jobID);
        jobsObjList.push(jobsObj);
      } catch (err) {
        console.error(`Error fetching job object with ID ${jobID}:`, err);
      }
    }

    return jobsObjList;
  } catch (error) {
    console.error("General error in fetchCustomersJobsObj:", error);
    return []; // Return an empty array in case of an error
  }
};


export const checkIfDriverAssignedToJobId = async (jobID: string) => {
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
    const journey = await contract.jobIdToJourney(jobID);
    const isAssigned = journey.driver === ethers.constants.AddressZero ? false : true;
    return isAssigned;
  } catch (error) {
    console.error("Error in checkIfDriverAssignedToJobId:", error);
  }
};

export const assignDriverToJobId = async (jobID: string) => {
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
    const driverAddress = await signer.getAddress();
    const assignDriverToJobIdTx = await contract.assignDriverToJobId(
      driverAddress,
      jobID
    );
    const receipt = await assignDriverToJobIdTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error("Error in assignDriverToJobId:", error);
  }
};
