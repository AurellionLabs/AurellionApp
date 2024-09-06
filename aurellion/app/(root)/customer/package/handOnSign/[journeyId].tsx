import {
    Button,
    ButtonText,
    ImageContainer,
    StyledText,
  } from "@/components/common/StyledComponents";
  import {
    Container,
    TextContainer,
  } from "@/components/screens/signature/styledComponents";
  import { LightTheme } from "@/constants/Colors";
  import { Journey } from "@/constants/Types";
import { useCustomerContext } from "@/providers/customer.provider";
  import { useDriverContext } from "@/providers/driver.provider";
  import { useMainContext } from "@/providers/main.provider";
  import { useLocalSearchParams } from "expo-router";
  import { useEffect, useState } from "react";
  import { View, Image } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  const handOnSign = () => {
    const { isDarkMode } = useMainContext();
    const { journeyId } = useLocalSearchParams<{ journeyId: string }>();
    const { sendingPackages } = useCustomerContext();
  
    const [journey, setJourney] = useState<Journey | undefined>(undefined);
  
    useEffect(() => {
      if (journeyId) {
        // TODO: journey.jobId needs to be renamed to journey.id for consistency
        const foundOrder = sendingPackages.find(
          (journey) => journey.jobId === journeyId
        );
        setJourney(foundOrder);
      }
    }, [journeyId, sendingPackages]);
  
    const packageHandOver = () => {
      console.log("Package handed over to driver");
    };
    return (
      <SafeAreaView>
        <Container isDarkMode={isDarkMode}>
          <StyledText
            isDarkMode={isDarkMode}
            style={{
              marginBottom: 80,
              fontSize: 18,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Please confirm package handed over to driver
          </StyledText>
          <ImageContainer style={{ marginBottom: 30 }}>
            <Image
              source={require("@/assets/images/package.png")}
              style={{ height: 200, width: 200 }}
            />
          </ImageContainer>
          <TextContainer>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ fontWeight: 700, marginBottom: 10 }}
            >
              Start: {journey?.parcelData.startName}
            </StyledText>
            <StyledText
              isDarkMode={isDarkMode}
              style={{ fontWeight: 700, marginBottom: 10 }}
            >
              End: {journey?.parcelData.endName}
            </StyledText>
          </TextContainer>
          <View style={{ marginTop: 50 }}>
            <Button
              isDarkMode={isDarkMode}
              backgroundColor={LightTheme.accent}
              onPress={packageHandOver}
            >
              <ButtonText>Package Handed Over</ButtonText>
            </Button>
          </View>
        </Container>
      </SafeAreaView>
    );
  };
  
  export default handOnSign;
  