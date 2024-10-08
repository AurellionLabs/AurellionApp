import styled from "styled-components/native";
import { DarkTheme, LightTheme } from "@/constants/Colors";

import { StyleProp, TextProps, ViewStyle } from "react-native";
import { ScrollViewProps } from "react-native";

interface ThemedProps {
  isDarkMode: boolean;
}

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Shadow = styled.View`
  elevation: 3;
  shadow-color: ${LightTheme.foreground2};
  outline-provider: bounds;
  shadow-opacity: 0.8;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  shadow-radius: 20;
`;

interface RedButtonProps {
  styles: ViewStyle;
}

interface props {
  isDarkMode: boolean;
}
export const RedButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${LightTheme.accent};
  border-radius: 20px;
  width: 150px;
  height: 50px;
  border-width: 1px;
  border-color: ${LightTheme.overlayThin};
  ${({ isDarkMode }: { isDarkMode: boolean }) =>
    isDarkMode &&
    `
    background-color: ${DarkTheme.accent};
    border-color: ${DarkTheme.overlayThin};
  `}
  ${({ styles }: RedButtonProps) => styles};
`;
export const RedButtonText = styled.Text`
  color: white;
`;
export const TitleText = styled.Text<props>`
  color: ${(props: props) =>
    props.isDarkMode ? DarkTheme.title : LightTheme.title};
  font-size: 40px;
`;
export const Box = styled.View`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  height: 60%;
  border-top-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${(props: props) =>
    props.isDarkMode ? DarkTheme.background2 : LightTheme.background2};
`;
export const StyledText = styled.Text<props>`
  color: ${(props: props) => (props.isDarkMode ? "white" : "black")};
`;
export const ButtonBox = styled.View`
  padding: 8px;
  border-top-color: rgba(0, 0, 0, 0.2);
  flex-direction: row;
  border-top-width: 1px;
  margin: 2%;
  width: 100%;
  height: 25%;
  justify-content: space-between;
`;

interface ButtonProps {
  isDarkMode: boolean;
  backgroundColor: string;
}

export const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border-radius: 20px;
  width: 150px;
  height: 50px;
  border-width: 1px;
  border-color: ${LightTheme.overlayThin};
  ${(props: ButtonProps) =>
    props.isDarkMode &&
    `
    background-color: ${DarkTheme.accent};
    border-color: ${DarkTheme.overlayThin};
  `}
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: 700;
`;

export const BoldText = styled.Text`
  color: #000;
  font-family: Inter-Bold;
`;

interface ContainerProps {
  styles?: ViewStyle;
  isDarkMode?: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  align-items: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background2};
`;

interface StyledContainerProps {
  styles?: StyleProp<ViewStyle>;
  isDarkMode?: boolean;
}

export const StyledContainer = styled.View.attrs<StyledContainerProps>(
  (props) => ({
    style: {
      flex: 1,
      alignItems: "center",
      backgroundColor: props.isDarkMode
        ? DarkTheme.background1
        : LightTheme.background2,
    },
  })
)<ContainerProps>`
  ${({ props }) => props?.styles}
`;

export const WhiteText = styled.Text`
  color: white;
`;

export const Heading = styled.Text<ThemedProps & TextProps>`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1};
`;

export const DisconnectButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const ImageContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;
