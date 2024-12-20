import {
  ImageContainer,
  RedButton,
  RedButtonText,
  StyledText,
} from "@/components/common/StyledComponents";
import {
  Container,
  TextContainer,
} from "@/components/screens/signature/styledComponents";
import { Order } from "@/constants/Types";
import { useMainContext } from "@/providers/main.provider";
import { useNodeContext } from "@/providers/node.provider";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HandOffSign() {
  const { isDarkMode } = useMainContext();
  const { yourOrders } = useNodeContext();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    if (orderId) {
      const foundOrder = yourOrders.find(order => order.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId, yourOrders]);

  
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
            Buyer Name: {order?.buyerName}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Type: {order?.assetType}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Asset Class: {order?.assetClass}
          </StyledText>
          <StyledText isDarkMode={isDarkMode} style={{ marginBottom: 10 }}>
            Quantity: {order?.quantity}
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
