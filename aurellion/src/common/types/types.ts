export type Location = {
    lat:number;
    lng:number;
}

export type ParcelData = {
    startLocation: location;
    endLocation: location;
    startName: string;
    endName: string;
}

export type Journey = {
    parcelData: ParcelData;
    jobId: string;
    Status: string;
    customer: string;
    reciever: string;
    driver: string;
    journeyStart:number;
    journeyEnd : number;
    bounty: number;
    ETA: number;
}

export type location = {
    lat: string;
    lng: string;
}

export type UserType = 'customer' | 'driver';
