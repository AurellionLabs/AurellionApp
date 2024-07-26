import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const NodeRegistrationScreen: React.FC = () => {
  const [ownerWalletAddress, setOwnerWalletAddress] = useState('Hello');
  const [locationAddress, setLocationAddress] = useState('');
  const [supportedAssets, setSupportedAssets] = useState('');
  const [status, setStatus] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleRegisterNode = () => {
    // Logic to register the node with the captured data
    console.log('Node registered!');
  };

  return (
    <View>
      <Text>Node Registration</Text>
      <Text>Owner Wallet Address:</Text>
      <TextInput value={ownerWalletAddress} onChangeText={setOwnerWalletAddress} />
      <Text>Location Address:</Text>
      <TextInput value={locationAddress} onChangeText={setLocationAddress} />
      <Text>Supported Assets:</Text>
      <TextInput value={supportedAssets} onChangeText={setSupportedAssets} />
      <Text>Status:</Text>
      <TextInput value={status} onChangeText={setStatus} />
      <Text>Capacity:</Text>
      <TextInput value={capacity} onChangeText={setCapacity} />
      <Button title="Register Node" onPress={handleRegisterNode} />
    </View>
  );
};

export default NodeRegistrationScreen;
