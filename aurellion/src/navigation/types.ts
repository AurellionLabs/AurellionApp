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

