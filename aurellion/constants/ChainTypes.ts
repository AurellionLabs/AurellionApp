import { ParcelData } from "./Types";

export enum Status {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Canceled = "Canceled",
}

export interface Order {
  id: string;
  token: string;
  tokenId: number;
  tokenQuantity: number;
  requestedTokenQuantity: number;
  price: number;
  txFee: number;
  customer: string;
  journeyIds: string[];
  nodes: string[];
  locationData: ParcelData;
  currentStatus: Status;
  contracatualAgreement: string[];
}

export type Node = {
    location: string;
    validNode: string;
    owner: string;
    supportedAssets: number[]; 
    status: string;
    capacity: number[];       
};


export enum NodeStatus {
    Active = "0x01",
    Inactive = "0x00"
}

export enum NodeValidity {
    Valid = "0x01",
    Invalid = "0x00"
}