import { BrowserProvider, Contract, Signer, ethers } from "ethers";
import { ParcelData, Journey } from "@/constants/Types";
import { Node } from "@/constants/ChainTypes";
import contractABI from "./aurellion-abi.json";
import nodeManagerABI from "./aurum-abi.json";
import nodeABI from "./aurum-node-abi.json";
import { OrderC } from "@/constants/ChainTypes";

var ethersProvider: BrowserProvider | undefined;
const AUSYS_ADDRESS = process.env.EXPO_PUBLIC_AUSYS_CONTRACT_ADDRESS;
const NODE_MANAGER_ADDRESS =
  process.env.EXPO_PUBLIC_NODE_MANAGER_CONTRACT_ADDRESS;
export const GOAT_CONTRACT_ADDRESS =
  process.env.EXPO_PUBLIC_GOAT_CONTRACT_ADDRESS;

export var walletAddress: string;
export const setWalletProvider = async (_ethersProvider: BrowserProvider) => {
  console.log("heeeeeeeeeeeeeeeere");
  var signer: Signer | undefined;
  console.log("ethers provider param", _ethersProvider);
  ethersProvider = _ethersProvider;
  // this will console log as empty {} but it actually does definitely exist
  console.log("here");
  console.log("ethers provider in dapp controller", ethersProvider);
  try {
    if (ethersProvider)
      try {
        signer = await ethersProvider.getSigner();
        walletAddress = await signer.getAddress();
        console.log("signer set");
      } catch (e) {
        throw new Error("getSigner failed with " + e);
      }
    else console.error("ethersProvider is underfined");
    if (!signer) throw new Error("Signer is undefined");
    walletAddress = await signer.getAddress();
  } catch (error) {
    console.error(
      `failed to set address:${walletAddress} \n error: ${error} \n provider: ${ethersProvider}`
    );
  }
};

const getAurumContract = async (): Promise<Contract> =>
  new Promise(async (resolve, reject) => {
    console.log("here");
    var signer: Signer | undefined;

    try {
      if (ethersProvider)
        try {
          signer = await ethersProvider.getSigner();
        } catch (e) {
          throw new Error("getSigner failed with " + e);
        }
      else
        console.error(
          "ethersProvider is underfined ethersProvider:",
          ethersProvider
        );
      if (!signer) throw new Error("Signer is undefined");
      if (!NODE_MANAGER_ADDRESS)
        throw new Error("NODE_MANAGER_ADDRESS is undefined");
      const contract = new ethers.Contract(
        NODE_MANAGER_ADDRESS,
        nodeManagerABI,
        signer
      );
      console.log("Manager Address", NODE_MANAGER_ADDRESS);
      const walletAddress = await signer.getAddress();
      console.log(walletAddress);
      console.log("calling function");
      resolve(contract);
    } catch (error) {
      console.error("Error fetching contract:", error);
      reject(error);
    }
  });

const getAurumNodeContract = async (address: string): Promise<Contract> =>
  new Promise(async (resolve, reject) => {
    console.log("here");
    var signer: Signer | undefined;

    try {
      if (ethersProvider)
        try {
          signer = await ethersProvider.getSigner();
        } catch (e) {
          throw new Error("getSigner failed with " + e);
        }
      else
        console.error(
          "ethersProvider is underfined ethersProvider:",
          ethersProvider
        );
      if (!signer) throw new Error("Signer is undefined");
      if (!NODE_MANAGER_ADDRESS)
        throw new Error("NODE_MANAGER_ADDRESS is undefined");
      const contract = new ethers.Contract(address, nodeABI, signer);
      console.log("Manager Address", NODE_MANAGER_ADDRESS);
      const walletAddress = await signer.getAddress();
      console.log(walletAddress);
      console.log("calling function");
      resolve(contract);
    } catch (error) {
      console.error("Error fetching contract:", error);
      reject(error);
    }
  });
const getAusysContract = async (): Promise<Contract> =>
  new Promise(async (resolve, reject) => {
    console.log("here");
    var signer: Signer | undefined;
    try {
      if (ethersProvider)
        try {
          signer = await ethersProvider.getSigner();
        } catch (e) {
          throw new Error("getSigner failed with " + e);
        }
      else throw new Error("ethersProvider is underfined");
      if (!signer) throw new Error("Signer is undefined");
      if (!AUSYS_ADDRESS) throw new Error("AUSYS_ADDRESS is undefined");
      const contract = new ethers.Contract(AUSYS_ADDRESS, contractABI, signer);
      resolve(contract);
      console.log("Ausys Address", AUSYS_ADDRESS);
    } catch (error) {
      console.error(
        "Error when tring to initialise Ausys contract object:",
        error
      );
      reject(error);
    }
  });
export const loadAvailableOrders = async () => {
  console.log("here");
  const contract = await getAurumContract();
  try {
    console.log("Manager Address", NODE_MANAGER_ADDRESS);
    console.log(walletAddress);
    console.log("calling function");
    // const jobTx = await contract.jobCreation(
    //     walletAddress,
    //     recipientWalletAddress,
    //     locationData,
    //     1,
    //     10);
    const nodeListLength = await contract.nodeIdCounter();
    console.log("node list length", nodeListLength);
    var nodeList = [];
    for (let i = 0; i < nodeListLength; i++) {
      let nodeAddress = await contract.nodeList(i);
      console.log(nodeAddress);
      let node = await contract.getNode(nodeAddress);
      console.log(node);
      nodeList.push(node);
    }
    console.log("called function");
    console.log(nodeList);
    console.log("success");
  } catch (error) {
    console.error("Error in asset search:", error);
    throw error;
  }
};
// Node Functions:
export const registerNode = async (nodeData: Node) => {
  const contract = await getAurumContract();
  try {
    await contract.registerNode(nodeData);
  } catch (error) {
    console.error("Error when registering node:", error);
    throw error;
  }
};

export const addItem = async (
  node: string,
  itemOwner: string,
  assetClass: number,
  amount: number,
  data: any
) => {
  const contract = await getAurumNodeContract(node);
  try {
    await contract.addItem(itemOwner, assetClass, amount, data);
  } catch (error) {
    console.error("Error when registering node:", error);
  }
};

export const updateOwner = async (node: string) => {
  const contract = await getAurumContract();
  try {
    await contract.updateOwner(walletAddress, node);
  } catch (error) {
    console.error(
      `unable to updateOwner for wallet address ${walletAddress} and node: ${node}`
    );
  }
};

export const updateSupportedAssets = async (
  supportedAssetsList: number[],
  capacity: number[],
  nodeAddress: string
) => {
  const contract = await getAurumContract();
  try {
    await contract.updateSupportedAssets(
      supportedAssetsList,
      capacity,
      nodeAddress
    );
  } catch (error) {
    console.error(
      `unable to updateSupportedAssets for node address: ${walletAddress} and capacity: ${capacity} nodeAddress: ${nodeAddress}`
    );
  }
};

export const updateLocation = async (location: string, node: string) => {
  const contract = await getAurumContract();
  try {
    await contract.updateLocation(location, node);
  } catch (error) {
    console.error(
      `unable to updateLocation for location: ${location} and node: ${node}`
    );
  }
};

export const getNode = async (nodeAddress: string): Promise<Node> => {
  const contract = await getAurumContract();
  try {
    const nodeData = await contract.getNode(nodeAddress);
    return {
      location: nodeData.location,
      validNode: nodeData.validNode,
      owner: nodeData.owner,
      supportedAssets: nodeData.supportedAssets.map((assetId: bigint) =>
        Number(assetId)
      ),
      status: nodeData.status,
      capacity: nodeData.capacity.map((cap: bigint) => Number(cap)),
    };
  } catch (error) {
    console.error(`Unable to get node with address ${nodeAddress}:`, error);
    throw error;
  }
};

// As of current implmenetation, one wallet address will own one node
// Therefore length of nodeAddressList is 1
export const getOwnedNodeAddressList = async (): Promise<string[]> => {
  const contract = await getAurumContract();
  try {
    const nodeAddressList = await contract.ownedNodes(walletAddress);
    return nodeAddressList;
  } catch (error) {
    console.log(
      `Unable to get nodes addresses for owner address ${walletAddress}`,
      error
    );
    throw error;
  }
};

export const gasSafeUpdateCapacity = async (
  node: string,
  quantities: number[],
  assets: number[]
) => {
  const contract = await getAurumContract();
  try {
    await contract.gasSafeUpdateCapacity(node, quantities, assets);
  } catch (error) {
    console.error(
      `unable to gasSafeUpdateCapacity for node: ${node} quantities: ${quantities}, assets: ${assets}`
    );
  }
};

export const updateStatus = async (node: string) => {
  const contract = await getAurumContract();
  try {
    await contract.updateStatus(node);
  } catch (error) {
    console.error(`unable to updateStatus for node${node}`);
  }
};
export const nodeHandOff = async (
  node: string,
  driver: string,
  reciever: string,
  id: string,
  tokenIds: number[],
  token: string,
  quantities: number[],
  data: any
) => {
  const contract = await getAurumNodeContract(node);
  try {
    await contract.nodeHandoff(
      node,
      driver,
      reciever,
      id,
      tokenIds,
      token,
      quantities,
      data
    );
  } catch (error) {
    console.error(
      `unable nodeHandoff for node${node} driver: ${driver}, reciever: ${reciever}, id:${id} tokenIDs:  ${tokenIds} token: ${token} quantities: ${quantities} data: ${data}`,
      error
    );
  }
};

export const nodeHandOn = async (
  node: string,
  driver: string,
  reciever: string,
  id: string
) => {
  const contract = await getAurumNodeContract(node);
  try {
    await contract.nodeHandOn(driver, reciever, id);
  } catch (error) {
    console.error(
      `unable to updateStatus for node: ${driver} reciever: ${reciever} id: ${id}}`,
      error
    );
  }
};

export const fetchNodeOrders = async (): Promise<OrderC[]> => {
  const contract = await getAusysContract();
  try {
    const orderIdList = await contract.nodeToOrderIds(walletAddress);

    const orders: OrderC[] = await Promise.all(
      orderIdList.map(async (orderId: string) => {
        const order: OrderC = await contract.idToOrder(orderId);
        return order;
      })
    );

    return orders;
  } catch (error) {
    console.error(
      `Unable to get node orders for node address: ${walletAddress}`,
      error
    );
    return []; // Return an empty array if there's an error
  }
};

export const fetchCustomerOrders = async (): Promise<OrderC[]> => {
  const contract = await getAusysContract();
  try {
    const orderIdList = await contract.customerToOrderIds(walletAddress);

    const orders: OrderC[] = await Promise.all(
      orderIdList.map(async (orderId: string) => {
        const order: OrderC = await contract.idToOrder(orderId);
        return order;
      })
    );

    return orders;
  } catch (error) {
    console.error(
      `Unable to get customer orders for customer address: ${walletAddress}`,
      error
    );
    return []; // Return an empty array if there's an error
  }
};

// Ausys

export const jobCreation = async (
  locationData: ParcelData,
  recipientWalletAddress: string
) => {
  try {
    const contract = await getAusysContract();
    const jobTx = await contract.jobCreation(
      walletAddress,
      recipientWalletAddress,
      locationData,
      1,
      10
    );
    console.log(jobTx);
    const receipt = await jobTx.wait();
    console.log("Job Creation Transaction Hash:");
    console.log("Transaction Hash:", receipt.transactionHash);
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("success");
  } catch (error) {
    console.error("Error in jobCreation:", error);
    throw error;
  }
};

export const customerPackageSign = async (journeyId: string) => {
  try {
    const contract = await getAusysContract();
    const journey = await contract.jobIdToJourney(journeyId);
    const customerPackageSignTx = await contract.packageSign(
      journey.driver,
      walletAddress,
      journeyId
    );
    const receipt = await customerPackageSignTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error("Error in customerPackageSign:", error);
    throw error;
  }
};

export const driverPackageSign = async (journeyId: string) => {
  try {
    const contract = await getAusysContract();
    const journey = await contract.jobIdToJourney(journeyId);
    const driverPackageSignTx = await contract.packageSign(
      walletAddress,
      journey.customer,
      journeyId
    );
    const receipt = await driverPackageSignTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error("Error in driverPackageSign:", error);
    throw error;
  }
};

export const fetchCustomerJobs = async () => {
  const journeyIds = [];
  const jobs: Journey[] = [];
  const contract = await getAusysContract();
  try {
    let jobNumber;
    try {
      jobNumber = await contract.numberOfJobsCreatedForCustomer(walletAddress);
    } catch (error) {
      console.log(walletAddress);
      console.error(
        "Error fetching number of jobs created with walletAddress",
        walletAddress,
        "Error:",
        error
      );
      throw error;
    }
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
    console.error("General error in fetchCustomerJobs:", error);
    return []; // Return an empty array in case of an error
  }
};

export const fetchReceiverJobs = async () => {
  var signer: Signer | undefined;
  const contract = await getAusysContract();
  try {
    let jobNumber;
    try {
      jobNumber = await contract.numberOfJobsCreatedForReceiver(walletAddress);
    } catch (error) {
      console.error(
        "Error fetching number of jobs for receiver with wallet address",
        walletAddress,
        "Error:",
        error
      );
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
        console.error(
          `Error fetching job object with journeyId ${journeyId}:`,
          err
        );
      }
    }
    return jobsObjList;
  } catch (error) {
    console.error("General error in fetchReceiverJobs:", error);
    return []; // Return an empty array in case of an error
  }
};

export const checkIfDriverAssignedToJobId = async (journeyId: string) => {
  const contract = await getAusysContract();
  try {
    const journey = await contract.jobIdToJourney(journeyId);
    const isAssigned = journey.driver === ethers.ZeroAddress ? false : true;
    return isAssigned;
  } catch (error) {
    console.error("Error in checkIfDriverAssignedToJobId:", error);
    throw error;
  }
};

export const assignDriverToJobId = async (journeyId: string) => {
  const contract = await getAusysContract();
  try {
    const assignDriverToJobIdTx = await contract.assignDriverToJobId(
      walletAddress,
      journeyId
    );
    const receipt = await assignDriverToJobIdTx.wait();
    console.log(receipt);
  } catch (error) {
    console.error("Error in assignDriverToJobId:", error);
    throw error;
  }
};

export const fetchDriverUnassignedJourneys = async () => {
  const journeyIds: string[] = [];
  const journeys: Journey[] = [];
  let totalJobsCount;
  let journeyId: string | null = null;
  const contract = await getAusysContract();
  var journey;
  try {
    totalJobsCount = await contract.jobIdCounter();
  } catch (error) {
    console.error("Could not get total jobs count from blockchain");
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
  let journeyId: string | null = null;
  let journey: Journey;
  var numberOfJobsAssignedForDriver;
  const contract = await getAusysContract();
  try {
    numberOfJobsAssignedForDriver = await contract.numberOfJobsAssigned(
      walletAddress
    );
  } catch (error) {
    console.error("Could not get number of jobs assigned to driver");
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
  return journeys;
};

export const packageHandOn = async (
  customerAddress: string,
  driverAddress: string,
  journeyId: string
) => {
  const contract = await getAusysContract();
  var handOnSuccessful = false;
  try {
    handOnSuccessful = await contract.handOn(
      driverAddress,
      customerAddress,
      journeyId
    );
  } catch (error) {
    console.error("Could not call contract handOn");
    throw error;
  }
  return handOnSuccessful;
};

export const packageHandOff = async (
  customerAddress: string,
  driverAddress: string,
  journeyId: string
) => {
  let handOffSuccessful = false;
  const contract = await getAusysContract();
  try {
    handOffSuccessful = await contract.handOff(
      driverAddress,
      customerAddress,
      journeyId
    );
  } catch (error) {
    console.error("Could not call contract handOff");
    throw error;
  }
  return handOffSuccessful;
};

export const jobIdToJourney = async (journeyId: string) => {
  var signer: Signer | undefined;
  if (ethersProvider) signer = await ethersProvider.getSigner();
  else console.error("ethersProvider is underfined");
  const contract = await getAusysContract();
  if (signer) {
    try {
      const journey = await contract.jobIdToJourney(journeyId);
      return journey;
    } catch (error) {
      console.error("Could not fetch journey object");
      throw error;
    }
  }
};

export const customerMakeOrder = async (orderData: OrderC) => {
  const contract = await getAusysContract();
  try {
    await contract.orderCreation(orderData);
  } catch (error) {
    console.error("Could not make customer order", error);
    throw error;
  }
};
