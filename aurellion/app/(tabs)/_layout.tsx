import MainProvider from "@/providers/main.provider";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <MainProvider>
      <Stack>
        <Stack.Screen name="node" options={{ headerShown: false }} />
        <Stack.Screen name="driver" options={{ headerShown: false }} />
        <Stack.Screen name="customer" options={{ headerShown: false }} />
      </Stack>
    </MainProvider>
  );
}
