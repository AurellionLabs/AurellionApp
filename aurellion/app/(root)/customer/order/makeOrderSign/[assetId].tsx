import {
  ImageContainer,
  RedButton,
  RedButtonText,
  StyledText,
} from "@/components/common/StyledComponents";
import {
  Input,
  Label,
  Section,
} from "@/components/screens/addAsset/StyledComponents";
import { MakeOrderContainer } from "@/components/screens/orders/styledComponents";
import { TextContainer } from "@/components/screens/signature/styledComponents";
import { DarkTheme, LightTheme } from "@/constants/Colors";
import { Asset } from "@/constants/Types";
import { useCustomerContext } from "@/providers/customer.provider";
import { useMainContext } from "@/providers/main.provider";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const makeOrderSign = () => {
  const { isDarkMode } = useMainContext();
  const { assetId } = useLocalSearchParams<{ assetId: string }>();
  const { availableAssets } = useCustomerContext();

  const [asset, setAsset] = useState<Asset | undefined>(undefined);

  const [quantity, setQuantity] = useState<string>("");
  const [deliveryLocation, setDeliveryLocation] = useState<string>("");

  useEffect(() => {
    if (assetId) {
      // TODO: Rather than orderId it should be assetId
      const foundAsset = availableAssets.find((asset) => asset.id === assetId);
      setAsset(foundAsset);
    }
  }, [assetId, availableAssets]);

  const makeOrder = () => {
    console.log(quantity);
    console.log(deliveryLocation);
    console.log("Make Order");
  };
  return (
    <SafeAreaView>
      <MakeOrderContainer isDarkMode={isDarkMode}>
        <StyledText
          isDarkMode={isDarkMode}
          style={{
            marginBottom: 40,
            fontSize: 18,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Confirm Order Details
        </StyledText>
        <ImageContainer style={{ marginBottom: 30 }}>
          <Image
            source={require("@/assets/images/goat.png")}
            style={{ height: 200, width: 200 }}
          />
        </ImageContainer>
        <TextContainer>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Class: {asset?.assetClass}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Type: {asset?.assetType}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Total Quantity: {asset?.totalQuantity}
          </StyledText>
        </TextContainer>
        <Section>
          <Label isDarkMode={isDarkMode}>Order Quantity</Label>
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
        <Section>
          <Label isDarkMode={isDarkMode}>Delivery Location</Label>
          <Input
            value={deliveryLocation}
            onChangeText={setDeliveryLocation}
            keyboardType="default"
            placeholder="Enter Location"
            isDarkMode={isDarkMode}
            placeholderTextColor={
              isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
            }
          />
        </Section>
        <RedButton
          onPress={makeOrder}
          style={{ alignSelf: "center", marginTop: "7%" }}
        >
          <RedButtonText>Make Order</RedButtonText>
        </RedButton>
      </MakeOrderContainer>
    </SafeAreaView>
  );
};

export default makeOrderSign;
