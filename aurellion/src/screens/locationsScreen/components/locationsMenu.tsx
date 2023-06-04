import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, PermissionsAndroid, ScrollView, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Region } from 'react-native-maps';
import {RedButton, RedButtonText} from '../../../common/components/StyledComponents';

const GMAPS_API_KEY = 'AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA'; 
interface LocationMenuProps {
    setRegion: React.Dispatch<React.SetStateAction<Region>>,
    isKeyboardVisible: boolean,
    style: any,
}
const LocationsMenu = ({setRegion, isKeyboardVisible, style}:LocationMenuProps) => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [sendingAddress, setSendingAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

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
        console.log('latitude: ', latitude);
        console.log('longitude: ', longitude);
        setRegion({latitude: latitude, longitude:longitude, latitudeDelta: 0.01, longitudeDelta: 0.01});

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GMAPS_API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            const address = data.results[0].formatted_address;
            setCurrentAddress(address);
            setSendingAddress(address);
            console.log('address: ', address);
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

  const handleSubmit = () => {
    // Perform submission logic here
    console.log('Sending Address:', sendingAddress);
    console.log('Recipient Address:', recipientAddress);
  };

  useEffect(() => {
    console.log('\n\nisKeyboardVisible: ', isKeyboardVisible);
    }, []);

  return (
    <View style={
        // !isKeyboardVisible ? styles.container : styles.containerKeyboardOpen}
        style}
        >
        <ScrollView contentContainerStyle={{backgroundColor: 'white',}}>
          <Text>Current Address: {currentAddress}</Text>
          <Text>Specify Sending Address:</Text>
          <GooglePlacesAutocomplete
            placeholder="Enter sending address"
            onPress={(data, details = null) => {
              const address = details?.formatted_address || '';
              setSendingAddress(address);
            }}
            fetchDetails={true}
            query={{
              key: GMAPS_API_KEY,
              language: 'en',
            }}
            currentLocation={false}
            styles={textInputStyles}
          />
          <Text>Specify Recipient Address:</Text>
          <GooglePlacesAutocomplete
            placeholder="Enter recipient address"
            onPress={(data, details = null) => {
              const address = details?.formatted_address || '';
              setRecipientAddress(address);
            }}
            fetchDetails={true}
            query={{
              key: GMAPS_API_KEY,
              language: 'en',
            }}
            currentLocation={false}
            styles={textInputStyles}
          />
          <View style={{ borderRadius: 50, alignSelf: 'center', marginBottom: 5,}}>
            <RedButton onPress={handleSubmit} styles={{width: '100px', height: '40px'}}>
                <RedButtonText>Submit</RedButtonText>
            </RedButton>
            {/* <Button title="Submit" onPress={handleSubmit} /> */}
          </View>
        </ScrollView>
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
