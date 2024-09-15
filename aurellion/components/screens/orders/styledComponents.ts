import styled from "styled-components/native";
import { TextProps, ViewProps, TextInputProps } from "react-native";
import { LightTheme, DarkTheme } from "@/constants/Colors";

interface ThemedProps {
  isDarkMode: boolean;
}

export const Container = styled.View<ThemedProps>`
  padding-horizontal: 10px;
  padding-top: 25px;
  height: 100%;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background2};
`;

export const OrderItem = styled.TouchableOpacity<ThemedProps>`
  padding: 12px;
  margin: 4px;
  border-radius: 12px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background2 : LightTheme.background1};
`;

export const MakeOrderContainer = styled.View<ThemedProps>`
  padding-horizontal: 15px;
  padding-top: 20px;
  height: 100%;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background1};
`;
export const TextRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 8px;
`;
