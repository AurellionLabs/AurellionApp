export type location = {
    lat: string;
    lng: string;
}
export type PackageDeliveryData = {
    startLocation: location;
    endLocation: location;
    startName: string;
    endName: string;
}
export type UserType = 'customer' | 'driver';

export type AurumNode = {
    location: location;
    validNode: Uint8Array;
    owner: string;
    supportedAssets: number[];
    status: Uint8Array;
    capacity: number[];
    //capacity needs to be kept on an asset by asset basis
}
