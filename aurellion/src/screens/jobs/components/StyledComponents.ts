import styled from 'styled-components/native';
import { LightTheme, DarkTheme } from '../../../common/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyledText } from '../../../common/components/StyledComponents';

interface CustomProps {
  [key: string]: any;
}

interface Props {
  height: number;
  boxState: boolean;
  customProps: CustomProps;
  boxSelected: boolean;
}

interface props {
  isDarkMode: boolean;
}

export const SelectedBox = styled.TouchableOpacity<Props>`
  width: 100%;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 4%;
  margin-left: 4px;
  margin-right: 4px;
  display: flex;
  flex-direction: row;
  width: 98.5%;
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  max-height: 9%;
  border-width: 2.5px;
  border-style: solid;
  border-color: ${LightTheme.foreground2};
  border-radius: 12px;
  justify-content: space-between;
`;

export const StyledSelectedBox = styled.TouchableOpacity<Props>`
  padding: 12px;
  margin: 4px;
  border-radius: 12px;
  background-color: ${(props: props) => (props.isDarkMode ? DarkTheme.background3 : LightTheme.background3)};
`;

export const TextRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 8px;
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
