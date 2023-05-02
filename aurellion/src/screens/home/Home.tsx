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
  Image
} from 'react-native';
import { DarkTheme, LightTheme } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { textAlign } from '@mui/system';
import { height } from '@mui/system';
import { Hidden } from '@mui/material';
import MapView, { Marker, Region } from 'react-native-maps';


const HomeScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentWCURI, setCurrentWCURI] = useState<string>();
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  //const handleMapLayout = useCallback(() => {
  //  setRegion({
  //    latitude: 37.78825,
  //    longitude: -122.4324,
  //    latitudeDelta: 0.0922,
  //    longitudeDelta: 0.0421,
  //  });
  //}, []);
return (
  <View style={styles.container}>
    <MapView
      style={{ flex: 1,  width: '100%', height: '100%' }}
      region={region}
      //onLayout={handleMapLayout}
    >
    </MapView>
    <View style={styles.box}>
      <View style={styles.selectedBox}>
        <View>
          <Image source={require('../../assets/images/hare.png')} style={{ height: 20, width: 20, }} />
          <Text style={{ color: "green", fontWeight: "700", textAlign: "left" }}>Fast</Text>
          <Text>Same Day</Text>
          <Text>Edit...</Text>
        </View>
        <Text style={{ textAlign: "right", margin: 0, padding: 0, }}>100 AURA</Text>

      </View>

      <View style={styles.unSelectedBox}>
        <TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Image source={require('../../assets/images/running.png')} style={{ height: 20, width: 20, }} />
              <Text style={{ color: LightTheme.foreground2, fontWeight: "700", textAlign: "left" }}>Medium</Text>
              <Text>Next Day</Text>
              <Text>Edit...</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Text style={{ textAlign: "right", margin: 0, padding: 0, }}>100 AURA</Text>
      </View>
      <View style={styles.unSelectedBox}>
        <View>
          <Image source={require('../../assets/images/turtle.png')} style={{ height: 20, width: 20, }} />
          <Text style={styles.boxHeadingText}>Slow</Text>
          <Text>Next 3 Days</Text>
          <Text>Edit...</Text>
        </View>
        <Text style={{ textAlign: "right", margin: 0, padding: 0, }}>100 AURA</Text>

      </View>

      <TouchableOpacity
        style={[
          styles.blueButton,
          styles.disconnectButton,
          isDarkMode && styles.blueButtonDark,
        ]}
        onPress={() => { console.log("ran") }}>
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
  shadow: {
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
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 8,
    width: "100%",
    height: "60%",
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  selectedBox: {
    padding: 8,
    borderWidth: 2,
    flexDirection: "row",
    borderRadius: 20,
    width: "80%",
    height: "25%",
    borderColor: LightTheme.foreground2,
    justifyContent: "space-between",

  },
  unSelectedBox: {
    padding: 8,
    borderTopColor: LightTheme.accent,
    flexDirection: "row",
    borderTopWidth: 2,
    margin: 10,
    width: "80%",
    height: "25%",
    justifyContent: "space-between",

  },
  container: {
    flex: 1,
    alignItems: 'center',
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
  boxHeadingText: {
    color: LightTheme.accent,
    fontWeight: "700",
    textAlign: "left"

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


export default HomeScreen;