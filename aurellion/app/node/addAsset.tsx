import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Container,
  Heading,
  Section,
  Label,
  Input,
} from "@/components/screens/addAsset/StyledComponents";
import { RedButton, RedButtonText } from "@/components/common/StyledComponents";
import { LightTheme, DarkTheme } from "@/constants/Colors";

export default function AddAsset() {
  const [assetType, setAssetType] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [quantity, setQuantity] = useState<string>("");

  const [assetTypeOpen, setAssetTypeOpen] = useState(false);
  const [assetClassOpen, setAssetClassOpen] = useState(false);
  const isDarkMode = false;

  const handleSubmit = () => {
    let parsedQuantity = parseInt(quantity, 10);
    const assetData = {
      assetType,
      assetClass,
      parsedQuantity,
    };

    console.log(assetData);
    // Process the asset data as needed
  };

  const onAssetTypeOpen = () => {
    setAssetClassOpen(false);
  };

  const onAssetClassOpen = () => {
    setAssetTypeOpen(false);
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Heading isDarkMode={isDarkMode}> Add Asset</Heading>

      <Section>
        <Label isDarkMode={isDarkMode}>Asset Type</Label>
        <DropDownPicker
          zIndex={2}
          open={assetTypeOpen}
          onOpen={onAssetTypeOpen}
          value={assetType}
          items={[
            { label: "Goat", value: "Goat" },
            { label: "Sheep", value: "Sheep" },
            { label: "Cow", value: "Cow" },
          ]}
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
          items={[
            { label: "Grade A", value: "Grade A" },
            { label: "Grade B", value: "Grade B" },
            { label: "Grade C", value: "Grade C" },
          ]}
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
  );
}
