import { BigNumber, ethers } from "ethers";
import { getSigner } from "./wallet-utils";
import {
  REACT_APP_AUSYS_CONTRACT_ADDRESS,
  REACT_APP_AURA_CONTRACT_ADDRESS,
} from "@env";
import { PackageDeliveryData, Journey } from "../common/types/types";

const contractABI = require("./aurellion-abi.json");

export const jobCreation = async (locationData: PackageDeliveryData) => {
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
    const jobTx = await contract.jobCreation(
      walletAddress,
      walletAddress,
      locationData,
      1,
      10
    );
    const receipt = await jobTx.wait();
    console.log("Transaction Hash:", receipt.transactionHash);
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("success");
  } catch (error) {
    console.error("Error in jobCreation:", error);
    throw error
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
    throw error;
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
    throw error;
  }
};

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

export const fetchCustomersJobsObj = async () => {
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

    const jobNumber = await contract.numberOfJobsCreatedForCustomer(
      walletAddress
    );
    const jobs = [];
    const jobsObjList: Journey[] = [];

    for (let i = 0; i < jobNumber; i++) {
      try {
        const job = await contract.customerToJobId(walletAddress, i);
        jobs.push(job);
      } catch (err) {
        console.log("job doesn't exist", err);
      }
    }
    for (var jobID of jobs) {
      try {
        const jobsObj = await contract.jobIdToJourney(jobID);
        jobsObjList.push(jobsObj);
      } catch (err) {
        console.log("job doesn't exist", err);
      }
    }
    return jobsObjList;
  } catch (error) {
    console.error("Error in fetchCustomersJobsObjs:", error);
    throw error; // Re-throw the error to propagate it
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
    const isAssigned =
      journey.driver === ethers.constants.AddressZero ? false : true;
    return isAssigned;
  } catch (error) {
    console.error("Error in checkIfDriverAssignedToJobId:", error);
    throw error
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
    throw error
  }
};

export const fetchDriverUnassignedJourneys = async () => {
  const jobIds: string[] = [];
  const journeys: Journey[] = [];
  let signer: ethers.providers.JsonRpcSigner | undefined;
  let contract;
  let totalJobsCount;
  let jobId: string | null = null;
  let journey: Journey | null = null;
  try {
    signer = await getSigner();
  } catch (error) {
    console.error("Could not get signer object");
    throw error;
  }
  try {
    contract = new ethers.Contract(
      REACT_APP_AUSYS_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
  } catch (error) {
    console.error("Could not create Contract object");
    throw error;
  }
  try {
    totalJobsCount = await contract.jobIdCounter();
  } catch (error) {
    console.error("Could not get total jobs count from blockchain");
    throw error;
  }
  // Index starts with 1 because smart contract jobIdCounter starts at 1
  for (let i = 1; i <= totalJobsCount; i++) {
    try {
      jobId = await contract.numberToJobID(i);
    } catch (error) {
      console.error(`No jobId exists at index ${i}`);
    }
    if (jobId) {
      jobIds.push(jobId);
    }
  }
  for (let i = 0; i < jobIds.length; i++) {
    try {
      journey = await contract.jobIdToJourney(jobIds[i]);
    } catch (error) {
      console.error(`Error retrieving journey from jobId ${jobIds[i]}`);
    }
    if (journey) {
      const isAssigned =
        journey.driver === ethers.constants.AddressZero ? false : true;
      if (!isAssigned) {
        journeys.push(journey);
      }
    }
  }
  return journeys;
};
