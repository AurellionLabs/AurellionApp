import React, { useState, useCallback, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import '@walletconnect/react-native-compat';
import useInitialization from '../../common/hooks/useInitialization';
import {
  universalProviderSession,
  universalProvider,
  web3Provider,
  clearSession,
  createUniversalProviderSession,
  web3ProviderInit,
  retrieveOldSession,
} from '../../utils/UniversalProvider';
import ExplorerModal from './components/ExplorerModal';
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import { WalletScreenNavigationProp } from '../../navigation/types';
import { RedButton, RedButtonText } from '../../common/components/StyledComponents';
import TypingText from '../../common/components/TypingText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMainContext } from '../main.provider';
function WalletScreen(): JSX.Element {
  const navigation = useNavigation<WalletScreenNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentWCURI, setCurrentWCURI] = useState<string>();
  // Initialize universal provider
  const initialized = useInitialization();

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
  const backgroundColor = isDarkMode ? DarkTheme.background2 : LightTheme.background2;
  const getAddress = useCallback(async () => {
    try {
      if (web3Provider) {
        const signer = web3Provider.getSigner();
        const currentAddress = await signer.getAddress();
        setWalletAddress(currentAddress);
      }
    } catch (err: unknown) {
      console.error('Error', `Error getting the Address${err}`);
      createUniversalProviderSession({
        onSuccess: onSessionCreated,
        onFailure: onSessionError,
      });
      setModalVisible(true);
    }
  }, []);

  const onSessionCreated = useCallback(async () => {
    getAddress();
    setModalVisible(false);
    console.log(await getAddress());
  }, [getAddress]);

  const onSessionError = useCallback(async () => {
    setModalVisible(false);
    // TODO: Improve this, check why is alerting a lot, and check MaxListeners warning
    // Alert.alert('Error', 'Error creating session');
  }, []);

  const onSessionDelete = useCallback(
    async ({ topic }: { topic: string }) => {
      if (topic === universalProviderSession?.topic) {
        clearSession();
        setWalletAddress(undefined);
        setCurrentWCURI(undefined);
      }
    },
    [setWalletAddress]
  );

  const onConnect = useCallback(async () => {
    await retrieveOldSession();
    let universalLinkFromStorage = null;
    let wcURIFromStorage = null;
    let deepLinkFromStorage = null;
    try {
      universalLinkFromStorage = String(await AsyncStorage.getItem('universalLink'));
      deepLinkFromStorage = String(await AsyncStorage.getItem('deepLink'));
      wcURIFromStorage = String(await AsyncStorage.getItem('currentWcURI'));
      setUniversalLink(universalLinkFromStorage);
      setDeepLink(deepLinkFromStorage);
      setWcURI(wcURIFromStorage);
    } catch (e) {
      console.error('Error while setting wallet links', e);
    }
    if (
      universalProviderSession !== undefined &&
      universalProviderSession !== null &&
      universalLinkFromStorage != null &&
      universalProvider
    ) {
      web3ProviderInit(universalProvider);
      getAddress();
    } else {
      createUniversalProviderSession({
        onSuccess: onSessionCreated,
        onFailure: onSessionError,
      });
      setModalVisible(true);
    }
  }, [onSessionCreated, onSessionError]);

  const onDisconnect = useCallback(async () => {
    try {
      await universalProvider.disconnect();
      clearSession();
      setWalletAddress(undefined);
      setCurrentWCURI(undefined);
    } catch (err: unknown) {
      Alert.alert('Error', 'Error disconnecting');
    }
  }, []);
  const changeStoredWallet = useCallback(async () => {
    createUniversalProviderSession({
      onSuccess: onSessionCreated,
      onFailure: onSessionError,
    });
    setModalVisible(true);
  }, [onSessionCreated, onSessionError]);

  const subscribeToEvents = useCallback(async () => {
    if (universalProvider) {
      universalProvider.on('display_uri', (uri: string) => {
        setCurrentWCURI(uri);
      });

      // Subscribe to session ping
      universalProvider.on('session_ping', ({ id, topic }) => {
        console.log('session_ping', id, topic);
      });

      // Subscribe to session event
      universalProvider.on('session_event', async ({ event, chainId }) => {
        console.log('session_event', event, chainId);
      });

      // Subscribe to session update
      universalProvider.on('session_update', async ({ topic, params }) => {
        console.log('session_update', topic, params);
      });

      // Subscribe to session delete
      universalProvider.on('session_delete', onSessionDelete);
    }
  }, [onSessionDelete]);
  useEffect(() => {
    console.log('Universal Link Updated:', universalLink);
  }, [universalLink]);

  useEffect(() => {
    console.log('Deep Link Updated:', deepLink);
  }, [deepLink]);
  useEffect(() => {
    console.log('WCURI Updated:', wcURI);
  }, [wcURI]);
  useEffect(() => {
    if (initialized) {
      subscribeToEvents();
    }
  }, [initialized, subscribeToEvents]);
  const changeColourScheme = () => {
    if (isDarkMode) setIsDarkMode(false);
    else setIsDarkMode(true);
  };
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity style={{ height: '4%', width: '8%', right: '40%' }} onPress={changeColourScheme}>
          <ImageBackground
            source={require('../../common/assets/images/eclipse-alt.png')}
            style={{ height: '100%', width: '100%', top: '30%' }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Image
          source={require('../../common/assets/images/logo.png')}
          style={{ width: 250, height: 250, marginBottom: '5%', marginTop: '20%' }}
        />
        <TypingText isDarkMode={isDarkMode} text="Aurellion" speed={30} />
        {walletAddress ? (
          <View style={styles.container}>
            <Text style={[styles.text, isDarkMode && styles.whiteText]}>Address: {walletAddress}</Text>
            <RedButton style={{ marginTop: '7%' }} onPress={() => navigation.navigate('Jobs')}>
              <RedButtonText>Home Screen</RedButtonText>
            </RedButton>

            <RedButton style={{ marginTop: '5%', marginBottom: '0%' }} onPress={() => changeStoredWallet()}>
              <RedButtonText>Change Wallet</RedButtonText>
            </RedButton>
          </View>
        ) : (
          <RedButton onPress={onConnect} style={{ marginTop: '60%', bottom: '10%' }}>
            {initialized ? (
              <RedButtonText>Connect Wallet</RedButtonText>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </RedButton>
        )}
        <ExplorerModal modalVisible={modalVisible} close={close} currentWCURI={currentWCURI} />
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
