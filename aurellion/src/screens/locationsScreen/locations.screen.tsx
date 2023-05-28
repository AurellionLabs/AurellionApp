import React, { useState, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image
} from 'react-native';
import {
  Container,
} from '../../common/components/StyledComponents';
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Region } from 'react-native-maps';
import LocationsMenu from './components/locationsMenu';


const LocationsScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
    
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <Container style={{ backgroundColor }}>
      <MapView style={{ flex: 1, width: '100%', height: '100%' }} region={region} />
      <LocationsMenu />
    </Container>
  );
};




export default LocationsScreen;