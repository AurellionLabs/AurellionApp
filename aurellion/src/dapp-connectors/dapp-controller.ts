import { BigNumber, ethers } from 'ethers';
import { getSigner } from './wallet-utils';
import { REACT_APP_AUSYS_CONTRACT_ADDRESS, REACT_APP_AURA_CONTRACT_ADDRESS } from '@env';
import { ParcelData, Journey } from '../common/types/types';

const contractABI = require('./aurellion-abi.json');

export const jobCreation = async (locationData: ParcelData) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const walletAddress = await signer.getAddress();
    const jobTx = await contract.jobCreation(walletAddress, walletAddress, locationData, 1, 10);
    const receipt = await jobTx.wait();
    console.log('Job Creation Transaction Hash:');
    console.log('Transaction Hash:', receipt.transactionHash);
    console.log('Block Number:', receipt.blockNumber);
    console.log('Gas Used:', receipt.gasUsed.toString());
    console.log('success');
  } catch (error) {
    console.error('Error in jobCreation:', error);
    throw error;
  }
};

export const customerPackageSign = async (jobID: string) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const customerAddress = await signer.getAddress();
    const journey = await contract.jobIdToJourney(jobID);
    const customerPackageSignTx = await contract.packageSign(journey.driver, customerAddress, jobID);
    const receipt = await customerPackageSignTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error('Error in customerPackageSign:', error);
    throw error;
  }
};

export const driverPackageSign = async (jobID: string) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const driverAddress = await signer.getAddress();
    const journey = await contract.jobIdToJourney(jobID);
    const driverPackageSignTx = await contract.packageSign(driverAddress, journey.customer, jobID);
    const receipt = await driverPackageSignTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error('Error in driverPackageSign:', error);
    throw error;
  }
};

export const fetchCustomerJobs = async () => {
  const jobIds = [];
  const jobs: Journey[] = [];
  let contract;
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    try {
      contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    } catch (error) {
      console.error(
        `failed to instantiate contract object at with Contract Address: ${REACT_APP_AUSYS_CONTRACT_ADDRESS} contractABI: ${contractABI} signer:${signer}`
      );
      throw error;
    }

    const walletAddress = await signer.getAddress();
    if (!walletAddress) {
      throw new Error('Failed to get wallet address');
    }

    let jobNumber;
    try {
      jobNumber = await contract.numberOfJobsCreatedForCustomer(walletAddress);
    } catch (error) {
      console.log(walletAddress);
      console.error('Error fetching number of jobs created with walletAddress', walletAddress, 'Error:', error);
      throw error;
    }
    contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);

    jobNumber = await contract.numberOfJobsCreatedForCustomer(walletAddress);

    for (let i = 0; i < jobNumber; i++) {
      try {
        const jobId = await contract.customerToJobId(walletAddress, i);
        jobIds.push(jobId);
      } catch (err) {
        console.error(`Error fetching job with index ${i}:`, err);
      }
    }

    for (const jobId of jobIds) {
      try {
        const job = await contract.jobIdToJourney(jobId);
        jobs.push(job);
      } catch (err) {
        console.error(`Error fetching job object with ID ${jobId}:`, err);
      }
    }
    return jobs;
  } catch (error) {
    console.error('General error in fetchCustomerJobs:', error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchReceiverJobs = async () => {
  let contract;
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    try {
      contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    } catch (error) {
      console.error(
        `failed to instantiate contract object at with Contract Address: ${REACT_APP_AUSYS_CONTRACT_ADDRESS} contractABI: ${contractABI} signer:${signer}`
      );
      throw error;
    }

    const walletAddress = await signer.getAddress();
    if (!walletAddress) {
      throw new Error('Failed to get wallet address');
    }

    let jobNumber;
    try {
      jobNumber = await contract.numberOfJobsCreatedForReceiver(walletAddress);
    } catch (error) {
      console.error('Error fetching number of jobs for receiver with wallet address', walletAddress, 'Error:', error);
      throw error;
    }
    const jobs = [];
    const jobsObjList: Journey[] = [];
    for (let i = 0; i < jobNumber; i++) {
      try {
        const job = await contract.receiverToJobId(walletAddress, i);
        jobs.push(job);
      } catch (err) {
        console.error(`Error fetching jobId with index ${i}:`, err);
      }
    }

    for (const jobID of jobs) {
      try {
        const jobsObj = await contract.jobIdToJourney(jobID);
        jobsObjList.push(jobsObj);
      } catch (err) {
        console.error(`Error fetching job object with jobId ${jobID}:`, err);
      }
    }
    return jobsObjList;
  } catch (error) {
    console.error('General error in fetchReceiverJobs:', error);
    return []; // Return an empty array in case of an error
  }
};

export const checkIfDriverAssignedToJobId = async (jobID: string) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const journey = await contract.jobIdToJourney(jobID);
    const isAssigned = journey.driver === ethers.constants.AddressZero ? false : true;
    return isAssigned;
  } catch (error) {
    console.error('Error in checkIfDriverAssignedToJobId:', error);
    throw error;
  }
};

export const assignDriverToJobId = async (jobID: string) => {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const driverAddress = await signer.getAddress();
    const assignDriverToJobIdTx = await contract.assignDriverToJobId(driverAddress, jobID);
    const receipt = await assignDriverToJobIdTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error('Error in assignDriverToJobId:', error);
    throw error;
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
    console.error('Could not get signer object');
    throw error;
  }
  try {
    contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.error('Could not create Contract object');
    throw error;
  }
  try {
    totalJobsCount = await contract.jobIdCounter();
  } catch (error) {
    console.error('Could not get total jobs count from blockchain');
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
      const isAssigned = journey.driver === ethers.constants.AddressZero ? false : true;
      if (!isAssigned) {
        journeys.push(journey);
      }
    }
  }
  return journeys;
};

export const fetchDriverAssignedJourneys = async () => {
  const jobIds: string[] = [];
  const journeys: Journey[] = [];
  let signer: ethers.providers.JsonRpcSigner | undefined;
  let contract;
  let jobId: string | null = null;
  let journey: Journey;
  let numberOfJobsAssignedForDriver;
  try {
    signer = await getSigner();
  } catch (error) {
    console.error('Could not get signer object');
    throw error;
  }
  try {
    contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.error('Could not create Contract object');
    throw error;
  }
  if (signer) {
    const walletAddress = await signer.getAddress();
    if (!walletAddress) {
      throw new Error('Failed to get wallet address');
    }
    try {
      numberOfJobsAssignedForDriver = await contract.numberOfJobsAssigned(walletAddress);
    } catch (error) {
      console.error('Could not get number of jobs assigned to driver');
      throw error;
    }
    for (let i = 0; i < numberOfJobsAssignedForDriver; i++) {
      try {
        jobId = await contract.driverToJobId(walletAddress, i);
      } catch (error) {
        console.error(`No jobId exists at index ${i} for driver`);
      }
      if (jobId) {
        jobIds.push(jobId);
      }
    }
    for (let i = 0; i < jobIds.length; i++) {
      try {
        journey = await contract.jobIdToJourney(jobIds[i]);
        journeys.push(journey);
      } catch (error) {
        console.error(`Error retrieving journey from jobId ${jobIds[i]}`);
      }
    }
  }
  return journeys;
};

export const packageHandOn = async (customerAddress: string, driverAddress: string, jobId: string) => {
  let signer: ethers.providers.JsonRpcSigner | undefined;
  let contract;
  let handOnSuccessful = false;
  try {
    signer = await getSigner();
  } catch (error) {
    console.error('Could not get signer object');
    throw error;
  }
  try {
    contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.error('Could not create Contract object');
    throw error;
  }
  if (signer) {
    const walletAddress = await signer.getAddress();
    if (!walletAddress) {
      console.error('Failed to get wallet address');
      throw new Error('Failed to get wallet address');
    }
  }
  try {
    handOnSuccessful = await contract.handOn(driverAddress, customerAddress, jobId);
  } catch (error) {
    console.error('Could not call contract handOn');
    throw error;
  }
  return handOnSuccessful;
};

export const packageHandOff = async (customerAddress: string, driverAddress: string, jobId: string) => {
  let signer: ethers.providers.JsonRpcSigner | undefined;
  let contract;
  let handOffSuccessful = false;
  try {
    signer = await getSigner();
  } catch (error) {
    console.error('Could not get signer object');
    throw error;
  }
  try {
    contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.error('Could not create Contract object');
    throw error;
  }
  if (signer) {
    const walletAddress = await signer.getAddress();
    if (!walletAddress) {
      console.log('Failed to get wallet address');
      throw new Error('Failed to get wallet address');
    }
  }
  try {
    handOffSuccessful = await contract.handOff(driverAddress, customerAddress, jobId);
  } catch (error) {
    console.error('Could not call contract handOff');
    throw error;
  }
  return handOffSuccessful;
};

export const jobIdToJourney = async (jobId: string) => {
  let signer: ethers.providers.JsonRpcSigner | undefined;
  let contract;
  try {
    signer = await getSigner();
  } catch (error) {
    console.error('Could not get signer object');
    throw error;
  }
  try {
    contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
  } catch (error) {
    console.error('Could not create Contract object');
    throw error;
  }
  if (signer) {
    try {
      const journey = await contract.jobIdToJourney(jobId);
      return journey;
    } catch (error) {
      console.error('Could not fetch journey object');
      throw error;
    }
  }
};
