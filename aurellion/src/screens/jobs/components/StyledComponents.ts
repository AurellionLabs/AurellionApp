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
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;

  margin-top: 4%;
  margin-left: 4px;
  margin-right: 4px;

  flex-direction: row;
  width: 98.5%;
  flex: 1;
  max-height: 9%;

  border-width: 2.5px;
  border-style: solid;
  border-color: ${LightTheme.foreground2};
  border-radius: 12px;

  justify-content: space-between;
  display: flex;
  // background-color: blue;
`;

export const UnSelectedBox = styled.View<Props>`
  padding: 8px;
  border-top-color: rgba(0, 0, 0, 0.2);
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
