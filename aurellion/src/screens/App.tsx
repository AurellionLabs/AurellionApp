import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WalletScreen from './wallet/wallet.screen';
import HomeScreen from './home/home.screen';
import SelectionScreen from './browse/selectionScreen'
import React, {useState, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {DarkTheme, LightTheme} from '../common/constants/Colors';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WalletScreen">
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="selectionScreen" component={SelectionScreen} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
