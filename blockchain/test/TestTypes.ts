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
