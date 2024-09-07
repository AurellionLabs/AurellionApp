import styled from "styled-components/native";
import { TextProps, ViewProps, TextInputProps } from "react-native";
import { LightTheme, DarkTheme } from "@/constants/Colors";

interface ThemedProps {
  isDarkMode: boolean;
}

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

export const OrderItem = styled.TouchableOpacity<ThemedProps>`
  padding: 12px;
  margin: 4px;
  border-radius: 12px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background2 : LightTheme.background1};
`;

export const TextRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 8px;
`;