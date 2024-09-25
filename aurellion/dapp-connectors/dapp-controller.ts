import { BrowserProvider, Signer, ethers } from 'ethers'; import { ParcelData, Journey } from '@/constants/Types';
import contractABI from './aurellion-abi.json';
import nodeManagerABI from './aurum-abi.json';
var ethersProvider: BrowserProvider | undefined;
const AUSYS_ADDRESS = process.env.EXPO_PUBLIC_AUSYS_CONTRACT_ADDRESS
const NODE_MANAGER_ADDRESS = process.env.EXPO_PUBLIC_NODE_MANAGER_CONTRACT_ADDRESS
export const setWalletProvider = (_ethersProvider: BrowserProvider) => {
    ethersProvider = _ethersProvider;
}
export const loadAvailableOrders = async () => {

    console.log("here")
    var signer: Signer | undefined;

    try {
        if (ethersProvider)
            try {
                signer = await ethersProvider.getSigner();
            } catch (e) {
                throw new Error("getSigner failed with " + e)
            }
        else console.error("ethersProvider is underfined")
        if (!signer)
            throw new Error('Signer is undefined');
        if (!NODE_MANAGER_ADDRESS)
            throw new Error("NODE_MANAGER_ADDRESS is undefined")
        const contract = new ethers.Contract(NODE_MANAGER_ADDRESS, nodeManagerABI, signer);
        console.log("Manager Address", NODE_MANAGER_ADDRESS)
        const walletAddress = await signer.getAddress();
        console.log(walletAddress)
        console.log("calling function")
        // const jobTx = await contract.jobCreation(
        //     walletAddress,
        //     recipientWalletAddress,
        //     locationData,
        //     1,
        //     10);
        const nodeListLength = await contract.nodeIdCounter()
        console.log("node list length", nodeListLength)
        var nodeList = []
        for (let i = 0; i < nodeListLength; i++) {
            let nodeAddress = await contract.nodeList(i)
            console.log(nodeAddress)
            let node = await contract.getNode(nodeAddress)
            console.log(node)
            nodeList.push(node)
        }
        console.log("called function")
        console.log(nodeList);
        console.log('success');
    } catch (error) {
        console.error('Error in asset search:', error);
        throw error;
    }
};
export const jobCreation = async (locationData: ParcelData, recipientWalletAddress: string) => {

    console.log("here")
    var signer: Signer | undefined;
    try {
        if (ethersProvider)
            try {
                signer = await ethersProvider.getSigner();
            } catch (e) {
                throw new Error("getSigner failed with " + e)
            }
        else console.error("ethersProvider is underfined")
        if (!signer)
            throw new Error('Signer is undefined');
        if (!AUSYS_ADDRESS)
            throw new Error("AUSYS_ADDRESS is undefined")
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        console.log("Ausys Address", AUSYS_ADDRESS)
        const walletAddress = await signer.getAddress();
        console.log(walletAddress)
        console.log(recipientWalletAddress)
        console.log(locationData)
        console.log("calling function")
        const jobTx = await contract.jobCreation(
            walletAddress,
            recipientWalletAddress,
            locationData,
            1,
            10);
        console.log("called function")
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

export const customerPackageSign = async (journeyId: string) => {
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
        const journey = await contract.jobIdToJourney(journeyId);
        const customerPackageSignTx = await contract.packageSign(journey.driver, customerAddress, journeyId);
        const receipt = await customerPackageSignTx.wait();
        console.log(receipt);
    } catch (error) {
        console.error('Error in customerPackageSign:', error);
        throw error;
    }
};

export const driverPackageSign = async (journeyId: string) => {
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
        const journey = await contract.jobIdToJourney(journeyId);
        const driverPackageSignTx = await contract.packageSign(driverAddress, journey.customer, journeyId);
        const receipt = await driverPackageSignTx.wait();
        console.log(receipt);
    } catch (error) {
        console.error('Error in driverPackageSign:', error);
        throw error;
    }
};

export const fetchCustomerJobs = async () => {
    const journeyIds = [];
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
                const journeyId = await contract.customerToJobId(walletAddress, i);
                journeyIds.push(journeyId);
            } catch (err) {
                console.error(`Error fetching job with index ${i}:`, err);
            }
        }

        for (const journeyId of journeyIds) {
            try {
                const job = await contract.jobIdToJourney(journeyId);
                jobs.push(job);
            } catch (err) {
                console.error(`Error fetching job object with ID ${journeyId}:`, err);
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
                console.error(`Error fetching journeyId with index ${i}:`, err);
            }
        }

        for (const journeyId of jobs) {
            try {
                const jobsObj = await contract.jobIdToJourney(journeyId);
                jobsObjList.push(jobsObj);
            } catch (err) {
                console.error(`Error fetching job object with journeyId ${journeyId}:`, err);
            }
        }
        return jobsObjList;
    } catch (error) {
        console.error('General error in fetchReceiverJobs:', error);
        return []; // Return an empty array in case of an error
    }
};

export const checkIfDriverAssignedToJobId = async (journeyId: string) => {
    var signer: Signer | undefined;
    if (ethersProvider)
        signer = await ethersProvider.getSigner();
    else console.error("ethersProvider is underfined")
    try {
        if (!signer) {
            throw new Error('Signer is undefined');
        }
        const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
        const journey = await contract.jobIdToJourney(journeyId);
        const isAssigned = journey.driver === ethers.ZeroAddress ? false : true;
        return isAssigned;
    } catch (error) {
        console.error('Error in checkIfDriverAssignedToJobId:', error);
        throw error;
    }
};

export const assignDriverToJobId = async (journeyId: string) => {
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
        const assignDriverToJobIdTx = await contract.assignDriverToJobId(driverAddress, journeyId);
        const receipt = await assignDriverToJobIdTx.wait();
        console.log(receipt);
    } catch (error) {
        console.error('Error in assignDriverToJobId:', error);
        throw error;
    }
};

export const fetchDriverUnassignedJourneys = async () => {
    const journeyIds: string[] = [];
    const journeys: Journey[] = [];
    let contract;
    let totalJobsCount;
    let journeyId: string | null = null;
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
    // Index starts with 1 beca  smart contract jobIdCounter starts at 1
    for (let i = 1; i <= totalJobsCount; i++) {
        try {
            journeyId = await contract.numberToJobID(i);
        } catch (error) {
            console.error(`No journeyId exists at index ${i}`);
        }
        if (journeyId) {
            journeyIds.push(journeyId);
        }
    }
    for (let i = 0; i < journeyIds.length; i++) {
        try {
            journey = await contract.jobIdToJourney(journeyIds[i]);
        } catch (error) {
            console.error(`Error retrieving journey from journeyId ${journeyIds[i]}`);
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

export const fetchDriverAssignedJourneys = async () => {
    const journeyIds: string[] = [];
    const journeys: Journey[] = [];
    let contract;
    let journeyId: string | null = null;
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
                journeyId = await contract.driverToJobId(walletAddress, i);
            } catch (error) {
                console.error(`No journeyId exists at index ${i} for driver`);
            }
            if (journeyId) {
                journeyIds.push(journeyId);
            }
        }
        for (let i = 0; i < journeyIds.length; i++) {
            try {
                journey = await contract.jobIdToJourney(journeyIds[i]);
                journeys.push(journey);
            } catch (error) {
                console.error(`Error retrieving journey from journeyId ${journeyIds[i]}`);
            }
        }
    }
    return journeys;
};

export const packageHandOn = async (customerAddress: string, driverAddress: string, journeyId: string) => {
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
        handOnSuccessful = await contract.handOn(driverAddress, customerAddress, journeyId);
    } catch (error) {
        console.error('Could not call contract handOn');
        throw error;
    }
    return handOnSuccessful;
};

export const packageHandOff = async (customerAddress: string, driverAddress: string, journeyId: string) => {
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
        handOffSuccessful = await contract.handOff(driverAddress, customerAddress, journeyId);
    } catch (error) {
        console.error('Could not call contract handOff');
        throw error;
    }
    return handOffSuccessful;
};

export const jobIdToJourney = async (journeyId: string) => {
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
            const journey = await contract.jobIdToJourney(journeyId);
            return journey;
        } catch (error) {
            console.error('Could not fetch journey object');
            throw error;
        }
    }
}
