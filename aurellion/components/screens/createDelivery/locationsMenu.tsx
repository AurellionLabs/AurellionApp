import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Region } from 'react-native-maps';
import { RedButton, RedButtonText } from '@/components/common/StyledComponents';
// import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '@/providers/main.provider';
import { ParcelData } from '@/constants/Types';
import { LightTheme, DarkTheme } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

const GMAPS_API_KEY = 'AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA';

interface LocationMenuProps {
  region: Region;
  setRegion: React.Dispatch<React.SetStateAction<Region>>;
  isKeyboardVisible: boolean;
}

interface GeoLocationCoords {
  lat: number;
  lng: number;
}

interface Geometry {
  location: GeoLocationCoords;
}

enum AutocompleteLocationField {
  SENDING,
  RECIPIENT,
}

type AutocompleteState = {
  autocompleteState: boolean;
  fieldName: AutocompleteLocationField;
};

const LocationsMenu = ({ region, setRegion, isKeyboardVisible }: LocationMenuProps) => {
  const { setPackageDeliveryData } = useMainContext();
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [sendingAddress, setSendingAddress] = useState("Enter sending address");
  const [recipientAddress, setRecipientAddress] = useState(
    "Enter recipient address"
  );
  const [currentLocationCoords, setCurrentLocationCoords] = useState<Geometry>({
    location: { lat: 0, lng: 0 },
  });

  const [sendingAutocomplete, setSendingAutocomplete] =
    useState<AutocompleteState>({
      autocompleteState: false,
      fieldName: AutocompleteLocationField.SENDING,
    });
  const [recipientAutocomplete, setRecipientAutocomplete] = useState({
    autocompleteState: false,
    fieldName: AutocompleteLocationField.RECIPIENT,
  });

  // navigator.geolocation = require('expo-location');s

  const { isDarkMode } = useMainContext();

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCurrentLocationCoords({
          location: { lat: latitude, lng: longitude },
        });
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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

  const handleSendingAddressChange = (text: string) => {
    setSendingAddress(text);
  };

  const handleRecipientAddressChange = (text: string) => {
    setRecipientAddress(text);
  };

  const geocodeAddress = (
    address: string
  ): Promise<{ latitude: number; longitude: number }> => {
    const apiKey = GMAPS_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    return fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const result = data.results[0];
          const { lat, lng }: GeoLocationCoords = result.geometry.location;
          return {
            latitude: lat,
            longitude: lng,
          };
        } else {
          throw new Error("Geocoding request failed");
        }
      })
      .catch((error) => {
        console.error("Error geocoding address:", error);
        throw error;
      });
  };

  const handleSubmit = () => {
    if (sendingAddress && recipientAddress) {
      // Get latitude and longitude for sendingAddress and recipientAddress
      const geocodePromises = [
        geocodeAddress(sendingAddress),
        geocodeAddress(recipientAddress),
      ];

      Promise.all(geocodePromises)
        .then(([sendingLocation, recipientLocation]) => {
          console.log('sendingLocation, recipientLocation');
          console.log(sendingLocation, recipientLocation);
          // Extract latitude and longitude
          const sendingLatitude = sendingLocation.latitude.toString();
          const sendingLongitude = sendingLocation.longitude.toString();
          const recipientLatitude = recipientLocation.latitude.toString();
          const recipientLongitude = recipientLocation.longitude.toString();

          const packageDeliveryData: ParcelData = {
            startLocation: {
              lat: sendingLatitude,
              lng: sendingLongitude,
            },
            endLocation: {
              lat: recipientLatitude,
              lng: recipientLongitude,
            },
            startName: sendingAddress,
            endName: recipientAddress,
          };
          setPackageDeliveryData(packageDeliveryData);

          console.log("in Submit");
          console.log("packageDeliveryData");
          console.log(packageDeliveryData);

          setRegion({
            latitude: parseFloat(sendingLatitude),
            longitude: parseFloat(sendingLongitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          // navigation.navigate('RecipientWalletAddress');
        })
        .catch((error) => {
          console.error("Error geocoding addresses:", error);
        });
    }
  };

  useEffect(() => {
    if (!isKeyboardVisible) {
      setSendingAutocomplete({
        autocompleteState: false,
        fieldName: AutocompleteLocationField.SENDING,
      });
      setRecipientAutocomplete({
        autocompleteState: false,
        fieldName: AutocompleteLocationField.RECIPIENT,
      });
    }
  }, [isKeyboardVisible]);

  function getTextStyle(touched: AutocompleteState, other: AutocompleteState) {
    if (
      touched.autocompleteState == false &&
      other.autocompleteState == false
    ) {
      return {
        height: 15,
        paddingHorizontal: 15,
        paddingBottom: "13%",
      };
    } else if (
      touched.autocompleteState == true &&
      touched.fieldName == AutocompleteLocationField.SENDING
    ) {
      return {
        height: "100%",
        paddingHorizontal: 15,
      };
    } else if (
      touched.autocompleteState == true &&
      touched.fieldName == AutocompleteLocationField.RECIPIENT
    ) {
      return {
        height: "100%",
        paddingHorizontal: 15,
      };
    } else if (
      touched.fieldName == AutocompleteLocationField.SENDING &&
      touched.autocompleteState == false &&
      other.fieldName == AutocompleteLocationField.RECIPIENT &&
      other.autocompleteState == true
    ) {
      return {
        height: 15,
        paddingHorizontal: 15,
        paddingBottom: "13%",
        ariaDisabled: true,
      };
    }
    // when touched.fieldName == AutocompleteLocationField.RECIPIENT && touched.autocompleteState == false
    // && other.fieldName == AutocompleteLocationField.SENDING && other.autocompleteState == true
    else {
      return {
        display: "none",
      };
    }
  }

  const currentLocationGeo = {
    description: currentAddress,
    formatted_address: currentAddress,
    geometry: currentLocationCoords, 
  };

  const sendingPlacesAutocompleteRef: any = useRef();
  const recipientPlacesAutocompleteRef: any = useRef();

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.locationsMenu}>
      <SafeAreaView style={[{ paddingTop: '7%', flex: 1,}, getTextStyle(sendingAutocomplete, recipientAutocomplete), styles.safeAreaVeiw]}>
        <GooglePlacesAutocomplete
        listViewDisplayed="auto"
          ref={sendingPlacesAutocompleteRef}
          placeholder={sendingAddress}
          onPress={(data, details = null) => {
            let address = details?.formatted_address || '';
            setSendingAddress(address);
          }}
          fetchDetails={true}
          query={{
            key: GMAPS_API_KEY,
            language: 'en',
          }}
          // currentLocation={true} // Not working with Expo Location as navigator.geolocation
          styles={textInputStyles(isDarkMode)}
          textInputProps={{
            onFocus: () => {
              setSendingAutocomplete((prevState) => ({ ...prevState, autocompleteState: true }));
              setRecipientAutocomplete((prevState) => ({ ...prevState, autocompleteState: false }));
              if(sendingAddress == currentLocationGeo.formatted_address) {
                setSendingAddress('Enter sending address');
                sendingPlacesAutocompleteRef.current?.setAddressText('');
                sendingPlacesAutocompleteRef.placeholder = 'Enter sending address';
              }
            },
            clearButtonMode: 'never',
            placeholderTextColor: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
          }}
          renderRightButton={() => (
            <Ionicons name="close" size={20} color={
              isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1
            } onPress={() => {
              setSendingAddress('Enter sending address');
              sendingPlacesAutocompleteRef.current?.setAddressText('');
              sendingPlacesAutocompleteRef.placeholder = 'Enter sending address';
           }} 
              style={{
                display: sendingAddress !== 'Enter sending address' ? 'flex' : 'none',
                position: 'absolute',
                right: 0,
                top: 10,
                zIndex: 1,
              }}/>)}
          predefinedPlaces={[currentLocationGeo, { description: 'Current Location', formatted_address: currentLocationGeo.formatted_address, geometry: currentLocationCoords }]}
        />
      </SafeAreaView>
      <SafeAreaView style={[getTextStyle(recipientAutocomplete, sendingAutocomplete), styles.safeAreaVeiw]}>
        <GooglePlacesAutocomplete
          ref={recipientPlacesAutocompleteRef}
          placeholder={recipientAddress}
          onPress={(data, details = null) => {
            let address = details?.formatted_address || '';
            setRecipientAddress(address);
          }}
          fetchDetails={true}
          query={{
            key: GMAPS_API_KEY,
            language: 'en',
          }}
          // currentLocation={true} // Not working with Expo Location as navigator.geolocation
          styles={textInputStyles(isDarkMode)}
          textInputProps={{
            onFocus: () => {
              setRecipientAutocomplete((prevState) => ({ ...prevState, autocompleteState: true }));
              setSendingAutocomplete((prevState) => ({ ...prevState, autocompleteState: false }));
              if(recipientAddress == currentLocationGeo.formatted_address) {
                setRecipientAddress('Enter recipient address');
                recipientPlacesAutocompleteRef.current?.setAddressText('');
                recipientPlacesAutocompleteRef.placeholder = 'Enter recipient address';
              }
            },
            clearButtonMode: 'never',
            placeholderTextColor: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
          }}
          renderRightButton={() => (
            <Ionicons name="close" size={20} color={
              isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1
            } onPress={() => {
              setRecipientAddress('Enter recipient address');
              recipientPlacesAutocompleteRef.current?.setAddressText('');
              recipientPlacesAutocompleteRef.placeholder = 'Enter recipient address';
            }}
            style={{
              display: recipientAddress !== 'Enter recipient address' ? 'flex' : 'none',
              position: 'absolute',
              right: 0,
              top: 10,
              zIndex: 1,
            }}/>
          )}
          predefinedPlaces={[currentLocationGeo, { description: 'Current Location', formatted_address: currentLocationGeo.formatted_address, geometry: currentLocationCoords }]}
        />
      </SafeAreaView>
      {!isKeyboardVisible && (
        <View
          style={{ borderRadius: 50, alignSelf: "center", marginBottom: 5 }}
        >
          <RedButton
            onPress={handleSubmit}
            styles={{ width: "100px", height: "40px" }}
          >
            <RedButtonText>Submit</RedButtonText>
          </RedButton>
        </View>
      )}
    </View>
  );
};

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  locationsMenu: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
    position: 'absolute',
    top: 0,
  },
  safeAreaVeiw: {
    backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
  },

});

  const textInputStyles = (isDarkMode: boolean) => {
    return {
      container: {
        marginBottom: 10,
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
      },
      textInputContainer: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
      },
      textInput: {
        height: 40,
        marginRight: 20,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: isDarkMode ? DarkTheme.background2 : LightTheme.background2,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
      },
      row: {
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
        // paddingVertical: 0,
        // paddingHorizontal: 0,
      },
      description: {
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
      },
    
    containerResultRow: {
        flex: 1,
        height: 55,
        justifyContent: 'center',
        // paddingHorizontal: 15,
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
        color: isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1,
      },
      poweredContainer: {
        backgroundColor: isDarkMode ? DarkTheme.background1 : LightTheme.background2,
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
  

export default LocationsMenu;
