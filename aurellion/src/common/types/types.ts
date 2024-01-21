export type Location = {
  lat: number;
  lng: number;
};

export type ParcelData = {
  startLocation: Location;
  endLocatio: Location;
  name: string;
  //add customer?
  //add driver?
  //add box
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

export type location = {
  lat: string;
  lng: string;
};
export type PackageDeliveryData = {
  startLocation: location;
  endLocation: location;
  startName: string;
  endName: string;
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
