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
import { useCustomerContext } from "@/providers/customer.provider";
  import { useMainContext } from "@/providers/main.provider";
  import { useLocalSearchParams } from "expo-router";
  import { useEffect, useState } from "react";
  import { Image } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  export default function ReceivedOrderSign() {
    const { isDarkMode } = useMainContext();
    const { yourOrders } = useCustomerContext();
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
  
    const [order, setOrder] = useState<Order | undefined>(undefined);
  
  
    useEffect(() => {
      if (orderId) {
        const foundOrder = yourOrders.find(order => order.id === orderId);
        setOrder(foundOrder);
      }
    }, [orderId, yourOrders]);
  
    
    const receivedOrder = () => {
      console.log("Received order");
    };
    return (
      <SafeAreaView>
        <Container isDarkMode={isDarkMode}>
          <StyledText
            isDarkMode={isDarkMode}
            style={{ marginBottom: 80, fontSize: 18, textAlign: "center" }}
          >
            Please confirm your order is received
          </StyledText>
          <ImageContainer style={{ marginBottom: 30 }}>
            <Image
              source={require("@/assets/images/goat.png")}
              style={{ height: 200, width: 200 }}
            />
          </ImageContainer>
          <TextContainer>
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
            onPress={receivedOrder}
            style={{ alignSelf: "center", marginTop: "7%" }}
          >
            <RedButtonText>Received Order</RedButtonText>
          </RedButton>
        </Container>
      </SafeAreaView>
    );
  }
  