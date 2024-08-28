import { Stack } from "expo-router";

export default function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name="acceptJourney/[journeyId]" options={{ headerShown: false }} />
    </Stack>
  );
}
