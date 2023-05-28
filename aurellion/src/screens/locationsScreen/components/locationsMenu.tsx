import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationsMenu = () => {
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

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_API_KEY`)
          .then((response) => response.json())
          .then((data) => {
            const address = data.results[0].formatted_address;
            setCurrentAddress(address);
            setSendingAddress(address);
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

  return (
    <View>
      <Text>Current Address: {currentAddress}</Text>
      {/* <Text>Specify Sending Address:</Text>
      <GooglePlacesAutocomplete
        placeholder="Enter sending address"
        onPress={(data, details = null) => {
          const address = details?.formatted_address || '';
          setSendingAddress(address);
        }}
        fetchDetails={true}
        query={{
          key: 'YOUR_GOOGLE_PLACES_API_KEY',
          language: 'en',
        }}
        currentLocation={false}
        styles={{
          container: { flex: 1 },
          textInputContainer: { width: '100%' },
          textInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
        }}
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
          key: 'YOUR_GOOGLE_PLACES_API_KEY',
          language: 'en',
        }}
        currentLocation={false}
        styles={{
          container: { flex: 1 },
          textInputContainer: { width: '100%' },
          textInput: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
        }}
      />
      <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
};

export default LocationsMenu;
