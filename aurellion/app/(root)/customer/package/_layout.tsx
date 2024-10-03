import { Stack } from "expo-router";

export default function PackageLayout() {
  return (
    <Stack>
      <Stack.Screen name="confirmation" options={{ headerShown: false }} />
      <Stack.Screen name="deliveryOptions" options={{ headerShown: false }} />
      <Stack.Screen
        name="recepientWalletAddress"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="handOnSign/[journeyId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="handOffSign/[journeyId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
