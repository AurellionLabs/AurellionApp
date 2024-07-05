import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Region } from 'react-native-maps';
import { RedButton, RedButtonText } from '@/components/common/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '@/providers/main.provider';
import { PackageDeliveryData } from '@/constants/Types';
import { LightTheme } from '@/constants/Colors';
const GMAPS_API_KEY = 'AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA';
interface LocationMenuProps {
  region: Region;
  setRegion: React.Dispatch<React.SetStateAction<Region>>;
  isKeyboardVisible: boolean;
  style: any;
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

const LocationsMenu = ({ region, setRegion, isKeyboardVisible, style }: LocationMenuProps) => {
  // const navigation = useNavigation<RecipientWalletAddrScreenNavigationProp>();
  const { setPackageDeliveryData } = useMainContext();
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [sendingAddress, setSendingAddress] = useState('Enter sending address');
  const [recipientAddress, setRecipientAddress] = useState('Enter recipient address');
  const [currentLocationCoords, setCurrentLocationCoords] = useState<Geometry>({
    location: { lat: 0, lng: 0 },
  });

  const [sendingAutocomplete, setSendingAutocomplete] = useState<AutocompleteState>({
    autocompleteState: false,
    fieldName: AutocompleteLocationField.SENDING,
  });
  const [recipientAutocomplete, setRecipientAutocomplete] = useState({
    autocompleteState: false,
    fieldName: AutocompleteLocationField.RECIPIENT,
  });

  navigator.geolocation = require('@react-native-community/geolocation');

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        });
        console.log('granted permission: ', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.error(error);
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocationCoords({
          location: { lat: latitude, lng: longitude },
        });
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GMAPS_API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            const address = data.results[0].formatted_address;
            setCurrentAddress(address);
          })
          .catch((error) => console.error(error));
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSendingAddressChange = (text: string) => {
    setSendingAddress(text);
  };

  const handleRecipientAddressChange = (text: string) => {
    setRecipientAddress(text);
  };

  const geocodeAddress = (address: string): Promise<{ latitude: number; longitude: number }> => {
    const apiKey = GMAPS_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    return fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          const result = data.results[0];
          const { lat, lng }: GeoLocationCoords = result.geometry.location;
          return {
            latitude: lat,
            longitude: lng,
          };
        } else {
          throw new Error('Geocoding request failed');
        }
      })
      .catch((error) => {
        console.error('Error geocoding address:', error);
        throw error;
      });
  };

  const handleSubmit = () => {
    if (sendingAddress && recipientAddress) {
      // Get latitude and longitude for sendingAddress and recipientAddress
      const geocodePromises = [geocodeAddress(sendingAddress), geocodeAddress(recipientAddress)];

      Promise.all(geocodePromises)
        .then(([sendingLocation, recipientLocation]) => {
          // Extract latitude and longitude
          const sendingLatitude = sendingLocation.latitude.toString();
          const sendingLongitude = sendingLocation.longitude.toString();
          const recipientLatitude = recipientLocation.latitude.toString();
          const recipientLongitude = recipientLocation.longitude.toString();

          //   Navigate to the new screen passing the latitude and longitude as parameters
          const packageDeliveryData: PackageDeliveryData = {
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

          console.log('in Submit');
          console.log('packageDeliveryData');
          console.log(packageDeliveryData);

          // navigation.navigate('RecipientWalletAddress');
        })
        .catch((error) => {
          console.error('Error geocoding addresses:', error);
        });
    }
  };

  useEffect(() => {
    if (!isKeyboardVisible) {
      setSendingAutocomplete({ autocompleteState: false, fieldName: AutocompleteLocationField.SENDING });
      setRecipientAutocomplete({ autocompleteState: false, fieldName: AutocompleteLocationField.RECIPIENT });
    }
  }, [isKeyboardVisible]);

  function getTextStyle(touched: AutocompleteState, other: AutocompleteState) {
    if (touched.autocompleteState == false && other.autocompleteState == false) {
      return {
        height: 15,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: '13%',
      };
    } else if (touched.autocompleteState == true && touched.fieldName == AutocompleteLocationField.SENDING) {
      return {
        height: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
      };
    } else if (touched.autocompleteState == true && touched.fieldName == AutocompleteLocationField.RECIPIENT) {
      return {
        height: '100%',
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: '13%',
        ariaDisabled: true,
      };
    }
    // when touched.fieldName == AutocompleteLocationField.RECIPIENT && touched.autocompleteState == false
    // && other.fieldName == AutocompleteLocationField.SENDING && other.autocompleteState == true
    else {
      return {
        display: 'none',
      };
    }
  }

  const currentLocationGeo = {
    description: currentAddress,
    formatted_address: currentAddress,
    geometry: currentLocationCoords,
  };

  const placesAutocompleteRef: any = useRef();

  return (
    <View
      style={
        // !isKeyboardVisible ? styles.container : styles.containerKeyboardOpen}
        style
      }
    >
      {/* <Text style={{paddingBottom:10, borderRadius:5, paddingHorizontal:15, color:'white'}}>Current Address: {currentAddress}</Text> */}

      {
        // recipientAutocomplete == false &&
        <SafeAreaView style={[{ paddingTop: '7%' }, getTextStyle(sendingAutocomplete, recipientAutocomplete)]}>
          <GooglePlacesAutocomplete
            ref={placesAutocompleteRef}
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
            currentLocation={true}
            styles={textInputStyles}
            textInputProps={{
              onFocus: () => {
                setSendingAutocomplete((prevState) => ({ ...prevState, autocompleteState: true }));
                setRecipientAutocomplete((prevState) => ({ ...prevState, autocompleteState: false }));
              },
            }}
            predefinedPlaces={[currentLocationGeo]}
          />
        </SafeAreaView>
      }

      {
        // sendingAutocomplete == false &&
        <SafeAreaView style={getTextStyle(recipientAutocomplete, sendingAutocomplete)}>
          <GooglePlacesAutocomplete
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
            // currentLocation={true}
            styles={textInputStyles}
            textInputProps={{
              onFocus: () => {
                setRecipientAutocomplete((prevState) => ({ ...prevState, autocompleteState: true }));
                setSendingAutocomplete((prevState) => ({ ...prevState, autocompleteState: false }));
              },
            }}
            predefinedPlaces={[currentLocationGeo]}
          />
        </SafeAreaView>
      }
      {!isKeyboardVisible && (
        <View style={{ borderRadius: 50, alignSelf: 'center', marginBottom: 5 }}>
          <RedButton onPress={handleSubmit} styles={{ width: '100px', height: '40px' }}>
            <RedButtonText>Submit</RedButtonText>
          </RedButton>
          {/* <Button title="Submit" onPress={handleSubmit} /> */}
        </View>
      )}
    </View>
  );
};

const textInputStyles = {
  container: {
    marginBottom: 10,
  },
  textInputContainer: {
    width: '98%',
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
};

export default LocationsMenu;