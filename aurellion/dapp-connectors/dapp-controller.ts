import { BrowserProvider, JsonRpcSigner, Signer, ethers } from 'ethers';
import { ParcelData, Journey } from '@/constants/Types';
import { type Provider, type Address } from '@web3modal/scaffold-utils-react-native';
import { useEffect } from 'react';
const contractABI = require('./aurellion-abi.json');
var ethersProvider: BrowserProvider | undefined;
const AUSYS_ADDRESS = process.env.EXPO_PUBLIC_AUSYS_CONTRACT_ADDRESS 
export const setWalletProvider = (_ethersProvider: BrowserProvider) => {
    ethersProvider = _ethersProvider;
}
export const jobCreation = async (locationData: ParcelData, recipientWalletAddress: string) => {
    console.log("here")
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        const walletAddress = await signer.getAddress();
        console.log(walletAddress)
        console.log(typeof(walletAddress))
        console.log('line before');
        console.log(locationData)
        const jobTx = await contract.jobCreation(
        walletAddress, 
        "0x97F5Aab4c5D492E22483476446a45C313BE6B3E9", 
        locationData, 
        1, 
        10);
        console.log(jobTx);
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

export const useCustomerPackageSign = async (jobID: string) => {
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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

export const useDriverPackageSign = async (jobID: string) => {
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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

export const useFetchCustomerJobs = async () => {
    const jobIds = [];
    const jobs: Journey[] = [];
    let contract;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        try {
            contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        } catch (error) {
            console.error(
                `failed to instantiate contract object at with Contract Address: ${AUSYS_ADDRESS} contractABI: ${contractABI} signer:${signer}`
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
        contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);

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

export const useFetchReceiverJobs = async () => {
    let contract;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        try {
            contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        } catch (error) {
            console.error(
                `failed to instantiate contract object at with Contract Address: ${AUSYS_ADDRESS} contractABI: ${contractABI} signer:${signer}`
            );
            throw error;
        }

        const walletAddress =await signer.getAddress(); 
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

export const useCheckIfDriverAssignedToJobId = async (jobID: string) => {
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        const journey = await contract.jobIdToJourney(jobID);
        const isAssigned = journey.driver === ethers.ZeroAddress ? false : true;
        return isAssigned;
    } catch (error) {
        console.error('Error in checkIfDriverAssignedToJobId:', error);
        throw error;
    }
};

export const useAssignDriverToJobId = async (jobID: string) => {
    var signer: Signer | undefined;
    var ethersProvider: BrowserProvider | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        const driverAddress = await signer.getAddress();
        const assignDriverToJobIdTx = await contract.assignDriverToJobId(driverAddress, jobID);
        const receipt = await assignDriverToJobIdTx.wait();
        console.log(receipt);
    } catch (error) {
        console.error('Error in assignDriverToJobId:', error);
        throw error;
    }
};

export const useFetchDriverUnassignedJourneys = async () => {
    const jobIds: string[] = [];
    const journeys: Journey[] = [];
    let contract;
    let totalJobsCount;
    let jobId: string | null = null;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    let journey: Journey | null = null;
    try {
        contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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
            const isAssigned = journey.driver === ethers.ZeroAddress ? false : true;
            if (!isAssigned) {
                journeys.push(journey);
            }
        }
    }
    return journeys;
};

export const useFetchDriverAssignedJourneys = async () => {
    const jobIds: string[] = [];
    const journeys: Journey[] = [];
    let contract;
    let jobId: string | null = null;
    let journey: Journey;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    let numberOfJobsAssignedForDriver;
    try {
        contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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

export const usePackageHandOn = async (customerAddress: string, driverAddress: string, jobId: string) => {
    let contract;
    let handOnSuccessful = false;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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

export const usePackageHandOff = async (customerAddress: string, driverAddress: string, jobId: string) => {
    let contract;
    let handOffSuccessful = false;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")

    try {
        contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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

export const useJobIdToJourney = async (jobId: string) => {
    let contract;
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
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
}
