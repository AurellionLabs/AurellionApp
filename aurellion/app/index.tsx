import "@walletconnect/react-native-compat";

import {
  createWeb3Modal,
  defaultConfig,
  Web3Modal,
  W3mButton,
} from "@web3modal/ethers-react-native";

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "35338a6f79245a5b3f4db27235965e29";

// 2. Create config
const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
  },
};

const config = defaultConfig({ metadata });

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

const chains = [mainnet, polygon];

// 4. Create modal
createWeb3Modal({
  projectId,
  chains,
  config,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { router } from 'expo-router';
import { DarkTheme, LightTheme } from "@/constants/Colors";
import { RedButton, RedButtonText } from "@/components/common/StyledComponents";
import TypingText from "@/components/common/TypingText";
import { useMainContext } from "@/providers/main.provider";
import { RoleType } from "@/constants/Types";

function WalletScreen(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWCURI, setCurrentWCURI] = useState<string>();

  const {
    setIsDarkMode,
    isDarkMode,
    walletAddress,
    setRole
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

  const onHomePress = () => {
    setRole(RoleType.Customer)
    router.push('customer/sendPackage')
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity
          style={{ height: "4%", width: "8%", right: "40%" }}
          onPress={changeColourScheme}
        >
          <ImageBackground
            source={require("@/assets/images/eclipse-alt.png")}
            style={{ height: "100%", width: "100%", top: "30%" }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 250,
            height: 250,
            marginBottom: "5%",
            marginTop: "20%",
          }}
        />
        <TypingText isDarkMode={isDarkMode} text="Aurellion" speed={30} />
        {walletAddress ? (
          <View style={styles.container}>
            <Text style={[styles.text, isDarkMode && styles.whiteText]}>
              Address: {walletAddress}
            </Text>
            <RedButton
              style={{ marginTop: "7%" }}
              onPress={() => console.log("pressed")}
            >
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
            <RedButton style={{ marginTop: "7%" }} onPress={onHomePress}>
              <RedButtonText>Home Screen</RedButtonText>
            </RedButton>
          </>
        )}
        <Web3Modal />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  text: {
    fontWeight: "700",
  },
  whiteText: {
    color: "white",
  },
  blueButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightTheme.accent,
    borderRadius: 20,
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: LightTheme.overlayThin,
  },
  redButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    color: "white",
    fontWeight: "700",
  },
  disconnectButton: {
    marginTop: 20,
  },
});
