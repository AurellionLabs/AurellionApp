import MainProvider from "@/providers/main.provider";
import NodeProvider from "@/providers/node.provider";
import DriverProvider from "@/providers/driver.provider";
import CustomerProvider from "@/providers/customer.provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MainProvider>
      <NodeProvider>
        <DriverProvider>
          <CustomerProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(root)" options={{ headerShown: false }} />
            </Stack>
          </CustomerProvider>
        </DriverProvider>
      </NodeProvider>
    </MainProvider>
  );
}
