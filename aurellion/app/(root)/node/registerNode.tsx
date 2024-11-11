import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, Image, View } from "react-native";
import {
  Container,
  Input,
  Label,
  Section,
} from "@/components/screens/settings/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { useState, useRef, useEffect } from "react";
import {
  Heading,
  ImageContainer,
  RedButton,
  RedButtonText,
} from "@/components/common/StyledComponents";
import { DarkTheme, LightTheme } from "@/constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import { Location } from "@/constants/Types";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GMAPS_API_KEY, textInputStyles, GeoLocationCoords, Geometry } from '@/components/screens/createDelivery/locationsMenu';
// import * as Location from 'expo-location';
// import Ionicons from '@expo/vector-icons/Ionicons';
import LocationAutocomplete from "@/components/common/LocationAutocomplete";

export default function RegisterNode() {
  const { isDarkMode } = useMainContext();

  const [nodeName, setNodeName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [assets, setAssets] = useState(null);

  //  const [currentAddress, setCurrentAddress] = useState<string>("");
  // const [currentLocationCoords, setCurrentLocationCoords] = useState<Geometry>({
  //     location: { lat: 0, lng: 0 },
  // });
  // const currentLocationGeo = {
  //     description: currentAddress,
  //     formatted_address: currentAddress,
  //     geometry: currentLocationCoords, 
  // };
  // const nodeLocationAutocompleteRef: any = useRef(null);

  const [nodeAddress, setNodeAddress] = useState("Enter Node address");
  const [nodeLocation, setNodeLocation] = useState<Location>({
    lat: "",
    lng: "",
  })

  const [assetsOpen, setAssetsOpen] = useState(false);

  const [assetItems, setAssetItems] = useState([
    { label: "Goat", value: "Goat" },
    { label: "Sheep", value: "Sheep" },
    { label: "Watch", value: "Watch" },
  ]);

  const registerNode = () => {
    // Process the asset data as needed
    const data = {
      nodeName,
      walletAddress,
      capacity,
      assets,
    };
    console.log(data);
    router.replace("/node/addAsset");
  };


  const renderItem = ({ item }: { item: React.ReactNode }) => (
    <View>
      {item}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[
          <Container isDarkMode={isDarkMode}>
            <Heading isDarkMode={isDarkMode}>Register Node</Heading>
            <ImageContainer style={{ marginTop: 10 }}>
              <Image
                source={require("@/assets/images/user.png")}
                style={{ height: 100, width: 100 }}
              />
            </ImageContainer>
            <Section>
              <Label isDarkMode={isDarkMode}>Node Name</Label>
              <Input
                value={nodeName}
                onChangeText={setNodeName}
                placeholder="Enter Node Name"
                isDarkMode={isDarkMode}
                placeholderTextColor={
                  isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
                }
              />
            </Section>
            <Section>
              <Label isDarkMode={isDarkMode}>Wallet Address</Label>
              <Input
                value={walletAddress}
                onChangeText={setWalletAddress}
                placeholder="Enter Wallet Address"
                isDarkMode={isDarkMode}
                placeholderTextColor={
                  isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
                }
              />
            </Section>
            <Section>
              <View>
                <Label isDarkMode={isDarkMode}>Location</Label>
                <LocationAutocomplete 
                    address={nodeAddress}
                    setAddress={setNodeAddress}
                    location={nodeLocation}
                    setLocation={setNodeLocation}
                    placeHolder="Enter Node address"
                    isDarkMode={isDarkMode}
                    />
                {/* <GooglePlacesAutocomplete
                  listViewDisplayed="auto"
                  ref={nodeLocationAutocompleteRef}
                  placeholder={nodeAddress}
                  onPress={(data, details = null) => {
                    let address = details?.formatted_address || '';
                    setNodeAddress(address);
                    console.log(address);
                  }}
                  fetchDetails={true}
                  query={{
                    key: GMAPS_API_KEY,
                    language: 'en',
                  }}
                  styles={textInputStyles(isDarkMode)}
                  textInputProps={{
                    onFocus: () => {
                      if(nodeAddress == currentLocationGeo.formatted_address) {
                        setNodeAddress('Enter Node address');
                        nodeLocationAutocompleteRef.current?.setAddressText('');
                        nodeLocationAutocompleteRef.placeholder = 'Enter Node address';
                      }
                    },
                    clearButtonMode: 'never',
                    placeholderTextColor: isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1,
                  }}
                  renderRightButton={() => (
                    <Ionicons name="close" size={20} color={
                      isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1
                    } onPress={() => {
                      setNodeAddress('Enter Node address');
                      nodeLocationAutocompleteRef.current?.setAddressText('');
                      nodeLocationAutocompleteRef.placeholder = 'Enter Node address';
                  }} 
                      style={{
                        display: nodeAddress !== 'Enter Node address' ? 'flex' : 'none',
                        position: 'absolute',
                        right: 0,
                        top: 10,
                        zIndex: 1,
                      }}/>)}
                    predefinedPlaces={[currentLocationGeo, { description: 'Current Location', formatted_address: currentLocationGeo.formatted_address, geometry: currentLocationCoords }]}
                  /> */}
              </View>
            </Section>
            <Section>
              <Label isDarkMode={isDarkMode}>Supported Assets</Label>
              <DropDownPicker
                open={assetsOpen}
                value={assets}
                items={assetItems}
                setOpen={setAssetsOpen}
                setValue={setAssets}
                setItems={setAssetItems}
                theme={isDarkMode ? "DARK" : "LIGHT"}
                multiple={true}
                min={1}
                mode="BADGE"
                placeholder="Select Assets"
                listMode="SCROLLVIEW"
                searchable={true}
                zIndex={2}
              />
            </Section>
            <Section>
              <Label isDarkMode={isDarkMode}>Capacity</Label>
              <Input
                value={capacity}
                onChangeText={setCapacity}
                placeholder="Enter Node Capacity"
                isDarkMode={isDarkMode}
                placeholderTextColor={
                  isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
                }
              />
            </Section>
            <RedButton
              onPress={registerNode}
              style={{ alignSelf: "center", marginTop: "7%" }}
            >
              <RedButtonText>Register Node</RedButtonText>
            </RedButton>
          </Container>
        ]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
  );
}