import styled from 'styled-components/native';
import { DarkTheme, LightTheme } from '../../../common/constants/Colors';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CustomProps {
  [key: string]: any;
}

interface Props {
  height: number;
  boxState: boolean;
  customProps: CustomProps;
  boxSelected: boolean;
  isDarkMode: boolean;
}
export const SelectedBox = styled.TouchableOpacity<Props>`
  padding: 8px;
  margin: ${(props: Props) => (props.boxSelected ? '3%' : '2%')};
  border-width: ${(props: Props) => (props.boxSelected ? '2px' : '1px')};
  flex-direction: row;
  border-radius: ${(props: Props) => (props.boxSelected ? '20px' : '0px')};
  width: 100%;
  height: ${(props: Props) => (props.boxState ? '25%' : '60%')};
  border-color: ${(props: Props) =>
    props.boxSelected ? LightTheme.foreground2 : props.isDarkMode ? DarkTheme.background2 : LightTheme.background2};
  border-top-color: ${(props: Props) =>
    props.boxSelected ? LightTheme.foreground2 : props.isDarkMode ? LightTheme.background2 : 'rgba(0, 0, 0, 0.2)'};
  justify-content: space-between;
  display: ${(props: Props) => (props.boxState ? 'flex' : (props: Props) => (props.boxSelected ? 'flex' : 'none'))};
`;

export const UnSelectedBox = styled.View<Props>`
  padding: 8px;
  border-top-color: ${(props: Props) => (props.isDarkMode ? DarkTheme.accent : 'rgba(0, 0, 0, 0.2)')};
  flex-direction: row;
  border-top-width: 1px;
  margin: 2%;
  width: 100%;
  height: 25%;
  justify-content: space-between;
  display: ${(props: Props) => (props.boxState ? 'flex' : 'none')};
`;

export const BoxHeadingText = styled.Text`
  color: ${LightTheme.accent};
  font-weight: 700;
  text-align: left;
`;

export const AnimatedBox = styled(Animated.View)<Props>`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  height: 100%;
  border-top-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${(props: Props) => (props.isDarkMode ? DarkTheme.background2 : LightTheme.background2)};
`;

interface AnimatedRootProps {
  height: number;
}
export const AnimatedRoot = styled(GestureHandlerRootView)`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: ${(props: AnimatedRootProps) => props.height}px;
`;
