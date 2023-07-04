import styled from 'styled-components/native';
import { LightTheme } from '../../../common/constants/Colors';
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
}
export const SelectedBox = styled.TouchableOpacity<Props>`
  padding: 8px;
  margin: 3%;
  flex-direction: row;
  width: 100%;
  flex: 1;
  max-height: 10%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  display: flex; 
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
  display: flex;
`;

export const BoxHeadingText = styled.Text`
  color: ${LightTheme.accent};
  font-weight: 700;
  text-align: left;
`;

export const Box = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
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