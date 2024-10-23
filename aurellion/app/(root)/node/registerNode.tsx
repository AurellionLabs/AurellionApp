import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, Image } from "react-native";
import {
  Container,
  Input,
  Label,
  Section,
} from "@/components/screens/settings/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { useState } from "react";
import {
  Heading,
  ImageContainer,
  RedButton,
  RedButtonText,
} from "@/components/common/StyledComponents";
import { DarkTheme, LightTheme } from "@/constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import { Node, NodeStatus } from "@/constants/Types";
import { registerNode } from "@/dapp-connectors/dapp-controller";


export default function RegisterNode() {
  const { isDarkMode } = useMainContext();

  const [nodeName, setNodeName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [assets, setAssets] = useState([]);

  const [assetsOpen, setAssetsOpen] = useState(false);

  const [assetItems, setAssetItems] = useState([
    { label: "Goat", value: "Goat" },
    { label: "Sheep", value: "Sheep" },
    { label: "Watch", value: "Watch" },
  ]);

  const handleRegister = async () => {
    // Process the asset data as needed
    var data: Node;
    var supportedAssets: number[] = [];
    for (let i = 0; i < assets.length; i++) {
        //TODO: make an asset name to number finder on smart contract
        switch (assets[i]) {
            case "Goat":
              supportedAssets.push(1)
            case "Sheep":
              supportedAssets.push(2)
            case "Watch":
              supportedAssets.push(3)
        }

    }
    data = {
        location: nodeName,
        owner: walletAddress,
        capacity: [Number(capacity)],
        status: "0x01",
        supportedAssets,
        validNode: "0x01"
    };
    try {
        await registerNode(data)
    } catch (e) {
        console.error("couldnt register node", e)
    }
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            onPress={handleRegister}
            style={{ alignSelf: "center", marginTop: "7%" }}
          >
            <RedButtonText>Register Node</RedButtonText>
          </RedButton>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
