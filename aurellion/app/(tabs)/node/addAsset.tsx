import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "react-native";
import {
  Container,
  Section,
  Label,
  Input,
} from "@/components/screens/addAsset/StyledComponents";
import {
  Heading,
  ImageContainer,
  RedButton,
  RedButtonText,
} from "@/components/common/StyledComponents";
import { LightTheme, DarkTheme } from "@/constants/Colors";
import { useMainContext } from "@/providers/main.provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { addAsset, updateSupportedAssets } from "@/dapp-connectors/dapp-controller";
import { useNodeContext } from "@/providers/node.provider";

export default function AddAsset() {
  const { isDarkMode } = useMainContext();
  const { selectedNodeAddress } = useNodeContext();
  const [assetType, setAssetType] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [quantity, setQuantity] = useState<string>("");

  const [assetTypeOpen, setAssetTypeOpen] = useState(false);
  const [assetTypeItems, setAssetTypeItems] = useState([
    { label: "Goat", value: "Goat" },
    { label: "Sheep", value: "Sheep" },
    { label: "Cow", value: "Cow" },
  ]);
  const [assetClassOpen, setAssetClassOpen] = useState(false);
  const [assetClassItems, setAssetClassItems] = useState([
    { label: "Grade A", value: 1 },
    { label: "Grade B", value: 2 },
    { label: "Grade C", value: 3 },
    { label: "Grade D", value: 4 },
    { label: "Grade E", value: 5 },
  ]);

  const handleSubmit = async () => {
    let parsedQuantity = parseInt(quantity, 10);
    const assetData = {
      assetType,
      assetClass,
      parsedQuantity,
    };
    console.log(assetData)
    try {
      addAsset(assetType, assetClass, parsedQuantity, selectedNodeAddress)
    } catch (e) {
      console.error("Couldn't add asset", e);
    }
  };

  const onAssetTypeOpen = () => {
    setAssetClassOpen(false);
  };

  const onAssetClassOpen = () => {
    setAssetTypeOpen(false);
  };

  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <Heading isDarkMode={isDarkMode}>Add Asset</Heading>
        <ImageContainer>
          <Image
            source={require("@/assets/images/goat.png")}
            style={{ height: 200, width: 200 }}
          />
        </ImageContainer>
        <Section>
          <Label isDarkMode={isDarkMode}>Asset Type</Label>
          <DropDownPicker
            zIndex={2}
            open={assetTypeOpen}
            onOpen={onAssetTypeOpen}
            value={assetType}
            items={assetTypeItems}
            setOpen={setAssetTypeOpen}
            setValue={setAssetType}
            setItems={() => {}}
            style={{ marginBottom: 10 }}
            theme={isDarkMode ? "DARK" : "LIGHT"}
          />
        </Section>

        <Section>
          <Label isDarkMode={isDarkMode}>Asset Class</Label>
          <DropDownPicker
            zIndex={1}
            open={assetClassOpen}
            onOpen={onAssetClassOpen}
            value={assetClass}
            items={assetClassItems}
            setOpen={setAssetClassOpen}
            setValue={setAssetClass}
            setItems={() => {}}
            style={{ marginBottom: 10 }}
            theme={isDarkMode ? "DARK" : "LIGHT"}
          />
        </Section>

        <Section>
          <Label isDarkMode={isDarkMode}>Quantity</Label>
          <Input
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="Enter Quantity"
            isDarkMode={isDarkMode}
            placeholderTextColor={
              isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
            }
          />
        </Section>

        <RedButton
          onPress={handleSubmit}
          style={{ alignSelf: "center", marginTop: "7%" }}
        >
          <RedButtonText>Add Asset</RedButtonText>
        </RedButton>
      </Container>
    </SafeAreaView>
  );
}
