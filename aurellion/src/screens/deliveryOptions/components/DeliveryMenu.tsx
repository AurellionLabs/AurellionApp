import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dimensions, Text, useColorScheme, View, Image } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SelectedBox,
  BoxHeadingText,
  AnimatedBox,
  AnimatedRoot,
} from "./StyledComponents";

import { LightTheme } from "../../../common/constants/Colors";
import {
  RedButton,
  RedButtonText,
} from "../../../common/components/StyledComponents";
import { jobCreation } from "../../../dapp-connectors/dapp-controller";
import { useMainContext } from "../../main.provider";
import { navigateDeepLink } from "../../../utils/ExplorerUtils";
import { useNavigation } from "@react-navigation/native";
import { JobsScreenNavigationProp } from "../../../navigation/types";
import Wrapper from "../../../common/wrapper";
const DeliveryMenu = () => {
  const navigation = useNavigation<JobsScreenNavigationProp>();
  const { universalLink, deepLink, wcURI } = useMainContext();
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const defaultHeight = (70 / 100) * SCREEN_HEIGHT;
  const [rootPosition, setRootPosition] = useState<number>(defaultHeight);
  const [boxState, setBoxState] = useState<boolean>(true);
  const [selectedBox, setSelectedBox] = useState<boolean>(true);
  const [selectedBox2, setSelectedBox2] = useState<boolean>(false);
  const [selectedBox3, setSelectedBox3] = useState<boolean>(false);
  const { packageDeliveryData } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const translateY = useSharedValue(0);
  const setJSHeight = (selectedheight: number) => {
    setRootPosition(selectedheight);
  };
  const gesture = Gesture.Pan().onUpdate((event) => {
    if (event.translationY >= 0 && rootPosition <= defaultHeight) {
      const newHeight = (25 / 100) * SCREEN_HEIGHT;
      runOnJS(setJSHeight)(newHeight);
      runOnJS(setBoxState)(false);
    }
    if (event.translationY <= 0 && rootPosition == (25 / 100) * SCREEN_HEIGHT) {
      const newHeight = (70 / 100) * SCREEN_HEIGHT;
      runOnJS(setJSHeight)(newHeight);
      runOnJS(setBoxState)(true);
    }
  });
  const translateYStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const selector = (box: number) => {
    if (box == 1) {
      setSelectedBox(true);
      setSelectedBox2(false);
      setSelectedBox3(false);
    }
    if (box == 2) {
      setSelectedBox(false);
      setSelectedBox2(true);
      setSelectedBox3(false);
    }
    if (box == 3) {
      setSelectedBox(false);
      setSelectedBox2(false);
      setSelectedBox3(true);
    }
  };

  const createJob = async () => {
    setIsLoading(true);
    try{
      navigateDeepLink(universalLink, deepLink, wcURI);
      if (packageDeliveryData) {
        await jobCreation(packageDeliveryData);
      }
      navigation.navigate("Jobs");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Error Creating Job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper
      isLoading={isLoading}
      isError={isError}
      setIsError={setIsError}
      errorText={errorMessage}
    >
      <AnimatedRoot height={rootPosition}>
        <GestureDetector gesture={gesture}>
          <AnimatedBox style={translateYStyle}>
            <SelectedBox
              boxState={boxState}
              boxSelected={selectedBox}
              onPress={() => selector(1)}
            >
              <View>
                <Image
                  source={require("../../../common/assets/images/hare.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text
                  style={{
                    color: "green",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  Fast
                </Text>
                <Text>Same Day</Text>
                <Text>Edit...</Text>
              </View>
              <Text style={{ textAlign: "right", margin: 0, padding: 0 }}>
                100 AURA
              </Text>
            </SelectedBox>
            <SelectedBox
              boxState={boxState}
              boxSelected={selectedBox2}
              onPress={() => selector(2)}
            >
              <View>
                <Image
                  source={require("../../../common/assets/images/running.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text
                  style={{
                    color: LightTheme.foreground2,
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  Medium
                </Text>
                <Text>Next Day</Text>
                <Text>Edit...</Text>
              </View>
              <Text style={{ textAlign: "right", margin: 0, padding: 0 }}>
                100 AURA
              </Text>
            </SelectedBox>
            <SelectedBox
              boxState={boxState}
              boxSelected={selectedBox3}
              onPress={() => selector(3)}
            >
              <View>
                <Image
                  source={require("../../../common/assets/images/turtle.png")}
                  style={{ height: 20, width: 20 }}
                />
                <BoxHeadingText>Slow</BoxHeadingText>
                <Text>Next 3 Days</Text>
                <Text>Edit...</Text>
              </View>
              <Text style={{ textAlign: "right", margin: 0, padding: 0 }}>
                100 AURA
              </Text>
            </SelectedBox>
            <RedButton onPress={createJob}>
              <RedButtonText>Begin</RedButtonText>
            </RedButton>
          </AnimatedBox>
        </GestureDetector>
      </AnimatedRoot>
    </Wrapper>
  );
};

export default DeliveryMenu;
