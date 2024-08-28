import { Stack } from "expo-router";

export default function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name="acceptJourneySign/[journeyId]" options={{ headerShown: false }} />
      <Stack.Screen name="handOnSign/[journeyId]" options={{ headerShown: false }} />
      <Stack.Screen name="handOffSign/[journeyId]" options={{ headerShown: false }} />
    </Stack>
  );
}
