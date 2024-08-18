import styled from "styled-components/native";
import { TextProps, ViewProps, TextInputProps } from "react-native";
import { LightTheme, DarkTheme } from "@/constants/Colors";

interface ThemedProps {
  isDarkMode: boolean;
}

export const Container = styled.View<ThemedProps>`
  padding-horizontal: 15px;
  padding-vertical: 25px;
  height: 100%;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background1};
`;

export const Section = styled.View<ViewProps>`
  margin-bottom: 10px;
`;

export const Label = styled.Text<ThemedProps & TextProps>`
  font-size: 17px;
  font-weight: 300;
  margin-bottom: 10px;
  color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1};
`;

export const Input = styled.TextInput<ThemedProps & TextInputProps>`
  height: 40px;
  border-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.overlayThin : "black"};
  border-width: 1px;
  margin-bottom: 20px;
  padding-left: 8px;
  border-radius: 7px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background4 : LightTheme.background1};
  color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.foreground1 : LightTheme.foreground1};
`;
