import React, { useState, useCallback, useEffect } from 'react';

import {
  StyleSheet,
  Keyboard,
} from 'react-native';

import MapView, { Region } from 'react-native-maps';
import LocationsMenu from '@/components/screens/createDelivery/locationsMenu';
import { useMainContext } from '@/providers/main.provider';
import { Container, StyledText } from '@/components/common/StyledComponents';

const SendPackage = () => {
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
    <Container >
      {!isKeyboardVisible && <MapView style={styles.mapView} showsUserLocation region={region} showsCompass />}
      <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700, fontSize: 17 }}>
            Send Package Screen
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
  locationsMenu: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
  mapView: {
    flex: 1,
    width: '100%',
  },
});

export default SendPackage;