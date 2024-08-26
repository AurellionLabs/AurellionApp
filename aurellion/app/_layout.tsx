import MainProvider from "@/providers/main.provider";
import NodeProvider from "@/providers/node.provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MainProvider>
      <NodeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="delivery" options={{ headerShown: false }} /> */}
        </Stack>
      </NodeProvider>
    </MainProvider>
  );
}
