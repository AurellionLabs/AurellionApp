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
    Pressable
} from 'react-native';

import { Colors } from '@/constants/Colors';
import {
    RedButton,
    RedButtonText,
} from '@/components/StyledComponents';
// import TypingText from '../../common/components/TypingText';
import { useMainContext } from '@/providers/main.provider';
import { ConnectButton, useConnect } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { inAppWallet } from 'thirdweb/wallets';

function WalletScreen(): JSX.Element {
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
        ? Colors.dark.background2
        : Colors.light.background2;
    const changeColourScheme = () => {
        if (isDarkMode) setIsDarkMode(false);
        else setIsDarkMode(true);
    };
    const client = createThirdwebClient({
        clientId: "0456f9a445788895eeb9d9cc69d15c95",
    });
    const { connect } = useConnect();
    const wallet = inAppWallet();
    const handleLogin = async () => {
        await connect(async () => {
            await wallet.connect({
                client,
                strategy: "google",
            });
            return wallet;
        });
    };
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={[styles.container, { backgroundColor }]}>
                <TouchableOpacity
                    style={{ height: '4%', width: '8%', right: '40%' }}
                    onPress={changeColourScheme}>
                    <ImageBackground
                        source={require('@/assets/images/eclipse-alt.png')}
                        style={{ height: '100%', width: '100%', top: '30%' }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={{
                        width: 250,
                        height: 250,
                        marginBottom: '5%',
                        marginTop: '20%',
                    }}
                />
                {/* <TypingText isDarkMode={isDarkMode} text="Aurellion" speed={30} /> */}
                {walletAddress ? (
                    <View style={styles.container}>
                        <Text style={[styles.text, isDarkMode && styles.whiteText]}>
                            Address: {walletAddress}
                        </Text>
                        <RedButton
                            style={{ marginTop: '7%' }}
                            onPress={() => console.log("pressed")}>
                            <RedButtonText>Home Screen</RedButtonText>
                        </RedButton>

                        {/* <RedButton style={{ marginTop: '5%', marginBottom: '0%' }} onPress={() => changeStoredWallet()}>
              <RedButtonText>Change Wallet</RedButtonText>
            </RedButton> */}
                    </View>
                ) : (
                    <RedButton onPress={handleLogin} style={{ marginTop: '60%', bottom: '10%' }}>
                        <RedButtonText>Connect Wallet</RedButtonText>
                    </RedButton>


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
        backgroundColor: Colors.light.accent,
        borderRadius: 20,
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.light.overlayThin,
    },
    redButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.accent,
        borderRadius: 20,
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.light.overlayThin,
    },
    blueButtonDark: {
        backgroundColor: Colors.dark.accent,
        borderColor: Colors.dark.overlayThin,
    },
    blueButtonText: {
        color: 'white',
        fontWeight: '700',
    },
    disconnectButton: {
        marginTop: 20,
    },
});
