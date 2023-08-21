import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import {
  Container,
  Button,
  ButtonText,
  BoldText,
} from "../../common/components/StyledComponents";
import { LightTheme } from "../../common/constants/Colors";
import LottieView from "lottie-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AssignDriverScreenNavigationProp,
  SignatureScreenRouteProp,
} from "../../navigation/types";
import { useMainContext } from "../main.provider";
import {
  assignDriverToJobId,
  checkIfDriverAssignedToJobId,
} from "../../dapp-connectors/dapp-controller";
import { navigateDeepLink } from "../../utils/ExplorerUtils";
import Wrapper from "../../common/wrapper";

const AssignDriverScreen = () => {
  const navigation = useNavigation<AssignDriverScreenNavigationProp>();
  const { universalLink, deepLink, wcURI } = useMainContext();
  const route = useRoute<SignatureScreenRouteProp>();
  const { jobID } = route.params;
  const isDarkMode = useColorScheme() === "dark";
  const [isAssigned, setIsAssigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const acceptJob = async () => {
    setIsLoading(true);
    try {
      const isDriverAssigned = await checkIfDriverAssignedToJobId(jobID);
      if (!isDriverAssigned) {
        navigateDeepLink(universalLink, deepLink, wcURI);
        await assignDriverToJobId(jobID);
        console.log("Reached")
        setIsAssigned(true);
      } else {
        console.error("Driver already assigned to job");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error assigning driver to job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container styles={{ justifyContent: "center" }}>
      {isAssigned ? (
        <LottieView
          source={require("../../common/assets/animations/success.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() =>
            navigation.navigate("Signature", {
              heading: "Sign to confirm pacakge received from customer",
              jobID: jobID,
            })
          }
        />
      ) : (
        <Wrapper
          isLoading={isLoading}
          isError={isError}
          setIsError={setIsError}
          errorText={errorMessage}
        >
          <BoldText>Do you want to accept this job?</BoldText>
          <View style={{ marginTop: 50 }}>
            <Button
              isDarkMode={isDarkMode}
              backgroundColor={LightTheme.accent}
              onPress={acceptJob}
            >
              <ButtonText>Accept Job</ButtonText>
            </Button>
          </View>
        </Wrapper>
      )}
    </Container>
  );
};

export default AssignDriverScreen;
