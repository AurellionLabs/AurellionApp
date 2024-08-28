import { Stack } from "expo-router";

export default function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name="assignDriver/[journeyId]" options={{ headerShown: false }} />
    </Stack>
  );
}
