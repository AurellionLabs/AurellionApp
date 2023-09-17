import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackNavigatorParamList = {
  DeliveryOptions: undefined;
  Wallet: undefined;
  Signature: {
    heading: string;
    jobID: string;
  };
  UserSelection: undefined;
  Jobs: undefined;
  Locations: undefined;
  AssignDriver: {
    jobID: string;
  };
};

export type DeliveryOptionsScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "DeliveryOptions"
>;

export type WalletScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "Wallet"
>;

export type SignatureScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "Signature"
>;

export type UserSelectionScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "UserSelection"
>;

export type SignatureScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "Signature"
>;

export type LocationsScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "Locations"
>;

export type AssignDriverScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "AssignDriver"
>;

export type AssignDriverScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "AssignDriver"
>;

export type JobsScreenNavigationProp = StackNavigationProp<
  HomeStackNavigatorParamList,
  "Jobs"
>;
