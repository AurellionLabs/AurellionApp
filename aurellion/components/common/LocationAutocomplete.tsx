import React, { useState, useRef, useEffect } from 'react';
import * as ExpoLocation from 'expo-location';
import { Location } from '@/constants/Types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import { LightTheme, DarkTheme } from '@/constants/Colors';
import { GMAPS_API_KEY, GeoLocationCoords, Geometry } from '@/components/screens/createDelivery/locationsMenu';

interface LocationAutocompleteProps {
  address: string;
  setAddress: (address: string) => void;
  location: Location;
  setLocation: (location: Location) => void;
  placeHolder: string;
  isDarkMode: boolean;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  address,
  setAddress,
  location,
  setLocation,
  placeHolder,
  isDarkMode,
}) => {

  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [currentLocationCoords, setCurrentLocationCoords] = useState<Geometry>({
      location: { lat: 0, lng: 0 },
  });
  const currentLocationGeo = {
      description: currentAddress,
      formatted_address: currentAddress,
      geometry: currentLocationCoords, 
  };
  const locationAutocompleteRef: any = useRef(null);

  // TODO: needs to be refactored to avoid useEffect in a component
  useEffect(() => {
    const requestLocationPermission = async () => {
        try {
        let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await ExpoLocation.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocationCoords({
            location: { lat: latitude, lng: longitude },
        });
        
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GMAPS_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
            const address = data.results[0].formatted_address;
            setCurrentAddress(address);
            })
            .catch((error) => console.error(error));
        } catch (error) {
        console.error(error);
        }
    };
  requestLocationPermission();
  }, []);


  return (
    <GooglePlacesAutocomplete
      listViewDisplayed="auto"
      ref={locationAutocompleteRef}
      placeholder={address}
      onPress={(data, details = null) => {
        let address = details?.formatted_address || '';
        setAddress(address);
        setLocation({
          lat: details?.geometry?.location?.lat.toString() || '',
          lng: details?.geometry?.location?.lng.toString() || '',
        });
        console.log(address);
        console.log(details?.geometry?.location);
      }}
      fetchDetails={true}
      query={{
        key: GMAPS_API_KEY,
        language: 'en',
      }}
      styles={textInputStyles(isDarkMode)}
      textInputProps={{
        onFocus: () => {
          if (address === currentLocationGeo.formatted_address) {
            setAddress(placeHolder);
            locationAutocompleteRef.current?.setAddressText('');
            locationAutocompleteRef.placeholder = placeHolder;
          }
        },
        clearButtonMode: 'never',
        placeholderTextColor: isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1,
      }}
      renderRightButton={() => (
        <Ionicons
          name="close"
          size={20}
          color={isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1}
          onPress={() => {
            setAddress(placeHolder);
            locationAutocompleteRef.current?.setAddressText('');
            locationAutocompleteRef.placeholder = placeHolder;
          }}
          style={{
            display: address !== placeHolder ? 'flex' : 'none',
            position: 'absolute',
            right: 0,
            top: 10,
            zIndex: 1,
          }}
        />
      )}
      predefinedPlaces={[
        currentLocationGeo,
        { description: 'Current Location', formatted_address: currentLocationGeo.formatted_address, geometry: currentLocationCoords },
      ]}
    />
  );
};

export const textInputStyles = (isDarkMode: boolean) => {
    return {
      container: {
        marginBottom: 10,
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background1,
      },
      textInputContainer: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background1,
      },
      textInput: {
        height: 40,
        marginRight: 20,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: isDarkMode ? DarkTheme.background4 : LightTheme.background1,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
      },
      row: {
        backgroundColor: isDarkMode ? DarkTheme.background4 : LightTheme.background1,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
        // paddingVertical: 0,
        // paddingHorizontal: 0,
      },
      description: {
        backgroundColor: isDarkMode ? DarkTheme.background4 : LightTheme.background1,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
      },
    
    containerResultRow: {
        flex: 1,
        height: 55,
        justifyContent: 'center',
        // paddingHorizontal: 15,
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background1,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
      },
      poweredContainer: {
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background1,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'none',
      },
      powered: {
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
        display: 'none',
      },
    };
    };

export default LocationAutocomplete;