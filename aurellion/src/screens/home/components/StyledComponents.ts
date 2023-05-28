import styled from 'styled-components/native';
import { LightTheme } from '../../../common/constants/Colors';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const SelectedBox = styled.View`
  padding: 8px;
  border-width: 2px;
  flex-direction: row;
  border-radius: 20px;
  width: 100%;
  height: 25%;
  border-color: ${LightTheme.foreground2};
  justify-content: space-between;
`;

export const UnSelectedBox = styled.View`
  padding: 8px;
  border-top-color:  rgba(0, 0, 0, 0.2);
  flex-direction: row;
  border-top-width: 1px;
  margin: 2%;
  width: 100%;
  height: 25%;
  justify-content: space-between;
`;

export const BoxHeadingText = styled.Text`
  color: ${LightTheme.accent};
  font-weight: 700;
  text-align: left;
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