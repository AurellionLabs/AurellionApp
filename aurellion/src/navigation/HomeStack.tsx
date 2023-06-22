import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WalletScreen from '../screens/wallet/wallet.screen'
import HomeScreen from '../screens/home/home.screen';
import SignatureScreen from '../screens/signature/signature.screen';
import UserSelectionScreen from '../screens/userSelection/userSelection.screen';
import { HomeStackNavigatorParamList } from './types';

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="UserSelection">
            <HomeStack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />               
            <HomeStack.Screen name="Wallet" component={WalletScreen} />
            <HomeStack.Screen options={{ headerShown: false }} name="Signature" component={SignatureScreen} />
            <HomeStack.Screen options={{ headerShown: false }} name="UserSelection" component={UserSelectionScreen} />
        </HomeStack.Navigator>
    )
}

export default HomeStackNavigator;