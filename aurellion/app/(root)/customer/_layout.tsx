import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="package"
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
