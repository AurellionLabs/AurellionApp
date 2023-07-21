import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, PermissionsAndroid, KeyboardAvoidingView, ScrollView, SafeAreaView, StyleSheet ,TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Region } from 'react-native-maps';
import {RedButton, RedButtonText} from '../../../common/components/StyledComponents';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '../../main.provider';
import { LocationsScreenNavigationProp } from '../../../navigation/types';
import { PackageDeliveryData } from '../../../common/types/types';
const GMAPS_API_KEY = 'AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA'; 
interface LocationMenuProps {
    region: Region,
    setRegion: React.Dispatch<React.SetStateAction<Region>>,
    isKeyboardVisible: boolean,
    style: any,
}

interface GeoLocationCoords {
    lat: number;
    lng: number;
}

interface Geometry {
  location:GeoLocationCoords;
}

const LocationsMenu = ({region, setRegion, isKeyboardVisible, style}:LocationMenuProps) => {

  const navigation = useNavigation<LocationsScreenNavigationProp>();
  const {setPackageDeliveryData} = useMainContext();
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [sendingAddress, setSendingAddress] = useState('Enter sending address');
  const [recipientAddress, setRecipientAddress] = useState('Enter recipient address');
  const [currentLocationCoords, setCurrentLocationCoords] = useState<Geometry>({location:{lat:0, lng:0}});
  navigator.geolocation = require('@react-native-community/geolocation');

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
          }
        );
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
        setCurrentLocationCoords({location:{lat:latitude, lng:longitude}});
        setRegion({latitude: latitude, longitude:longitude, latitudeDelta: 0.01, longitudeDelta: 0.01});

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
          const { lat, lng }:GeoLocationCoords = result.geometry.location;
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
      const geocodePromises = [
        geocodeAddress(sendingAddress),
        geocodeAddress(recipientAddress),
      ];
  
      Promise.all(geocodePromises)
        .then(([sendingLocation, recipientLocation]) => {
          // Extract latitude and longitude
          const sendingLatitude = sendingLocation.latitude.toString();
          const sendingLongitude = sendingLocation.longitude.toString();
          const recipientLatitude = recipientLocation.latitude.toString();
          const recipientLongitude = recipientLocation.longitude.toString();
  
        //   Navigate to the new screen passing the latitude and longitude as parameters
        const packageDeliveryData:PackageDeliveryData = {
          startLocation : {
            lat:sendingLatitude,
            lng:sendingLongitude
          },
          endLocation : {
            lat:recipientLatitude,
            lng:recipientLongitude
          },
          startName: sendingAddress,
          endName: recipientAddress
        };
        setPackageDeliveryData(packageDeliveryData);

        console.log("in Submit");
        console.log("packageDeliveryData");
        console.log(packageDeliveryData);

        navigation.navigate('DeliveryOptions');

        })
        .catch((error) => {
          console.error('Error geocoding addresses:', error);
        });
    }
  };



  useEffect(() => {
    if(!isKeyboardVisible){
      setSendingAutocomplete(false);
      setRecipientAutocomplete(false);
    }
    }, [isKeyboardVisible]);


  const [sendingAutocomplete, setSendingAutocomplete] = useState(false);
  const [recipientAutocomplete, setRecipientAutocomplete] = useState(false);

  
   function getTextStyle(touched:any, other:any) {
    if(touched) {
      return {
        height: "100%", backgroundColor: 'white', paddingHorizontal:15
      }
    } 
    else if(touched == false && other == false){
      return {
        height: 15, backgroundColor: 'black', paddingHorizontal:15, paddingBottom:"13%"
    }
    }
    else {
      return {
          height: 15, backgroundColor: 'white', paddingHorizontal:15, paddingBottom:"13%"
      }
    }
  }

  const currentLocationGeo = {
    description:currentAddress,
    formatted_address: currentAddress,
    geometry: currentLocationCoords,
  };

  const placesAutocompleteRef:any = useRef();


  return (
    <View style={
        // !isKeyboardVisible ? styles.container : styles.containerKeyboardOpen}
        style}
        >
          {/* <Text style={{paddingBottom:10, borderRadius:5, paddingHorizontal:15, color:'white'}}>Current Address: {currentAddress}</Text> */}

          {
          // recipientAutocomplete == false && 
          <SafeAreaView style={[{paddingTop: "7%"},getTextStyle(sendingAutocomplete, recipientAutocomplete)]}>
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
                    onFocus: () => {setSendingAutocomplete(true);},
                  }}
                  predefinedPlaces={[currentLocationGeo]}
                />
          </SafeAreaView> 
          }

          {
          // sendingAutocomplete == false &&
            <SafeAreaView style={getTextStyle(recipientAutocomplete, sendingAutocomplete)}
            >
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
                  onFocus: () => {setRecipientAutocomplete(true);},
                }}
                predefinedPlaces={[currentLocationGeo]}
              />
            </SafeAreaView>
          }
        {!isKeyboardVisible &&
          <View style={{ borderRadius: 50, alignSelf: 'center', marginBottom: 5,}}>
            <RedButton onPress={handleSubmit} styles={{width: '100px', height: '40px'}}>
                <RedButtonText>Submit</RedButtonText>
            </RedButton>
            {/* <Button title="Submit" onPress={handleSubmit} /> */}
          </View>}
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
