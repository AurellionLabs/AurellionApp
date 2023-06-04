import { StackNavigationProp } from "@react-navigation/stack";

export type HomeStackNavigatorParamList = {
    Home: undefined;
    Wallet: undefined;
    Signature: undefined;
    Locations: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Signature'
>;

export type WalletScreenNavigationProp = StackNavigationProp<
    HomeStackNavigatorParamList,
    'Home'
>;
