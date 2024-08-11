import DeliveryProvider from "@/providers/delivery.provider";
import { Stack } from "expo-router";

export default function DeliveryLayout() {
  return (
    <DeliveryProvider>
      <Stack>
        <Stack.Screen name="customer" options={{ headerShown: false }} />
        <Stack.Screen name="driver" options={{ headerShown: false }} />
        <Stack.Screen name="signature" options={{ headerShown: false }} />
      </Stack>
    </DeliveryProvider>
  );
}
