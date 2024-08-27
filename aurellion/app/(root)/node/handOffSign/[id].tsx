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

export default function HandOffSign() {
  const { isDarkMode } = useMainContext();
  const { yourOrders } = useNodeContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO: Hack - need to implement finding order object from list of orders by id.
  const orderId = parseInt(id as string, 10)
  
  const handOffOrder = () => {
    console.log("Hand off order");
  };
  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        <StyledText
          isDarkMode={isDarkMode}
          style={{ marginBottom: 80, fontSize: 18, textAlign: "center" }}
        >
          Please confirm order hand off to driver
        </StyledText>
        <ImageContainer style={{ marginBottom: 30 }}>
          <Image
            source={require("@/assets/images/goat.png")}
            style={{ height: 200, width: 200 }}
          />
        </ImageContainer>
        <TextContainer>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Buyer Name: {yourOrders[orderId]?.buyerName}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Type: {yourOrders[orderId]?.assetType}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Class: {yourOrders[orderId]?.assetClass}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Quantity: {yourOrders[orderId]?.quantity}
          </StyledText>
        </TextContainer>
        <RedButton
          onPress={handOffOrder}
          style={{ alignSelf: "center", marginTop: "7%" }}
        >
          <RedButtonText>Handoff Order</RedButtonText>
        </RedButton>
      </Container>
    </SafeAreaView>
  );
}
