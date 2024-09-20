import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Keyboard,
} from 'react-native';
import MapView, { Region } from 'react-native-maps';
import LocationsMenu from '@/components/screens/createDelivery/locationsMenu';
import { useMainContext } from '@/providers/main.provider';
import { Container } from '@/components/common/StyledComponents';

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
    <SafeAreaView style={styles.safeArea}>
      <Container isDarkMode={isDarkMode}>
        {!isKeyboardVisible && <MapView style={styles.mapView} showsUserLocation region={region} showsCompass />}
        <LocationsMenu
          region={region}
          setRegion={setRegion}
          isKeyboardVisible={isKeyboardVisible}
        />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  locationsMenu: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  mapView: {
    flex: 1,
    width: '100%',
  },
});

export default SendPackage;