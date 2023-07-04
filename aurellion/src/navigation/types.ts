import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackNavigatorParamList = {
    Home: undefined;
    Wallet: undefined;
    Signature: {
        heading: string
        jobID: string
    }
    UserSelection: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Home'
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
