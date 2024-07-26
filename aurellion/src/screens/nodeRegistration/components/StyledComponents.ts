import styled from 'styled-components/native';
import { LightTheme, DarkTheme } from '../../../common/constants/Colors';

export const Container = styled.View<{ isDarkMode: boolean }>`
  display: flex;
  justify-content: flex-start;
  padding-horizontal: 15px;
  height: 100%;
  background-color: ${({ isDarkMode }: { isDarkMode: boolean }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background1};
`;

export const Section = styled.View`
  margin-bottom: 10px;
`;

export const Heading = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${({ isDarkMode }: { isDarkMode: boolean }) => (isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1)};
`;

export const Label = styled.Text<{ isDarkMode: boolean }>`
  font-size: 17px;
  font-weight: 300;
  color: black;
  margin-bottom: 10px;
  color: ${({ isDarkMode }: { isDarkMode: boolean }) => (isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1)};
`;

export const Input = styled.TextInput<{ isDarkMode: boolean }>`
  height: 40px;
  border-color: ${({ isDarkMode }: { isDarkMode: boolean }) => (isDarkMode ? DarkTheme.overlayThin : 'black')};
  border-width: 1px;
  margin-bottom: 20px;
  padding-left: 8px;
  border-radius: 7px;
  background-color: ${({ isDarkMode }: { isDarkMode: boolean }) =>
    isDarkMode ? DarkTheme.background4 : LightTheme.background1};
  color: ${({ isDarkMode }: { isDarkMode: boolean }) => (isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1)};
`;
