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
    journeyId: string;
    currentStatus: JourneyStatus;
    customer: string;
    reciever: string;
    driver: string;
    journeyStart: number;
    journeyEnd: number;
    bounty: number;
    ETA: number;
  };
  
  export type UserType = 'customer' | 'driver';
  
  export enum DeliverySpeedOption {
    FAST,
    SLOW,
    MEDIUM,
  }
  
  export type DeliveryOption = {
    deliverySpeed?: DeliverySpeedOption;
    price?: number;
    eta?: number;
  };
  
