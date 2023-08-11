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
import { assignDriverToJobId } from "../../dapp-connectors/dapp-controller";
import { navigateDeepLink } from "../../utils/ExplorerUtils";

const AssignDriverScreen = () => {
  const navigation = useNavigation<AssignDriverScreenNavigationProp>();
  const { universalLink, deepLink, wcURI } = useMainContext();
  const route = useRoute<SignatureScreenRouteProp>();
  const { jobID } = route.params;
  const isDarkMode = useColorScheme() === "dark";
  const [isAssigned, setIsAssigned] = useState(false);

  const acceptJob = async () => {
    navigateDeepLink(universalLink, deepLink, wcURI);
    await assignDriverToJobId(jobID);
    setIsAssigned(true);
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
        <>
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
        </>
      )}
    </Container>
  );
};

export default AssignDriverScreen;
