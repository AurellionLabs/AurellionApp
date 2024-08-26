import { Stack } from "expo-router";

export default function NodeLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="acceptOrderSign/[id]" />
      <Stack.Screen name="handOffSign" />
    </Stack>
  );
}