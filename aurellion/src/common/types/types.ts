export type Location = {
  lat: number;
  lng: number;
};

export type ParcelData = {
  startLocation: Location;
  endLocation: Location;
  startName: string;
  endName: string;
};

export type Journey = {
  parcelData: ParcelData;
  jobId: string;
  currentStatus: string;
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
