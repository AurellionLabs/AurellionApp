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
  Image,
  Keyboard,
  Platform,
} from 'react-native';
import { Container, StyledText } from '@/components/common/StyledComponents';
import MapView, { Marker, Region } from 'react-native-maps';
import LocationsMenu from '@/components/screens/createDelivery/locationsMenu';
import { useMainContext } from '@/providers/main.provider';

const LocationsScreen = () => {
  const { isDarkMode } = useMainContext();
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isKeyboardVisible]);

  return (
    <Container style={styles.container}>
      {!isKeyboardVisible && <MapView style={styles.mapView} showsUserLocation region={region} showsCompass />}
      <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700, fontSize: 17 }}>
            Create Delivery Screen
      </StyledText>
      {/* <LocationsMenu
        style={styles.locationsMenu}
        region={region}
        setRegion={setRegion}
        isKeyboardVisible={isKeyboardVisible}
      /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // backgroundColor:
    // backgroundColor: 'blue',
    // flex: 1,
    // flexDirection:'column',
  },
  locationsMenu: {
    // flex: 1,
    width: '100%',
    borderRadius: 30,
    backgroundColor: 'white',
    // height: '30%',
    position: 'absolute',
    top: 0,
  },
  mapView: {
    flex: 1,
    width: '100%',
    // height: '100%',
    // height: '70%'
  },
});

export default LocationsScreen;
