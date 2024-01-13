import styled from 'styled-components/native';
import { DarkTheme, LightTheme } from '../../../common/constants/Colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-horizontal: 15px;
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { flexGrow: 1, minWidth: '100%' },
})``;

export const Heading = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
`;

export const DetailsContainer = styled.View`
  width: 100%;
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

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: grey;
  margin-bottom: 20px;
  margin-top: 20px;
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
