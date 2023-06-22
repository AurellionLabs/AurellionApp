import React, { useState } from 'react';
import {
  useColorScheme,
} from 'react-native';
import {
  Container,
} from '../../common/components/StyledComponents';
import Menu from './components/Menu'
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import MapView, { Marker, Region } from 'react-native-maps';


const HomeScreen = () => {
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
      <Menu />
    </Container>
  );
};




export default HomeScreen;