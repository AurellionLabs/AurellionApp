import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackNavigatorParamList = {
    DeliveryOptions: undefined;
    Wallet: undefined;
    Signature: {
        heading: string
        jobID: string
    }
    UserSelection: undefined;
    Jobs: undefined;
    Locations: undefined;
};

export type DeliveryOptionsScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'DeliveryOptions'
>;

export type WalletScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Wallet'
>;

export type SignatureScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Signature'
>;

export type UserSelectionScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'UserSelection'
>;

export type SignatureScreenRouteProp = RouteProp<HomeStackNavigatorParamList, 'Signature'>;


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
