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
  JobsScreenNavigationProp,
  SignatureScreenRouteProp,
} from "../../navigation/types";
import { useMainContext } from "../main.provider";
import {
  customerPackageSign,
  driverPackageSign,
} from "../../dapp-connectors/dapp-controller";
import { navigateDeepLink } from "../../utils/ExplorerUtils";

const SignatureScreen = () => {
  const navigation = useNavigation<JobsScreenNavigationProp>();
  const { universalLink, deepLink, wcURI, userType, setRefetchDataFromAPI } =
    useMainContext();
  const route = useRoute<SignatureScreenRouteProp>();
  const { heading, jobID } = route.params;
  const isDarkMode = useColorScheme() === "dark";
  const [isSigned, setIsSigned] = useState(false);

  const onPress = async () => {
    navigateDeepLink(universalLink, deepLink, wcURI);
    if (userType === "customer") {
      await customerPackageSign(jobID);
    } else if (userType === "driver") {
      await driverPackageSign(jobID);
    }
    setIsSigned(true);
    setRefetchDataFromAPI(true);
  };

  return (
    <Container styles={{ justifyContent: "center" }}>
      {isSigned ? (
        <LottieView
          source={require("../../common/assets/animations/success.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.navigate("Jobs")}
        />
      ) : (
        <>
          <BoldText>{heading}</BoldText>
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
