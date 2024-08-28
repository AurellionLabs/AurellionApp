import MainProvider from "@/providers/main.provider";
import NodeProvider from "@/providers/node.provider";
import DriverProvider from "@/providers/driver.provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MainProvider>
      <NodeProvider>
        <DriverProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="delivery" options={{ headerShown: false }} /> */}
          </Stack>
        </DriverProvider>
      </NodeProvider>
    </MainProvider>
  );
}
