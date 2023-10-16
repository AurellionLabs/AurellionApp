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
  Status: string;
  customer: string;
  reciever: string;
  driver: string;
  journeyStart: number;
  journeyEnd: number;
  bounty: number;
  ETA: number;
};

export type UserType = 'customer' | 'driver';
