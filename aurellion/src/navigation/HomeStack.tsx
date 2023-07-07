import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WalletScreen from '../screens/wallet/wallet.screen'
import DeliveryOptions from '../screens/deliveryOptions/deliveryOptions.screen';
import SignatureScreen from '../screens/signature/signature.screen';
import LocationsScreen from '../screens/locationsScreen/locations.screen';
import { HomeStackNavigatorParamList } from './types';
import JobScreen from '../screens/jobs/jobs.screen';

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="Wallet">
            <HomeStack.Screen options={{ headerShown: false }} name="DeliveryOptions" component={DeliveryOptions} />
            <HomeStack.Screen name="Wallet" component={WalletScreen} />
            <HomeStack.Screen options={{ headerShown: false }} name="Signature" component={SignatureScreen} />
            <HomeStack.Screen options={{ headerShown: false }} name="Jobs" component={JobScreen} />
            <HomeStack.Screen name="Locations" component={LocationsScreen} />
        </HomeStack.Navigator>
    )
}

export default HomeStackNavigator;