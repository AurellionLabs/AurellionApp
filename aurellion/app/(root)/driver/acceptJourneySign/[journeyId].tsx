import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
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
import { DarkTheme, LightTheme } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import { useMainContext } from "@/providers/main.provider";
// import { assignDriverToJobId } from '../../dapp-connectors/dapp-controller';
import Loader from "@/components/common/loader";
import { router, useLocalSearchParams } from "expo-router";
import { useDriverContext } from "@/providers/driver.provider";
import { Journey } from "@/constants/Types";
import { SafeAreaView } from "react-native-safe-area-context";

const AssignDriverScreen = () => {
  const { setRefetchDataFromAPI, isDarkMode } = useMainContext();
  const { availableJourneys } = useDriverContext();
  const { journeyId } = useLocalSearchParams<{ journeyId: string }>();

  const [isAssigned, setIsAssigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [journey, setJourney] = useState<Journey | undefined>(undefined);

  useEffect(() => {
    if (journeyId) {
      // TODO: journey.jobId needs to be renamed to journey.id for consistency
      const foundOrder = availableJourneys.find(
        (journey) => journey.jobId === journeyId
      );
      setJourney(foundOrder);
    }
  }, [journeyId, availableJourneys]);

  const acceptJob = async () => {
    setIsLoading(true);
    try {
      // navigateDeepLink(universalLink, deepLink, wcURI);
      // await assignDriverToJobId(journey?.jobId);
      setIsAssigned(true);
      setRefetchDataFromAPI(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error assigning driver to job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Container isDarkMode={isDarkMode}>
        {isAssigned ? (
          <LottieView
            source={require("@/assets/animations/success.json")}
            autoPlay
            loop={false}
            onAnimationFinish={() => router.push({ pathname: "/jobs" })}
          />
        ) : isLoading ? (
          <Loader
            isLoading={isLoading}
            isError={isError}
            setIsError={setIsError}
            errorText={errorMessage}
          />
        ) : (
          <>
            <StyledText
              isDarkMode={isDarkMode}
              style={{
                marginBottom: 80,
                fontSize: 18,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              Please confirm you accept this journey
            </StyledText>
            <ImageContainer style={{ marginBottom: 30 }}>
              <Image
                source={require("@/assets/images/delivery-truck.png")}
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
                onPress={acceptJob}
              >
                <ButtonText>Accept Journey</ButtonText>
              </Button>
            </View>
          </>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default AssignDriverScreen;
