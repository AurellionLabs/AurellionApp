import { ethers } from 'ethers';
//import { REACT_APP_AUSYS_CONTRACT_ADDRESS, REACT_APP_AURA_CONTRACT_ADDRESS } from "@env";
import contractABI from "./aurellion-abi.json";
import { getSigner } from "./wallet-utils";

const signer = getSigner();

interface EventObject {
  id: string;
  type: string;
  value: any;
  age: string;
  killEvent: (id: string) => void;
  catEvent: () => void;
}

let sigEvents: EventObject[] = [];

const eventObject: EventObject = { 
  id: "",
  type: "",
  value: undefined,
  age: "",
  killEvent: (id: string) => { eventObject.id = id; },
  catEvent: () => { console.log(eventObject.id, eventObject.type, eventObject.value, eventObject.age); }
};

console.log("Listening..........................................");

const contract = new ethers.Contract(
  "0x751619a283c4b8dB3aE3dc0579E91511bB701345",
  contractABI,
  await signer
);

contract.on('emitSig', (eventData) => {
  console.log('Event received:', eventData);
  eventObject.id = eventData.id;
  eventObject.value = eventData.value;
  if (eventObject.value === "Signed") {
    eventObject.type = "SignatureEvent";
    eventObject.age = "new";
    sigEvents.push(eventObject);
  }
});

export const getAllEventsForType = (id: string, type: string) => {
  const events = sigEvents.filter(event => event.type === type && event.id === id);
  return events;
};

export const killOldEvents = () => {
  const events = sigEvents.filter(event => event.age === "old");
  const killList = events;
  events.forEach(event => {
    event.killEvent(event.id);
  });
  console.log("killed Old Events", killList);
};
