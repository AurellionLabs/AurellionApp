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
}
export const SelectedBox = styled.View`
  padding: 8px;
  margin: 3%;
  border-width: 2px;
  flex-direction: row;
  border-radius: 20px;
  width: 100%;
  height: ${(props: Props) => (props.boxState ? '25%' : '60%')};
  border-color: ${LightTheme.foreground2};
  justify-content: space-between;
`;

export const UnSelectedBox = styled.View<Props>`
  padding: 8px;
  border-top-color:  rgba(0, 0, 0, 0.2);
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

export const BlueButton = styled.TouchableOpacity<{ isDarkMode: boolean }>`
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
`;

export const BlueButtonText = styled.Text`
  color: white;
  font-weight: 700;
`;

export const AnimatedBox = styled(Animated.View)`
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
  background-color: white;
  
`;

export const AnimatedRoot = styled(GestureHandlerRootView)`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: ${(props: Props) => props.height}px;
  
`;