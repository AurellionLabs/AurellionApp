import { ethers } from 'ethers';
import { getSigner } from './wallet-utils';
import { REACT_APP_AUSYS_CONTRACT_ADDRESS, REACT_APP_AURA_CONTRACT_ADDRESS } from '@env';
import { PackageDeliveryData, Journey } from '../common/types/types';
const contractABI = require('./aurellion-abi.json');
export async function listenForSignature(jobID: string): Promise<boolean> {
  try {
    const signer = await getSigner();
    if (!signer) {
      throw new Error('Signer is undefined');
    }
    const contract = new ethers.Contract(REACT_APP_AUSYS_CONTRACT_ADDRESS, contractABI, signer);
    const journey = await contract.jobIdToJourney(jobID);
    let driverSig;
    let customerSig;
    let recieverSig;
    let sigCount = 0;
    try {
      customerSig = await contract.customerHandOff(journey.customer, jobID);
      if (customerSig) sigCount += 1;
    } catch (e) {
      console.log(await customerSig);
      console.log(journey.customer);
      console.error('Error when trying to fetch customer hand off:', e);
    }
    try {
      driverSig = await contract.driverHandOn(journey.driver, jobID);
      if (driverSig) sigCount += 1;
    } catch (e) {
      console.log(driverSig);
      console.log(journey.driver);
      console.error('Error when trying to fetch driver hand on:', e);
    }
    if (driverSig && customerSig == true) {
      return true;
    } else {
      // Wrapping the event listener in a Promise to allow awaiting on a specific condition/event.
      return new Promise((resolve, reject) => {
        console.log('Listening...');
        console.log(sigCount);
        var prevSig: string;
        const filteredSigs = contract.filters.emitSig(null, jobID);
        console.log('filteredSigs');
        const timeout = setTimeout(() => {
          contract.off(filteredSigs, handler); // Stop listening to prevent memory leaks
          reject(new Error('Timeout: No signature detected within the specified time.'));
        }, 120000);

        const handler = (id: string, address: string) => {
          if (id === jobID) {
            if (prevSig !== address) {
              console.log(`Signature detected! From: ${address}, jobID: ${id}`);
              sigCount += 1;
              prevSig = address;
              if (sigCount >= 2) {
                // Define your condition to resolve
                contract.off(filteredSigs, handler); // Remove listener once done
                clearTimeout(timeout);
                resolve(true);
              }
            }
          } else {
            console.log('No signature detected yet...');
          }
        };
        contract.on(filteredSigs, handler);
        console.log('Listening...');
      });
    }
  } catch (e) {
    console.log('Failed listening to events:', e);
    return false;
  }
}
