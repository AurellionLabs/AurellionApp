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
  Image
} from 'react-native';
import {DarkTheme, LightTheme} from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentWCURI, setCurrentWCURI] = useState<string>();
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/exampleMap.png')} style={styles.logo}/>
    <View style={styles.box}>
    <View style={styles.box1}>
      <Text style={styles.bold}>Fast</Text>
      <Text>Same Day</Text>
      <Text>100 AURA</Text>
      <Text>Edit...</Text>
    </View>
    <TouchableOpacity
              style={[
                styles.blueButton,
                styles.disconnectButton,
                isDarkMode && styles.blueButtonDark,
              ]}
              onPress={() => {console.log("ran")}}>
    <Text style={styles.blueButtonText}>Begin</Text>
    </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  shadow:{
    elevation: 3,
    shadowColor: LightTheme.foreground2,
    outlineProvider: 'bounds',
    shadowOpacity: 0.8,
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 20,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 8,
    borderTopWidth: 1,
    width: "100%",
    height: "100%",
    margin: 10,
    //borderColor:  LightTheme.foreground2,
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 2,
    borderRadius: 20,
    width: "80%",
    height: "20%",
    borderColor:  LightTheme.foreground2,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontWeight: '700',
  },
  bold: {
    color: "#000",
    fontWeight: "700",
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
    height:250
  }
});


export default HomeScreen;