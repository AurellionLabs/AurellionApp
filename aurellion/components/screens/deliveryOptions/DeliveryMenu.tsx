import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dimensions, View, Image } from "react-native";
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

import { LightTheme } from "@/constants/Colors";
import {
  RedButton,
  RedButtonText,
  StyledText,
} from "@/components/common/StyledComponents";
import { jobCreation } from "../../../dapp-connectors/dapp-controller";
import { useMainContext } from "@/providers/main.provider";
import { DeliverySpeedOption } from "@/constants/Types";
import Loader from "@/components/common/loader";
import { router } from "expo-router";
const DeliveryMenu = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const defaultHeight = (70 / 100) * SCREEN_HEIGHT;
  const [rootPosition, setRootPosition] = useState<number>(defaultHeight);
  const [boxState, setBoxState] = useState<boolean>(true);
  const [selectedBox, setSelectedBox] = useState<boolean>(true);
  const [selectedBox2, setSelectedBox2] = useState<boolean>(false);
  const [selectedBox3, setSelectedBox3] = useState<boolean>(false);
  const { setDeliveryOption, isDarkMode } = useMainContext();

  const [selectedDeliverOption, setSelectedDeliveryOption] =
    useState<DeliverySpeedOption>(DeliverySpeedOption.FAST);

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
      setSelectedDeliveryOption(DeliverySpeedOption.FAST);
    }
    if (box == 2) {
      setSelectedBox(false);
      setSelectedBox2(true);
      setSelectedBox3(false);
      setSelectedDeliveryOption(DeliverySpeedOption.MEDIUM);
    }
    if (box == 3) {
      setSelectedBox(false);
      setSelectedBox2(false);
      setSelectedBox3(true);
      setSelectedDeliveryOption(DeliverySpeedOption.SLOW);
    }
  };

  const submitSelection = () => {
    setDeliveryOption((prevState) => ({
      ...prevState,
      deliverySpeed: selectedDeliverOption,
    }));
    router.push({pathname: '/delivery/customer/confirmation'})
  };

  return (
    <>
      {isLoading || isError ? (
        <Loader
          isLoading={isLoading}
          isError={isError}
          setIsError={setIsError}
          errorText={errorMessage}
        />
      ) : (
        <AnimatedRoot height={rootPosition}>
          <GestureDetector gesture={gesture}>
            <AnimatedBox isDarkMode={isDarkMode} style={translateYStyle}>
              <SelectedBox
                isDarkMode={isDarkMode}
                boxState={boxState}
                boxSelected={selectedBox}
                onPress={() => selector(1)}
              >
                <View>
                  <Image
                    source={require("@/assets/images/rabbit.png")}
                    style={{ height: 20, width: 20 }}
                  />
                  <StyledText
                    style={{
                      color: "green",
                      fontWeight: "700",
                      textAlign: "left",
                    }}
                  >
                    Fast
                  </StyledText>
                  <StyledText isDarkMode={isDarkMode}>Same Day</StyledText>
                  <StyledText isDarkMode={isDarkMode}>Edit...</StyledText>
                </View>
                <StyledText
                  isDarkMode={isDarkMode}
                  style={{ textAlign: "right", margin: 0, padding: 0 }}
                >
                  100 AURA
                </StyledText>
              </SelectedBox>
              <SelectedBox
                isDarkMode={isDarkMode}
                boxState={boxState}
                boxSelected={selectedBox2}
                onPress={() => selector(2)}
              >
                <View>
                  <Image
                    source={require("@/assets/images/running.png")}
                    style={{ height: 20, width: 20 }}
                  />
                  <StyledText
                    style={{
                      color: LightTheme.foreground2,
                      fontWeight: "700",
                      textAlign: "left",
                    }}
                  >
                    Medium
                  </StyledText>
                  <StyledText isDarkMode={isDarkMode}>Next Day</StyledText>
                  <StyledText isDarkMode={isDarkMode}>Edit...</StyledText>
                </View>
                <StyledText
                  isDarkMode={isDarkMode}
                  style={{ textAlign: "right", margin: 0, padding: 0 }}
                >
                  100 AURA
                </StyledText>
              </SelectedBox>
              <SelectedBox
                isDarkMode={isDarkMode}
                boxState={boxState}
                boxSelected={selectedBox3}
                onPress={() => selector(3)}
              >
                <View>
                  <Image
                    source={require("@/assets/images/turtle.png")}
                    style={{ height: 20, width: 20 }}
                  />
                  <BoxHeadingText>Slow</BoxHeadingText>
                  <StyledText isDarkMode={isDarkMode}>Next 3 Days</StyledText>
                  <StyledText isDarkMode={isDarkMode}>Edit...</StyledText>
                </View>
                <StyledText
                  isDarkMode={isDarkMode}
                  style={{ textAlign: "right", margin: 0, padding: 0 }}
                >
                  100 AURA
                </StyledText>
              </SelectedBox>
              <RedButton onPress={submitSelection}>
                <RedButtonText>Begin</RedButtonText>
              </RedButton>
            </AnimatedBox>
          </GestureDetector>
        </AnimatedRoot>
      )}
    </>
  );
};

export default DeliveryMenu;
