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
import LocationAutocomplete from "@/components/common/LocationAutocomplete";

export default function RegisterNode() {
  const { isDarkMode } = useMainContext();

  const [nodeName, setNodeName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [assets, setAssets] = useState(null);

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