import "@thirdweb-dev/react-native-adapter";
import 'react-native-polyfill-globals/auto';
import 'expo-router/entry'
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { inAppWallet } from "thirdweb/wallets";
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
        <ThirdwebProvider>
        </ThirdwebProvider>
    );
} const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
