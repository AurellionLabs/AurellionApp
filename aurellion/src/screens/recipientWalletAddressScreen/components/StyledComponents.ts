import styled from 'styled-components/native';
import { DarkTheme, LightTheme } from '../../../common/constants/Colors';

export const Container = styled.View`
  display: flex;
//   flex: 1;
  height: 100%;
//   background-color: red;
  justify-content: space-evenly;
//   align-items: flex-start;
  padding-horizontal: 15px;
`;


export const Heading = styled.Text`
  flex: 0.5;
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
//   background-color: white;
`;

export const DetailsContainer = styled.View`
  flex: 5;
  min-width: 100%;
//   background-color: white;
  margin-bottom: 20px;
`;

export const Section = styled.View`
  margin-bottom: 35px;
`;

export const Label = styled.Text`
  font-size: 20px;
  font-weight: 300;
  color: black;
  margin-bottom: 5px;
`;

export const Value = styled.Text`
  font-size: 16px;
  color: black;
`;


export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${LightTheme.accent};
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 8px;
  align-self: center;
  margin-bottom: 20px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
