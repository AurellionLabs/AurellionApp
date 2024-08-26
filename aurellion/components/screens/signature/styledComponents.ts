import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { LightTheme, DarkTheme } from "@/constants/Colors";

interface ThemedProps {
  isDarkMode: boolean;
}

export const Container = styled.View<ThemedProps>`
  padding-horizontal: 15px;
  padding-vertical: 25px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkTheme.background1 : LightTheme.background1};
`;

export const TextContainer = styled.View<ViewProps>`
  margin-vertical: 30px;
  align-items: center;
`;
