import styled from 'styled-components/native';
import {DarkTheme, LightTheme} from '../constants/Colors';
import {
  Touchable,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
  ${({isDarkMode}: {isDarkMode: boolean}) =>
    isDarkMode &&
    `
    background-color: ${DarkTheme.accent};
    border-color: ${DarkTheme.overlayThin};
  `}
  ${({styles}: RedButtonProps) => styles};
`;
export const RedButtonText = styled.Text`
  color: white;
  font-family: Inter-Regular;
`;
export const TitleText = styled.Text<props>`
  color: ${(props: props) =>
    props.isDarkMode ? DarkTheme.title : LightTheme.title};
  font-family: Inter-Regular;
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
  color: ${(props: props) => (props.isDarkMode ? 'white' : 'black')};
  font-family: Inter-Regular;
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
  styles: ViewStyle;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  ${({styles}: ContainerProps) => styles};
`;

export const WhiteText = styled.Text`
  color: white;
`;

export const DisconnectButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 250px;
`;
