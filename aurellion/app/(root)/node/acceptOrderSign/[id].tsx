import {
  ImageContainer,
  RedButton,
  RedButtonText,
  StyledText,
} from "@/components/common/styledComponents";
import {
  Container,
  TextContainer,
} from "@/components/screens/signature/styledComponents";
import { useMainContext } from "@/providers/main.provider";
import { useNodeContext } from "@/providers/node.provider";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddAsset() {
  const { isDarkMode } = useMainContext();
  const { availableOrders } = useNodeContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO: Hack - need to implement finding order from list of orders by id.
  const orderId = parseInt(id as string, 10)
  
  const acceptOrder = () => {
    console.log("Accepted order");
  };
  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ marginBottom: 80, fontSize: 18, textAlign: "center" }}
        >
          Please confirm you have liquidity to fulfill order
        </StyledText>
        <ImageContainer style={{ marginBottom: 30 }}>
          <Image
            source={require("@/assets/images/goat.png")}
            style={{ height: 200, width: 200 }}
          />
        </ImageContainer>
        <TextContainer>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Buyer Name: {availableOrders[orderId]?.buyerName}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Type: {availableOrders[orderId]?.assetType}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Class: {availableOrders[orderId]?.assetClass}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Quantity: {availableOrders[orderId]?.quantity}
          </StyledText>
        </TextContainer>
        <RedButton
          onPress={acceptOrder}
          style={{ alignSelf: "center", marginTop: "7%" }}
        >
          <RedButtonText>Accept Order</RedButtonText>
        </RedButton>
      </Container>
    </SafeAreaView>
  );
}
