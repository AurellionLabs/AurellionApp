export type Location = {
    lat:number;
    lng:number;
}

export type ParcelData = {
    startLocation: Location;
    endLocatio: Location;
    name: string;
    //add customer?
    //add driver?
    //add box
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
    lat: number;
    lng: number;
}
export type PackageDeliveryData = {
    sendingLocation : location;
    recipientLocation : Location;
    sendingAddress: string;
    recipientAddress:string;
}