import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { W3mButton, useWeb3Modal } from '@web3modal/wagmi-react-native';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import { WalletScreenNavigationProp } from '../../navigation/types';
import {
  RedButton,
  RedButtonText,
} from '../../common/components/StyledComponents';
import TypingText from '../../common/components/TypingText';
import { useMainContext } from '../main.provider';
import { REACT_APP_AUSYS_CONTRACT_ADDRESS, REACT_APP_AURA_CONTRACT_ADDRESS } from '@env';
import auraABI from '../../dapp-connectors/aura-abi.json';

function WalletScreen(): JSX.Element {
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const {
    setIsDarkMode,
    isDarkMode,
    setWalletAddress,
    walletAddress,
  } = useMainContext();

  const [modalVisible, setModalVisible] = useState(false);

  const { open } = useWeb3Modal();

  const { config } = usePrepareContractWrite({
    address: REACT_APP_AUSYS_CONTRACT_ADDRESS as `0x${string}`,
    abi: auraABI,
    functionName: 'approve',
    args: [walletAddress, 100000000000]
  });

  const { isLoading, isError, write, error } = useContractWrite(config);

  const account = useAccount({
    onConnect({ address }) {
      console.log('Connected address:', address);
      setWalletAddress(address);
    },
    onDisconnect() {
      console.log('Wallet Disconnected');
      setWalletAddress(undefined);
    },
  });

  useEffect(() => {
    if (isError) {
      console.error('Error during contract write:', error);
      Alert.alert('Error', 'There was an error with the contract transaction.');
    }
  }, [isError, error]);

  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
  const changeColourScheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity
          style={{ height: '4%', width: '8%', right: '40%' }}
          onPress={changeColourScheme}
        >
          <ImageBackground
            source={require('../../common/assets/images/eclipse-alt.png')}
            style={{ height: '100%', width: '100%', top: '30%' }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Image
          source={require('../../common/assets/images/logo.png')}
          style={{
            width: 250,
            height: 250,
            marginBottom: '5%',
            marginTop: '20%',
          }}
        />
        <TypingText isDarkMode={isDarkMode} text="Aurellion" speed={30} />
        {walletAddress ? (
          <View style={styles.container}>
            <Text style={[styles.text, isDarkMode && styles.whiteText]}>
              Address: {walletAddress}
            </Text>
            <RedButton
              style={{ marginTop: '7%' }}
              onPress={() => navigation.navigate('Locations')}
            >
              <RedButtonText>Home Screen</RedButtonText>
            </RedButton>
            <W3mButton />
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <RedButton onPress={() => { 
                console.log("on press")
                console.log(write)
                write?.()
              }}>
                <RedButtonText>Approve</RedButtonText>
              </RedButton>
            )}
          </View>
        ) : (
          <>
            <RedButton>
              <RedButtonText onPress={() => open()}>Open modal</RedButtonText>
            </RedButton>
            <W3mButton />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default WalletScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    fontWeight: '700',
  },
  whiteText: {
    color: 'white',
  },
  blueButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LightTheme.accent,
    borderRadius: 20,
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: LightTheme.overlayThin,
  },
  redButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LightTheme.accent,
    borderRadius: 20,
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: LightTheme.overlayThin,
  },
  blueButtonDark: {
    backgroundColor: DarkTheme.accent,
    borderColor: DarkTheme.overlayThin,
  },
  blueButtonText: {
    color: 'white',
    fontWeight: '700',
  },
  disconnectButton: {
    marginTop: 20,
  },
});