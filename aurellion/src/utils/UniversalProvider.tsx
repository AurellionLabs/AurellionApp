import '@walletconnect/react-native-compat';
import UniversalProvider from '@walletconnect/universal-provider';

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import {ENV_PROJECT_ID, ENV_RELAY_URL} from '@env';
import {SessionTypes} from '@walletconnect/types';
import {ethers} from 'ethers';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export let universalProvider: UniversalProvider;
export let web3Provider: ethers.providers.Web3Provider | undefined;
export let universalProviderSession: SessionTypes.Struct | undefined;
export async function retrieveOldSession() {
    try {
        const storedSessionData = await AsyncStorage.getItem('universalProviderSession');
        if (storedSessionData) {
                universalProviderSession = JSON.parse(storedSessionData);
            } else {
                console.log("could not parse session data")
            }
    } catch (e) {
        console.error("previous session doesnt exist")}
}
export async function createUniversalProvider() {
    // console.log('[CONFIG] ENV_PROJECT_ID:', ENV_PROJECT_ID);
    // console.log('[CONFIG] ENV_RELAY_URL:', ENV_RELAY_URL);

    try {
        universalProvider = await UniversalProvider.init({
        logger: 'info',
        relayUrl: ENV_RELAY_URL,
        projectId: "bebf58b7af307d2e05fa0ff4f31ff769",
        metadata: {
        name: 'Aurellion',
        description: 'A Anonymised Decentralised Shipping Service',
        url: 'https://walletconnect.com/',
        icons: [("../../common/assets/images/logo.png")],
        },
    });
} catch {
    Alert.alert('Error', 'Error connecting to WalletConnect');
}
}

export function clearSession() {
    universalProviderSession = undefined;
    web3Provider = undefined;
}

export async function createUniversalProviderSession(callbacks?: {
        onSuccess?: () => void;
        onFailure?: (error: any) => void;
        }) {
    try {
        universalProviderSession = await universalProvider.connect({
namespaces: {
eip155: {
methods: [
'eth_sendTransaction',
'eth_signTransaction',
'eth_sign',
'personal_sign',
'eth_signTypedData',
],
chains: ['eip155:5'],
events: ['chainChanged', 'accountsChanged'],
rpcMap: {},
},
},
});
    await AsyncStorage.setItem('universalProviderSession', JSON.stringify(universalProviderSession));
    web3Provider = new ethers.providers.Web3Provider(universalProvider);
    callbacks?.onSuccess?.();
    } catch (error) {
        callbacks?.onFailure?.(error);
    }
}
export async function web3ProviderInit(provider: UniversalProvider) { 
    try {
            web3Provider = new ethers.providers.Web3Provider(provider);
    } catch (error) {
        console.error("Error Intialising Web3Provider",error)}

}
