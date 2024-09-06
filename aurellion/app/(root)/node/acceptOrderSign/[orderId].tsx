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

export default function AcceptOrderSign() {
  const { isDarkMode } = useMainContext();
  const { availableOrders } = useNodeContext();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | undefined>(undefined);


  useEffect(() => {
    if (orderId) {
      const foundOrder = availableOrders.find(order => order.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId, availableOrders]);

  
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
          onPress={acceptOrder}
          style={{ alignSelf: "center", marginTop: "7%" }}
        >
          <RedButtonText>Accept Order</RedButtonText>
        </RedButton>
      </Container>
    </SafeAreaView>
  );
}
