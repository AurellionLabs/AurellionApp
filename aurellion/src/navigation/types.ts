import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackNavigatorParamList = {
    DeliveryOptions: undefined;
    Wallet: undefined;
    Signature: undefined;
    Jobs: undefined;
    Locations: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Signature'
>;

export type WalletScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'DeliveryOptions'

>;


export type LocationsScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Locations'
>;

export type JobScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Jobs'
>;

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