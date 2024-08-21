import { Stack } from "expo-router";

export default function NodeLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="acceptOrderSign" />
      <Stack.Screen name="handOffSign" />
    </Stack>
  );
}