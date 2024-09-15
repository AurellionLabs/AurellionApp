import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen name="confirmation" options={{ headerShown: false }} />
      <Stack.Screen name="deliveryOptions" options={{ headerShown: false }} />
      <Stack.Screen
        name="recepientWalletAddress"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="package/handOnSign/[journeyId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="package/handOffSign/[journeyId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="order/makeOrderSign/[assetId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="order/receivedOrderSign/[orderId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
