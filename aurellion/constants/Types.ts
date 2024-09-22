export type Location = {
    lat: string;
    lng: string;
  };
  
  export type ParcelData = {
    startLocation: Location;
    endLocation: Location;
    startName: string;
    endName: string;
  };
  
  export enum JourneyStatus {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    CANCELED = 3,
  }
  
  export type Journey = {
    parcelData: ParcelData;
    jobId: string;
    currentStatus: JourneyStatus;
    customer: string;
    reciever: string;
    driver: string;
    journeyStart: number;
    journeyEnd: number;
    bounty: number;
    ETA: number;
  };

  export type Asset = {
    id: string,
    assetType: string,
    assetClass: string,
    totalQuantity: number,
    image?: any
  }
  
  export type UserType = 'customer' | 'driver';
  
  export enum DeliverySpeedOption {
    FAST,
    SLOW,
    MEDIUM,
  }

  export enum RoleType {
    Customer,
    Driver,
    Node
  }

  export enum NodeStatus {
    Active,
    Inactive
  }
  
  export type DeliveryOption = {
    deliverySpeed?: DeliverySpeedOption;
    price?: number;
    eta?: number;
  };

  export type Order = {
    id: string,
    buyerName: string,
    assetType: string,
    assetClass: string,
    quantity: number
    image?: any
  }
  