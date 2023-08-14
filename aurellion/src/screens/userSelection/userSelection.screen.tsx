import React from "react";
import SwitchSelector from "react-native-switch-selector";
import { useColorScheme, View } from "react-native";
import {
  Container,
  Button,
  ButtonText,
  BoldText,
} from "../../common/components/StyledComponents";
import { LightTheme } from "../../common/constants/Colors";
import { useMainContext} from "../main.provider";
import { useNavigation } from "@react-navigation/native";
import { UserSelectionScreenNavigationProp } from "../../navigation/types";
import Wrapper from "../../common/wrapper";
import { UserType } from "../../common/types/types";

const UserSelectionScreen = () => {
  const navigation = useNavigation<UserSelectionScreenNavigationProp>();
  const { setUserType } = useMainContext();
  const isDarkMode = useColorScheme() === "dark";

  const options = [
    { label: "Customer", value: "customer", accessibilityLabel: "Customer" },
    { label: "Driver", value: "driver", accessibilityLabel: "Driver" },
  ];

  const onNextPress = () => {
    navigation.navigate("Wallet");
  };

  return (
    <Wrapper>
      <Container styles={{ justifyContent: "center" }}>
        <BoldText>Are you signing up as a Customer or Driver?</BoldText>
        <View style={{ marginTop: 50 }}>
          <SwitchSelector
            initial={0}
            onPress={(value: UserType) => setUserType(value)}
            textColor={LightTheme.foreground1}
            selectedColor={LightTheme.accent}
            buttonColor={LightTheme.background2}
            borderColor={LightTheme.accent}
            hasPadding
            options={options}
            accessibilityLabel="user-type-switch-selector"
          />
          <View style={{ marginTop: 50 }}>
            <Button
              isDarkMode={isDarkMode}
              backgroundColor={LightTheme.accent}
              onPress={onNextPress}
            >
              <ButtonText>Next</ButtonText>
            </Button>
          </View>
        </View>
      </Container>
    </Wrapper>
  );
};

export default UserSelectionScreen;
