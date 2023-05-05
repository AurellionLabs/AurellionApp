import styled from 'styled-components/native';
import { DarkTheme, LightTheme } from '../../constants/Colors';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  background-color: white;
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
  height: 70%;
  
`;



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

export const buttonBox = styled.View`
padding: 8px;
border-top-color:  rgba(0, 0, 0, 0.2);
flex-direction: row;
border-top-width: 1px;
margin: 2%;
width: 100%;
height: 25%;
justify-content: space-between;
`;


export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const BoldText = styled.Text`
  color: #000;
  font-weight: 700;
`;

export const WhiteText = styled.Text`
  color: white;
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

export const DisconnectButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 250px;
`;
