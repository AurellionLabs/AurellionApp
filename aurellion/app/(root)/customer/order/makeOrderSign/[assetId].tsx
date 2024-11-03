import {
  ImageContainer,
  RedButton,
  RedButtonText,
  StyledText,
  ScrollContent,
} from "@/components/common/StyledComponents";
import {
  Input,
  Label,
  Section,
} from "@/components/screens/addAsset/StyledComponents";
import { MakeOrderContainer } from "@/components/screens/orders/styledComponents";
import { TextContainer } from "@/components/screens/signature/styledComponents";
import { Order, Status } from "@/constants/ChainTypes";
import { DarkTheme, LightTheme } from "@/constants/Colors";
import { Asset, ParcelData } from "@/constants/Types";
import {
  customerMakeOrder,
  GOAT_CONTRACT_ADDRESS,
} from "@/dapp-connectors/dapp-controller";
import { useCustomerContext } from "@/providers/customer.provider";
import { useMainContext } from "@/providers/main.provider";
import { ethers } from "ethers";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const makeOrderSign = () => {
  const { isDarkMode, walletAddress } = useMainContext();
  const { assetId } = useLocalSearchParams<{ assetId: string }>();
  const { availableAssets } = useCustomerContext();

  const [asset, setAsset] = useState<Asset | undefined>(undefined);

  const [quantity, setQuantity] = useState<string>("");
  const [deliveryLocation, setDeliveryLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (assetId) {
      // TODO: Rather than orderId it should be assetId
      const foundAsset = availableAssets.find((asset) => asset.id === assetId);
      setAsset(foundAsset);
    }
  }, [assetId, availableAssets]);

  const makeOrder = async () => {
    const locationData: ParcelData = {
      // start location details are nullish as we don't know starting node
      startLocation: {
        lat: "",
        lng: "",
      },
      startName: "",
      endLocation: {
        lat: "51.45",
        lng: "52.35",
      },
      endName: "86 Argyle Street",
    };

    if (assetId && walletAddress && GOAT_CONTRACT_ADDRESS) {
      const orderDetails: Order = {
        id: ethers.hexlify(ethers.randomBytes(32)),
        token: GOAT_CONTRACT_ADDRESS,
        tokenId: parseInt(assetId),
        tokenQuantity: 0,
        requestedTokenQuantity: [parseInt(quantity)],
        price: parseFloat(price),
        amount: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef", // CLARIFY: not sure what this is supposed to refer to. Same as price?
        txFee: 100, // CLARIFY: is this supposed to be dynamic?
        customer: walletAddress,
        journeyIds: [],
        nodes: [],
        locationData: locationData, // CLARIFY:  we dont have a startLocation/startName
        currentStatus: Status.Pending,
        contracatualAgreement: "",
      };
      try {
        await customerMakeOrder(orderDetails);
      } catch (e) {
        console.error("couldnt make order", e);
      }
    } else {
      console.error(
        "Required data missing for customer make order contract call"
      );
    }
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
        <ScrollContent>
          <ImageContainer style={{ marginBottom: 30 }}>
            <Image source={asset?.image} style={{ height: 200, width: 200 }} />
          </ImageContainer>
          <TextContainer>
            <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
              Asset Class: {asset?.assetClass}
            </StyledText>
            <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
              Asset Type: {asset?.assetType}
            </StyledText>
            <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
              Quantity Available: {asset?.totalQuantity}
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
          <Section>
            <Label isDarkMode={isDarkMode}>Price</Label>
            <Input
              value={price}
              onChangeText={setPrice}
              keyboardType="number-pad"
              placeholder="Enter Price"
              isDarkMode={isDarkMode}
              placeholderTextColor={
                isDarkMode ? DarkTheme.foreground2 : LightTheme.foreground1
              }
            />
          </Section>
          <RedButton
            onPress={makeOrder}
            style={{ alignSelf: "center", marginTop: "7%", marginBottom: 10 }}
          >
            <RedButtonText>Make Order</RedButtonText>
          </RedButton>
        </ScrollContent>
      </MakeOrderContainer>
    </SafeAreaView>
  );
};

export default makeOrderSign;
