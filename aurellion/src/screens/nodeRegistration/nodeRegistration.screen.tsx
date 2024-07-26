import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Heading, Section, Label, Input } from '../nodeRegistration/components/StyledComponents';
import { RedButton, RedButtonText } from '../../common/components/StyledComponents';
import { useMainContext } from '../main.provider';
import { LightTheme, DarkTheme } from '../../common/constants/Colors';

const NodeRegistrationScreen: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [supportedAsset, setSupportedAsset] = useState('Goat');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('Active');

  const [assetOpen, setAssetOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  // const { isDarkMode } = useMainContext();
  const isDarkMode = false;

  const handleSubmit = () => {
    const nodeData = {
      walletAddress,
      locationAddress,
      supportedAsset,
      capacity,
      status,
    };

    console.log(nodeData);
    // Process the node data as needed
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Heading isDarkMode={isDarkMode}> Node Registration</Heading>
      <Section>
        <Label isDarkMode={isDarkMode}>Owner Wallet Address:</Label>
        {/* <Input
          value={walletAddress}
          onChangeText={setWalletAddress}
          placeholder="Enter Owner Wallet Address"
          isDarkMode={isDarkMode}></Input> */}

        <Input
          value={walletAddress}
          onChangeText={setWalletAddress}
          placeholder="Enter Owner Wallet Address"
          isDarkMode={isDarkMode}
          placeholderTextColor={isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1}
        />
      </Section>

      <Section>
        <Label isDarkMode={isDarkMode}>Location Address:</Label>
        <Input
          value={locationAddress}
          onChangeText={setLocationAddress}
          placeholder="Enter Node Location Address"
          isDarkMode={isDarkMode}
          placeholderTextColor={isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1}
        />
      </Section>

      <Section zIndex={1}>
        <Label isDarkMode={isDarkMode}>Supported Assets:</Label>
        <DropDownPicker
          open={assetOpen}
          value={supportedAsset}
          items={[
            { label: 'Goat', value: 'Goat' },
            { label: 'Sheep', value: 'Sheep' },
            { label: 'Cow', value: 'Cow' },
          ]}
          setOpen={setAssetOpen}
          setValue={setSupportedAsset}
          setItems={() => {}}
          // dropDownStyle={{marginBottom: 20}}
          style={{ marginBottom: 10 }}
          theme={isDarkMode ? 'DARK' : 'LIGHT'}
        />
      </Section>

      <Section>
        <Label isDarkMode={isDarkMode}>Capacity:</Label>
        <Input
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="numeric"
          placeholder="Enter Capacity in Kg"
          isDarkMode={isDarkMode}
          placeholderTextColor={isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1}
        />
      </Section>

      <Section zIndex={1}>
        <Label isDarkMode={isDarkMode}>Status:</Label>
        <DropDownPicker
          open={statusOpen}
          value={status}
          items={[
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' },
          ]}
          setOpen={setStatusOpen}
          setValue={setStatus}
          setItems={() => {}}
          theme={isDarkMode ? 'DARK' : 'LIGHT'}
        />
      </Section>
      <RedButton style={{ alignSelf: 'center', marginTop: '7%' }}>
        <RedButtonText>Register Node</RedButtonText>
      </RedButton>
    </Container>
  );
};

export default NodeRegistrationScreen;
