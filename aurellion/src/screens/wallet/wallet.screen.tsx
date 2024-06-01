import React, {useState, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {W3mButton} from '@web3modal/wagmi-react-native';

import {DarkTheme, LightTheme} from '../../common/constants/Colors';
import {WalletScreenNavigationProp} from '../../navigation/types';
import {
  RedButton,
  RedButtonText,
} from '../../common/components/StyledComponents';
import TypingText from '../../common/components/TypingText';
import {useMainContext} from '../main.provider';

function WalletScreen(): JSX.Element {
  const navigation = useNavigation<WalletScreenNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentWCURI, setCurrentWCURI] = useState<string>();

  const {
    setIsDarkMode,
    isDarkMode,
    setUniversalLink,
    setDeepLink,
    setWcURI,
    universalLink,
    wcURI,
    deepLink,
    walletAddress,
    setWalletAddress,
  } = useMainContext();
  const close = () => {
    setModalVisible(false);
  };
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
  const changeColourScheme = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <View style={[styles.container, {backgroundColor}]}>
        <TouchableOpacity
          style={{height: '4%', width: '8%', right: '40%'}}
          onPress={changeColourScheme}>
          <ImageBackground
            source={require('../../common/assets/images/eclipse-alt.png')}
            style={{height: '100%', width: '100%', top: '30%'}}
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
              style={{marginTop: '7%'}}
              onPress={() => navigation.navigate('Locations')}>
              <RedButtonText>Home Screen</RedButtonText>
            </RedButton>

            {/* <RedButton style={{ marginTop: '5%', marginBottom: '0%' }} onPress={() => changeStoredWallet()}>
              <RedButtonText>Change Wallet</RedButtonText>
            </RedButton> */}
          </View>
        ) : (
          // <RedButton onPress={onConnect} style={{ marginTop: '60%', bottom: '10%' }}>
          //   {initialized ? (
          //     <RedButtonText>Connect Wallet</RedButtonText>
          //   ) : (
          //     <ActivityIndicator size="small" color="white" />
          //   )}
          // </RedButton>
          <>
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
