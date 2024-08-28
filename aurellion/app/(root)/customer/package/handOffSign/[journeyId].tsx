import { Button, ButtonText, ImageContainer, StyledText } from "@/components/common/styledComponents";
import { Container, TextContainer } from "@/components/screens/signature/styledComponents";
import { LightTheme } from "@/constants/Colors";
import { Journey } from "@/constants/Types";
import { useCustomerContext } from "@/providers/customer.provider";
import { useMainContext } from "@/providers/main.provider";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const handOffSign = () => {
  const { isDarkMode } = useMainContext();
  const { journeyId } = useLocalSearchParams<{ journeyId: string }>();
  const { receivingPackages } = useCustomerContext();

  const [journey, setJourney] = useState<Journey | undefined>(undefined);

  useEffect(() => {
    if (journeyId) {
      // TODO: journey.jobId needs to be renamed to journey.id for consistency
      const foundOrder = receivingPackages.find(
        (journey) => journey.jobId === journeyId
      );
      setJourney(foundOrder);
    }
  }, [journeyId, receivingPackages]);

  const receivedPackage = () => {
    console.log("Received package")
  }
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
          Please confirm you received your package
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
            onPress={receivedPackage}
          >
            <ButtonText>Received Package</ButtonText>
          </Button>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default handOffSign;
