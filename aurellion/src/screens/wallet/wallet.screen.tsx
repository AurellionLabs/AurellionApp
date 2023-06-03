import React, { useState, useCallback, useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image
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
} from '../../utils/UniversalProvider';
import ExplorerModal from './components/ExplorerModal';
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import { WalletScreenNavigationProp } from '../../navigation/types';
import { useMainContext } from '../main.provider';


function WalletScreen(): JSX.Element {
  const { setWallet, setWalletAddress } = useMainContext();
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentWCURI, setCurrentWCURI] = useState<string>();
  // Initialize universal provider
  const initialized = useInitialization();

  const close = () => {
    setModalVisible(false);
  };

  const getAddress = useCallback(async () => {
    try {
      if (web3Provider) {
        const signer = web3Provider.getSigner();
        setWallet(signer)
        const currentAddress = await signer.getAddress();
        setWalletAddress(currentAddress)
        setCurrentAccount(currentAddress);
      }
    } catch (err: unknown) {
      Alert.alert('Error', 'Error getting the Address');
    }
  }, []);

  const onSessionCreated = useCallback(async () => {
    getAddress();
    setModalVisible(false);
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
        setCurrentAccount(undefined);
        setCurrentWCURI(undefined);
      }
    },
    [setCurrentAccount],
  );

  const onConnect = useCallback(async () => {
    createUniversalProviderSession({
      onSuccess: onSessionCreated,
      onFailure: onSessionError,
    });
    setModalVisible(true);
  }, [onSessionCreated, onSessionError]);

  const onDisconnect = useCallback(async () => {
    try {
      await universalProvider.disconnect();
      clearSession();
      setCurrentAccount(undefined);
      setCurrentWCURI(undefined);
    } catch (err: unknown) {
      Alert.alert('Error', 'Error disconnecting');
    }
  }, []);

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
      universalProvider.on('session_event', ({ event, chainId }) => {
        console.log('session_event', event, chainId);
      });

      // Subscribe to session update
      universalProvider.on('session_update', ({ topic, params }) => {
        console.log('session_update', topic, params);
      });

      // Subscribe to session delete
      universalProvider.on('session_delete', onSessionDelete);
    }
  }, [onSessionDelete]);

  useEffect(() => {
    if (initialized) {
      subscribeToEvents();
    }
  }, [initialized, subscribeToEvents]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <Image source={require('../../common/assets/images/logo.png')} style={styles.logo} />
        {currentAccount ? (
          <View style={styles.container}>
            <Text style={[styles.text, isDarkMode && styles.whiteText]}>
              Address: {currentAccount}
            </Text>
            <TouchableOpacity
              style={[
                styles.blueButton,
                styles.disconnectButton,
                isDarkMode && styles.blueButtonDark,
              ]}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.blueButtonText}>Home Screen</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={onConnect}
            style={[styles.blueButton, isDarkMode && styles.blueButtonDark]}
            disabled={!initialized}>
            {initialized ? (
              <Text style={styles.blueButtonText}>Connect Wallet</Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
        )}
        <ExplorerModal
          modalVisible={modalVisible}
          close={close}
          currentWCURI={currentWCURI}
        />
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
    flex: 1,
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
  logo: {
    width: 250,
    height: 250
  }
});
