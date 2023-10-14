import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WalletScreen from "../screens/wallet/wallet.screen";
import DeliveryOptions from "../screens/deliveryOptions/deliveryOptions.screen";
import SignatureScreen from "../screens/signature/signature.screen";
import UserSelectionScreen from "../screens/userSelection/userSelection.screen";
import { HomeStackNavigatorParamList } from "./types";
import LocationsScreen from "../screens/locationsScreen/locations.screen";
import JobScreen from "../screens/jobs/jobs.screen";
import AssignDriverScreen from "../screens/assignDriver/assignDriver.screen";
import ConfirmationScreen from "../screens/confirmationScreen/confirmation.screen";
import RecipientWalletAddressScreen from "../screens/recipientWalletAddressScreen/recipientWalletAddress.screen";

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Wallet">
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="DeliveryOptions"
        component={DeliveryOptions}
      />
      <HomeStack.Screen name="Wallet" component={WalletScreen} />
      <HomeStack.Screen options={{ headerShown: false }} name="Signature" component={SignatureScreen} />
      <HomeStack.Screen options={{ headerShown: false }} name="AssignDriver" component={AssignDriverScreen} />
      <HomeStack.Screen options={{ headerShown: false }} name="Jobs" component={JobScreen} />
      <HomeStack.Screen options={{ headerShown: false }} name="Locations" component={LocationsScreen} />
      <HomeStack.Screen name="Confirmation" component={ConfirmationScreen} />
      <HomeStack.Screen name="RecipientWalletAddress" component={RecipientWalletAddressScreen} />
      {/* <HomeStack.Screen options={{ headerShown: false }} name="UserSelection" component={UserSelectionScreen} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
