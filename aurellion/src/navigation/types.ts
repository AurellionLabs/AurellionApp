import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackNavigatorParamList = {
    Home: undefined;
    Wallet: undefined;
    Signature: {
        heading: string
    }
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

export type SignatureScreenRouteProp = RouteProp<HomeStackNavigatorParamList, 'Signature'>;
