import styled from "styled-components/native";
import { TextProps, ViewProps, TextInputProps } from "react-native";
import { LightTheme, DarkTheme } from "@/constants/Colors";

interface ThemedProps {
  isDarkMode: boolean;
}

export const OrderItem = styled.TouchableOpacity<ThemedProps>`
  padding: 12px;
  margin: 4px;
  border-radius: 12px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background1};
`;
