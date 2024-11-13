import { ParcelData, Location } from "./Types";

export enum Status {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  CANCELED = 3,
}

export interface OrderC {
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

export type NodeLocation = {
  addressName: string;
  location: Location;
};

export type Node = {
  location: NodeLocation;
  validNode: string;
  owner: string;
  supportedAssets: number[];
  status: string;
  capacity: number[];
};

export enum NodeStatus {
  Active = "0x01",
  Inactive = "0x00",
}

export enum NodeValidity {
  Valid = "0x01",
  Invalid = "0x00",
}
