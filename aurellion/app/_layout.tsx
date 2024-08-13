import MainProvider from "@/providers/main.provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MainProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* TODO: These 2 stacks will be removed */}
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="delivery" options={{ headerShown: false }} /> */}
        <Stack.Screen name="node" options={{ headerShown: false }} />
        <Stack.Screen name="driver" options={{ headerShown: false }} />
        <Stack.Screen name="customer" options={{ headerShown: false }} />
      </Stack>
    </MainProvider>
  );
}
