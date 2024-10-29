import { ParcelData } from "./Types";

enum Status {
    Pending = "Pending",
    InProgress = "InProgress",
    Completed = "Completed",
    Canceled = "Canceled"
  }

export type Order = {
    id: string; 
    token: string; 
    tokenId: number[]; 
    tokenQuantity: number[]; 
    price: number; 
    amount: string;
    txFee: number; 
    customer: string; 
    journeys: string[]; 
    nodes: string[]; 
    locationData: ParcelData;
    currentStatus: Status;
    contracatualAgreement: string; 
  }