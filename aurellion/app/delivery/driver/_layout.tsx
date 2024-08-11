import { Stack } from "expo-router";

export default function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name="assignDriver" options={{ headerShown: false }} />
    </Stack>
  );
}
