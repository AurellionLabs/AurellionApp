import React, { useState } from "react";
import { View } from "react-native";
import {
  Container,
  Button,
  ButtonText,
  StyledText,
} from "@/components/common/styledComponents";
import { LightTheme, DarkTheme } from "@/constants/Colors";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { useMainContext } from "@/providers/main.provider";
import {
  customerPackageSign,
  driverPackageSign,
  packageHandOff,
  packageHandOn,
} from "@/dapp-connectors/dapp-controller";
import Loader from "@/components/common/loader";
import { listenForSignature } from "../../dapp-connectors/dapp-listener";
import { Journey, JourneyStatus } from "@/constants/Types";
import { useDeliveryContext } from "@/providers/delivery.provider";

const SignatureScreen = () => {
  const { userType, setRefetchDataFromAPI, isDarkMode } = useMainContext();
  const { selectedJourney, signatureScreenHeading } = useDeliveryContext();
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allSigned, setAllSigned] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const backgroundColor = isDarkMode
    ? DarkTheme.background2
    : LightTheme.background2;

  // can use the data from the jouney object for addresses
  const onPress = async () => {
    if (selectedJourney) {
      setIsLoading(true);
      console.log("calling packageSign");
      await packageSign(selectedJourney);
      console.log("packageSign complete");
      await allSignedCheck(selectedJourney);
      await resolvePackageHandling(selectedJourney);
    } else {
      console.error("Selected Journey object is undefined");
      setIsError(true);
      setErrorMessage("Selected Journey object is undefined");
    }
  };

  const resolvePackageHandling = async (journey: Journey) => {
    try {
      //   navigateDeepLink(universalLink, deepLink, wcURI);
      if (journey.currentStatus === JourneyStatus.PENDING) {
        const handOnSuccessful = await packageHandOn(
          journey.customer,
          journey.driver,
          journey.jobId
        );
      } else if (journey.currentStatus === JourneyStatus.IN_PROGRESS) {
        const handOffSuccessful = await packageHandOff(
          journey.customer,
          journey.driver,
          journey.jobId
        );
      }
      console.log("Successfully resolved package handling");
    } catch (error) {
      console.log("Error in resolve package handling", error);
      setIsError(true);
      setErrorMessage("Error resolving package handling");
    }
  };

  async function packageSign(journey: Journey) {
    try {
      //   navigateDeepLink(universalLink, deepLink, wcURI);
      if (userType === "customer") {
        await customerPackageSign(journey.jobId);
      } else if (userType === "driver") {
        await driverPackageSign(journey.jobId);
      }
      console.log("setIsSigned");
      setIsLoading(false);
      setIsSigned(true);
      setRefetchDataFromAPI(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error Signing off Package");
    } finally {
    }
  }
  async function allSignedCheck(journey: Journey) {
    try {
      console.log("calling listenForSignature");
      setAllSigned(await listenForSignature(journey.jobId));
      setIsSigned(false);
    } catch (error) {
      //to do error handling modal for user
      setIsError(true);
      setErrorMessage("Error listening for signatures");
    }
  }
  return (
    <Container styles={{ justifyContent: "center" }}>
      {allSigned ? (
        <LottieView
          source={require("@/assets/animations/success.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => router.push({ pathname: "/jobs" })}
        />
      ) : isSigned ? (
        <Container
          styles={{
            justifyContent: "center",
            height: "100%",
            width: "100%",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ height: "35%", width: "70%" }}>
            <LottieView
              style={{}}
              source={require("@/assets/animations/signing.json")}
              autoPlay
              loop={true}
            />
          </View>
          <StyledText style={{ marginBottom: "30%" }} isDarkMode={isDarkMode}>
            waiting for the other party to sign...
          </StyledText>
        </Container>
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
            style={{ fontWeight: 700, fontSize: 17 }}
          >
            {signatureScreenHeading}
          </StyledText>
          <View style={{ marginTop: "20%" }}>
            <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700 }}>
              {selectedJourney?.currentStatus === JourneyStatus.PENDING
                ? `Customer's Address:`
                : `Receiver's Address`}
            </StyledText>
          </View>
          <StyledText isDarkMode={isDarkMode}>
            {selectedJourney?.currentStatus === JourneyStatus.PENDING
              ? selectedJourney.parcelData.startName
              : selectedJourney?.parcelData.endName}
          </StyledText>
          <View style={{ marginTop: 50 }}>
            <Button
              isDarkMode={isDarkMode}
              backgroundColor={LightTheme.accent}
              onPress={onPress}
            >
              <ButtonText>Sign</ButtonText>
            </Button>
          </View>
        </>
      )}
    </Container>
  );
};

export default SignatureScreen;
